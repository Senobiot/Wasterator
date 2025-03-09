import { useSelector, useDispatch } from "react-redux";
import {
  getScrollPosition,
  selectCurrentUser,
  selectLoadingStatus,
  selectLoginingStatus,
  selectTopGames,
  selectTopGamesPage,
} from "../../selectors/selectors";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import StyledTile from "../Tile/Tile";
import styles from "./Home.module.scss";
import {
  getMoreTopGames,
  setScrollPosition,
} from "../../reducers/searchReducer";
import { setLoading } from "../../reducers/statusReducer";
import { ROUTES } from "../../constants/constants";
import LineMessage from "../Modals/LineMessage/LineMessage";

export default function Home() {
  const topGamesList = useSelector(selectTopGames);
  const loading = useSelector(selectLoadingStatus);
  const loggedUser = useSelector(selectCurrentUser);
  const loginingStatus = useSelector(selectLoginingStatus);
  const scrollPosition = useSelector(getScrollPosition);
  const [loginRequest, setLoginRequest] = useState(false);
  const currentLoadedPages = useSelector(selectTopGamesPage);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const observer = useRef();

  const handleClick = (event) => {
    dispatch(setScrollPosition(window.scrollY));
    setLoginRequest(false);
    if (!loggedUser) {
      setTimeout(() => setLoginRequest(true), 0);
      event.preventDefault();
    }
  };

  const lastGameElementRef = (node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage(page + 1);
      }
    });

    if (node) observer.current.observe(node);
  };

  useEffect(() => {
    if (page > 1 && page > currentLoadedPages) {
      dispatch(setLoading(true));

      dispatch(getMoreTopGames({ page, loggedUser }));
    }
  }, [page, dispatch]);

  useEffect(() => {
    if (currentLoadedPages < page && !loginingStatus) {
      dispatch(setLoading(true));
      dispatch(getMoreTopGames({ page, loggedUser }));
    }
    console.log(scrollPosition);
    window.scrollTo(0, scrollPosition ? scrollPosition : 0);
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loginingStatus]);

  return (
    <div className={styles.wrapper}>
      <LineMessage
        message="Pls login"
        style={{ position: "fixed", bottom: 0 }}
        show={loginRequest}
      ></LineMessage>
      {!topGamesList.length ? (
        <div className={styles.empty}>Your collection is still empty... (</div>
      ) : (
        <div className={styles.grid}>
          {topGamesList.map((game, index) => {
            if (topGamesList.length === index + 1) {
              return (
                <div ref={lastGameElementRef} key={game.id || game.name}>
                  <Link
                    to={`${ROUTES.CARDS.GAME}/${game.id}`}
                    onClick={handleClick}
                  >
                    <StyledTile data={game} last={true} />
                  </Link>
                </div>
              );
            } else {
              return (
                <Link
                  onClick={handleClick}
                  key={game.id || game.name}
                  to={`${ROUTES.CARDS.GAME}/${game.id}`}
                >
                  <StyledTile data={game} key={game.id || game.name} />
                </Link>
              );
            }
          })}
          {loading && <StyledTile data={{ loader: true }} />}
        </div>
      )}
    </div>
  );
}
