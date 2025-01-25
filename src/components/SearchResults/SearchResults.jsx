import SearchItem from "./SearchItem/SearchItem";
import { useSelector } from "react-redux";
import { getSearchList, getGameCollection } from "../../selectors/selectors";

export const SearchResults = () => {
  const results = useSelector(getSearchList);
  const collection = useSelector(getGameCollection);
  console.log(results)
  const modifiedResults = results?.map( game =>{
    const isInCollection = !!collection.find(e => e.id === game.id);
    return {...game, isInCollection: isInCollection};
  } )

  return results && results.length
    ? modifiedResults.map((e, i) => <SearchItem key={e.id} index={i + 1} data={e}/>)
    : "No such game found...(";
};
