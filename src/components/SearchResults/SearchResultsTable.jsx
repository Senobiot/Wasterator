import SearchItem from "./SearchItem/SearchItem";
import { useSelector } from "react-redux";
import {
  selectGamesCollection,
  selectFilmsCollection,
  selectSearchResult,
  selectSearchType,
} from "../../selectors/selectors";
import { SEARCH_TYPE } from "../../constants/constants";
import { unifyFields } from "../../utils/utils";

const SearchResultsTable = () => {
  // const activeSearchType = useSelector(selectSearchType);
  const currentSearch = Object.values(useSelector(selectSearchResult));
  const results = currentSearch[0] || [];
  const resultsType = currentSearch[1];
  const collection = resultsType === SEARCH_TYPE.GAMES
      ? useSelector(selectGamesCollection)
      : useSelector(selectFilmsCollection);

  if (!results.length) {
    return "No such game found...(";
  }
  const modifiedResults = results.map((item) => {
    const isInCollection = collection.some(e => e.id === item.id);
    const unifiedFields = unifyFields(item);
    return { ...unifiedFields, isInCollection: isInCollection, itemType: resultsType};
  });

  return modifiedResults.map((e, i) => (
    <SearchItem key={e.id} index={i + 1} data={e} />
  ));
};

export default SearchResultsTable;