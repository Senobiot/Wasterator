import SearchItem from "./SearchItem/SearchItem";
import { useSelector } from "react-redux";
import {
  selectGamesCollection,
  selectFilmsCollection,
  selectSearchResult,
  selectSearchType,
} from "../../selectors/selectors";
import { SEARCH_TYPE } from "../../constants/constants";

export const SearchResults = () => {
  const activeSearchType = useSelector(selectSearchType);
  const results = Object.values(useSelector(selectSearchResult))[0] || [];
  const collection =
    activeSearchType === SEARCH_TYPE.GAMES
      ? useSelector(selectGamesCollection)
      : useSelector(selectFilmsCollection);

  console.log(collection);
  console.log(results);
  if (!results.length) {
    return "No such game found...(";
  }
  const modifiedResults = results.map((game) => {
    const isInCollection = collection.some((e) => e.id === game.id);
    return { ...game, isInCollection: isInCollection };
  });

  return modifiedResults.map((e, i) => (
    <SearchItem key={e.id} index={i + 1} data={e} />
  ));
};
