import { useDispatch, useSelector } from "react-redux";
import {
  selectGamesCollection,
  selectMoviesCollection,
} from "../../selectors/selectors";
import StatisticCollection from "./StatisticCollection.jsx";
import { INSCRIPTIONS_KEYS, ROUTES } from "../../constants/constants.js";
import { useEffect } from "react";
import {
  getMoviesCollection,
  getGamesCollection,
  setLoading,
} from "../../reducers";

export default function StatisticPage() {
  const gameCollection = useSelector(selectGamesCollection);
  const moviesCollection = useSelector(selectMoviesCollection);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(getGamesCollection());
    dispatch(getMoviesCollection());
  }, []);

  return (
    <div>
      <StatisticCollection
        route={ROUTES.CARDS.GAME}
        storedCollection={gameCollection}
        collectionName={INSCRIPTIONS_KEYS.STATISTIC_PAGE.COLLECTION_NAMES.GAMES}
      />
      <StatisticCollection
        route={ROUTES.CARDS.FILM}
        storedCollection={moviesCollection}
        collectionName={INSCRIPTIONS_KEYS.STATISTIC_PAGE.COLLECTION_NAMES.FILMS}
      />
    </div>
  );
}
