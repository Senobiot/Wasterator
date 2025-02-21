import SearchItem from "./SearchItem/SearchItem";
import { useSelector } from "react-redux";
import {
  selectSearchResult,
  selectLoadingStatus,
} from "../../selectors/selectors";

const SearchResultsTable = () => {
  const currentSearch = useSelector(selectSearchResult);
  const loadingstatus = useSelector(selectLoadingStatus);

  return !currentSearch.length ? (
    "No such game found...("
  ) : (
    <div className={loadingstatus ? "ghostloader" : ""}>
      {currentSearch.map((e, i) => (
        <SearchItem key={e.id} index={i + 1} data={e} />
      ))}
    </div>
  );
};

export default SearchResultsTable;
