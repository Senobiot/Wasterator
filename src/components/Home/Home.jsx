import { useSelector, useDispatch } from "react-redux";
import {
  selectLoadingStatus,
  selectTopGames,
  selectTopGamesPage,
} from "../../selectors/selectors";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import StyledTile from "../Tile/Tile";
import "./Home.scss";
import { getMoreTopGames } from "../../reducers/searchReducer";
import { setLoading } from "../../reducers/statusReducer";
import { ROUTES } from "../../constants/constants";

export default function Home() {
  const topGamesList = useSelector(selectTopGames);
  const loading = useSelector(selectLoadingStatus);
  const currentLoadedPages = useSelector(selectTopGamesPage);
  console.log(currentLoadedPages);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const observer = useRef();

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
      dispatch(getMoreTopGames(page));
    }
  }, [page, dispatch]);

  useEffect(() => {
    if (currentLoadedPages < page) {
      dispatch(setLoading(true));
      dispatch(getMoreTopGames(page));
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="collection-wrapper ghostloader">
      {!topGamesList.length ? (
        <div className="empty-state">Your collection is still empty... (</div>
      ) : (
        <div className="tiles-grid">
          {topGamesList.map((game, index) => {
            if (topGamesList.length === index + 1) {
              return (
                <div ref={lastGameElementRef} key={game.id || game.name}>
                  <Link to={`${ROUTES.CARDS.GAME}/${game.id}`}>
                    <StyledTile data={game} last={true} />
                  </Link>
                </div>
              );
            } else {
              return (
                <Link
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
