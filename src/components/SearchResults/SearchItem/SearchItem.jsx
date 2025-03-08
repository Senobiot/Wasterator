import { useDispatch, useSelector } from "react-redux";
import classes from "./SearchItem.module.scss";
import { Link } from "react-router-dom";
import { selectSearchResultType } from "../../../selectors/selectors";
import { ROUTES, SEARCH_TYPE } from "../../../constants/constants";
import { setDetails, setLoading } from "../../../reducers";

export default function SearchItem({ data }) {
  const {
    imageUrl,
    name,
    originalName,
    release,
    inCollection,
    rating,
    ratingImdb,
    ratingKp,
    id,
  } = data;
  const itemType = useSelector(selectSearchResultType);
  const route =
    itemType === SEARCH_TYPE.GAMES
      ? ROUTES.CARDS.GAME + "/" + id
      : ROUTES.CARDS.FILM + "/" + id;
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setLoading(true));
    dispatch(setDetails(data));
  };

  return (
    <Link to={route}>
      <div onClick={handleClick} className={classes.item}>
        <div className={`${classes.poster} ${"canGhosted"}`}>
          <img src={imageUrl} alt="" />
        </div>
        <div className={classes.content}>
          <div className={classes.title}>
            <div className={"canGhosted"}>{name}</div>
            <div className={`${classes.originalName} ${"canGhosted"}`}>
              {originalName}
            </div>
          </div>
        </div>
        <div className={classes.rating}>{rating && rating}</div>
        <div className={classes.rating}>{ratingKp > 0 && ratingKp}</div>
        <div className={classes.rating}>{ratingImdb > 0 && ratingImdb}</div>
        <div className={`${classes.released} ${"canGhosted"}`}>
          {release || "SOON"}
        </div>
        <div className={classes.collection}>
          {inCollection ? "In Collection" : ""}
        </div>
      </div>
    </Link>
  );
}
