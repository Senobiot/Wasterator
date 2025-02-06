import { useDispatch, useSelector } from "react-redux";
import classes from "./SearchItem.module.scss";
import { Link } from "react-router-dom";
import {
  selectFilmsCollection,
  selectGamesCollection,
} from "../../../selectors/selectors";
import { SEARCH_TYPE } from "../../../constants/constants";
import { setItemDetails } from "../../../actions";

export default function SearchItem({ data }) {
  if (!data) return;
  const {
    logo,
    name,
    enName,
    year,
    platforms,
    genres,
    isInCollection,
    itemType,
    rating,
  } = data;
  const isItemTypeGame = itemType === SEARCH_TYPE.GAMES;
  let platformClass = "";
  const collection = isItemTypeGame
    ? useSelector(selectGamesCollection)
    : useSelector(selectFilmsCollection);
  const dispatch = useDispatch();
  const handleClick = () => {
    if (isInCollection) {
      const collectionData = collection.find((e) => e.id === data.id);
      return dispatch(setItemDetails(collectionData));
    }
    dispatch(setItemDetails(data));
  };

  if (isItemTypeGame) {
    platformClass = platforms?.map((e) =>
      e.name.replace(/ .*/, "").toLowerCase()
    );
  }

  return (
    <Link to={itemType === SEARCH_TYPE.GAMES ? "/game" : "/movie"}>
      <div onClick={handleClick} className={classes.searchResults__item}>
        <div className={classes.searchResults__item_poster}>
          <img src={logo} alt="" />
        </div>
        <div className={classes.searchResults__item_content}>
          <div className={classes.title}>
            <div>{name}</div>
            <div className={classes.entitle}>{enName}</div>
          </div>
          {platformClass &&
            platformClass.map((e, i) => {
              return (
                <span
                  key={i}
                  className={`${classes.platform} ${classes[e]}`}
                ></span>
              );
            })}
        </div>
        {
          <div className={classes.searchResults__item_rating}>
            {rating || ""}
          </div>
        }
        <div className={classes.searchResults__item_released}>
          {year || "In Development"}
        </div>
        {!isItemTypeGame ? (
          <div className={classes.genres_wrapper}>
            {genres?.map((e, i, arr) => (arr[i + 1] ? e + ", " : e))}
          </div>
        ) : (
          ""
        )}
        <div className={classes.searchResults__item_collection}>
          {isInCollection ? "In Collection" : ""}
        </div>
      </div>
    </Link>
  );
}
