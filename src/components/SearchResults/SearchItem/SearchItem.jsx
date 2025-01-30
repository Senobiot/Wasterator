import { useDispatch, useSelector } from "react-redux";
import classes from "./SearchItem.module.scss";
import { Link } from "react-router-dom";
import { GAMES } from "../../../constants/ActionTypes/AtcionTypes";
import {
  selectGamesCollection,
  selectSearchType,
} from "../../../selectors/selectors";
import { SEARCH_TYPE } from "../../../constants/constants";

export default function SearchItem({data}) {
  if (!data) return;
  const { logo, name, enName, year, platforms, genres, isInCollection, itemType, rating } = data;
  const isItemTypeGame = itemType === SEARCH_TYPE.GAMES;
  let platformClass = "";
  const collection = useSelector(selectGamesCollection);
  const dispatch = useDispatch();
  const handleClick = () => {
    if (isInCollection) {
      const collectionData = collection.find((e) => e.id === data.id);
      return dispatch({ type: GAMES.ADD_DETAILS, payload: collectionData });
    }
    dispatch({ type: GAMES.ADD_DETAILS, payload: data });
  };

  if (isItemTypeGame) {
    platformClass = platforms?.map((e) =>
      e.name.replace(/ .*/, "").toLowerCase()
    );
  }

  return (
    <Link to="/card">
      <div onClick={handleClick} className={classes.searchResults__item}>
        <div className={classes.searchResults__item_poster}>
          <img src={logo} alt="" />
        </div>
        <div className={classes.searchResults__item_content}>
          <div className={classes.title}>
            <div>{name}</div>
            <div className={classes.entitle}>{enName}</div>
          </div>
          {platformClass && platformClass.map((e, i) => {
            return (
              <span
                key={i}
                className={`${classes.platform} ${classes[e]}`}
              ></span>
            );
          })}
        </div>
        {rating ? <div className={classes.searchResults__item_rating}>{rating}</div> : ''}
        <div className={classes.searchResults__item_released}>
          {year || "In Development"}
        </div>
        <div className={classes.searchResults__item_collection}>
          {isInCollection ? "In Collection" : ""}
        </div>
        {!isItemTypeGame ? (
          <div className={classes.genres_wrapper}>
            {genres?.map((e, i, arr) => (arr[i + 1] ? e + ", " : e))}
          </div>
        ) : (
          ""
        )}
      </div>
    </Link>
  );
}
