import { useDispatch, useSelector } from "react-redux";
import classes from "./SearchItem.module.scss";
import { Link } from "react-router-dom";
import { GAMES } from "../../../constants/ActionTypes/AtcionTypes";
import {
  selectGamesCollection,
  selectSearchType,
} from "../../../selectors/selectors";
import { releaseToLocale, unifyFields } from "../../../utils/utils";
import { SEARCH_TYPE } from "../../../constants/constants";

export default function SearchItem({ data }) {
  if (!data) return;
  const unifiedFields = unifyFields(data);
  const collection = useSelector(selectGamesCollection);
  const isItemTypeGame = useSelector(selectSearchType) === SEARCH_TYPE.GAMES;
  const dispatch = useDispatch();
  const handleClick = () => {
    if (data.isInCollection) {
      const collectionData = collection.find((e) => e.id === data.id);
      return dispatch({ type: GAMES.ADD_DETAILS, payload: collectionData });
    }
    dispatch({ type: GAMES.ADD_DETAILS, payload: data });
  };

  if (isItemTypeGame) {
    unifiedFields.platformClass = data.platforms?.map((e) =>
      e.name.replace(/ .*/, "").toLowerCase()
    );
    const date = releaseToLocale(unifiedFields.year);
    unifiedFields.year = date;
  }
console.log(unifiedFields);
  return (
    <Link to="/card">
      <div onClick={handleClick} className={classes.searchResults__item}>
        <div className={classes.searchResults__item_poster}>
          <img src={unifiedFields.logo} alt="" />
        </div>
        <div className={classes.searchResults__item_content}>
          <div className={classes.title}>{unifiedFields.name}</div>
          {unifiedFields.platformClass?.map((e, i) => {
            return (
              <span
                key={i}
                className={`${classes.platform} ${classes[e]}`}
              ></span>
            );
          })}
        </div>
        <div className={classes.searchResults__item_released}>
          {unifiedFields.year}
        </div>
        {/* <div className={classes.searchResults__item_type}>
          {unifiedFields.resource_type?.toUpperCase()}
        </div> */}
        <div className={classes.searchResults__item_collection}>
          {data.isInCollection ? "In Collection" : ""}
        </div>
        {!isItemTypeGame ? <div>{unifiedFields.genres?.map(e => <span>{e} </span>)}</div> : ''}
      </div>
    </Link>
  );
}
