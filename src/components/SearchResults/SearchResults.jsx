import SearchItem from "./SearchItem/SearchItem";
import { useSelector } from "react-redux";
import { getSearchList, getGameCollection } from "../../selectors/selectors";

export const SearchResults = () => {
  const results = useSelector(getSearchList);
  const collection = useSelector(getGameCollection);
  console.log(collection)
  if (!results.length) {
    return "No such game found...(";
  }
  const modifiedResults = results.map( game =>{
    const isInCollection = !!collection.find(e => e.id === game.id);
    return {...game, isInCollection: isInCollection};
  } )

  return modifiedResults.map((e, i) => <SearchItem key={e.id} index={i + 1} data={e}/>)
};
