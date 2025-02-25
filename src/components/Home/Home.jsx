import { useSelector } from "react-redux";
import { selectTopGames } from "../../selectors/selectors";
import { VIEW_TYPES } from "../../constants/constants";
import { useState, useEffect, useRef } from "react";
import StyledTile from "../Tile/Tile";
import "./Home.scss";

export default function Home() {
  const topGamesList = useSelector(selectTopGames);
  const [currentViewVariant, setCurrentViewVariant] = useState(
    VIEW_TYPES.DEFAULT
  );
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  const lastGameElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading]
  );

  useEffect(() => {
    if (page > 1) {
      setLoading(true);
      dispatch(fetchMoreGames(page)).finally(() => setLoading(false));
    }
  }, [page]);

  return (
    <div className="collection-wrapper">
      {!topGamesList.length ? (
        <div className="empty-state">Your collection is still empty... (</div>
      ) : (
        <div className="tiles-grid">
          {topGamesList.map((game, index) => {
            if (topGamesList.length === index + 1) {
              return (
                <div ref={lastGameElementRef} key={game.id || game.name}>
                  <StyledTile data={game} />
                </div>
              );
            } else {
              return <StyledTile data={game} key={game.id || game.name} />;
            }
          })}
          {loading && <div className="loading">Loading more games...</div>}
        </div>
      )}
    </div>
  );
}
