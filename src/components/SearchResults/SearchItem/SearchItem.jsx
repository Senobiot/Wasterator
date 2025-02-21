import { useDispatch, useSelector } from "react-redux";
import classes from "./SearchItem.module.scss";
import { Link } from "react-router-dom";
import { selectSearchResultType } from "../../../selectors/selectors";
import { ROUTES, SEARCH_TYPE } from "../../../constants/constants";
import { setItemDetails } from "../../../actions";

export default function SearchItem({ data }) {
  // if (!data) return;
  const { logoUrl, name, enName, release, InCollection, rating, id } = data;
  const itemType = useSelector(selectSearchResultType);
  const route =
    itemType === SEARCH_TYPE.GAMES
      ? ROUTES.CARDS.GAME + "?" + id
      : ROUTES.CARDS.FILM + "?" + id;
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setItemDetails(data));
  };

  return (
    <Link to={route}>
      <div onClick={handleClick} className={classes.searchResults__item}>
        <div className={classes.searchResults__item_poster}>
          <img src={logoUrl} alt="" />
        </div>
        <div className={classes.searchResults__item_content}>
          <div className={classes.title}>
            <div className={"canGhosted"}>{name}</div>
            <div className={`${classes.entitle} ${"canGhosted"}`}>{enName}</div>
          </div>
        </div>
        <div className={classes.searchResults__item_rating}>{rating || ""}</div>
        <div className={`${classes.searchResults__item_released} ${"canGhosted"}`}>
          {release || "In Development"}
        </div>
        <div className={classes.searchResults__item_collection}>
          {InCollection ? "In Collection" : ""}
        </div>
      </div>
    </Link>
  );
}
