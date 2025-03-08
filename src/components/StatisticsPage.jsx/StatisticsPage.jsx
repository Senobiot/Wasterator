import { useSelector } from "react-redux";
import {
  selectGamesCollection,
  selectMoviesCollection,
} from "../../selectors/selectors";
import StatisticCollection from "./StatisticCollection.jsx";
import { INSCRIPTIONS_KEYS, ROUTES } from "../../constants/constants.js";

export default function StatisticPage() {
  const gameCollection = [...useSelector(selectGamesCollection)];
  const filmsCollection = [...useSelector(selectMoviesCollection)];

  return (
    <div>
      <StatisticCollection
        route={ROUTES.CARDS.GAME}
        storedCollection={gameCollection}
        collectionName={INSCRIPTIONS_KEYS.STATISTIC_PAGE.COLLECTION_NAMES.GAMES}
      />
      <StatisticCollection
        route={ROUTES.CARDS.FILM}
        storedCollection={filmsCollection}
        collectionName={INSCRIPTIONS_KEYS.STATISTIC_PAGE.COLLECTION_NAMES.FILMS}
      />
    </div>
  );
}
