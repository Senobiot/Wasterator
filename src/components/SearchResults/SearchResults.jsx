import SearchItem from "./SearchItem/SearchItem";
import { useSelector } from "react-redux";
import { selectGamesCollection, selectSearchResult } from "../../selectors/selectors";

export const SearchResults = () => {
  const results = Object.values(useSelector(selectSearchResult))[0] || [];
  const collection = useSelector(selectGamesCollection);

  console.log(collection)
  if (!results.length) {
    return "No such game found...(";
  }
  const modifiedResults = results.map( game =>{
    const isInCollection = collection.some(e => e.id === game.id);
    return {...game, isInCollection: isInCollection};
  } )

  return modifiedResults.map((e, i) => <SearchItem key={e.id} index={i + 1} data={e}/>)
};
