import SearchItem from "./SearchItem/SearchItem";
import { useSelector } from "react-redux";
import {
  selectSearchResult,
  selectGhostLoadingStatus,
} from "../../selectors/selectors";

const SearchResultsTable = () => {
  const currentSearch = useSelector(selectSearchResult);
  const ghostLoading = useSelector(selectGhostLoadingStatus);

  return !currentSearch.length ? (
    "No such game found...("
  ) : (
    <div className={ghostLoading ? "ghostloader" : ""}>
      {currentSearch.map((e, i) => (
        <SearchItem key={e.id} index={i + 1} data={e} />
      ))}
    </div>
  );
};

export default SearchResultsTable;
