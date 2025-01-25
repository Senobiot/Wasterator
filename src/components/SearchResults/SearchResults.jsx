import SearchItem from "./SearchItem/SearchItem";
import { useSelector } from "react-redux";
import { getSearchList } from "../../selectors/selectors";

export const SearchResults = () => {
  const results = useSelector(getSearchList).current;

  return results && results.length
    ? results.map((e, i) => <SearchItem key={e.id} index={i + 1} data={e} />)
    : "No such game found...(";
};
