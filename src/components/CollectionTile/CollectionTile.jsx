import React from "react";
import "./CollectionTile.scss";
import { useDispatch } from "react-redux";
import { COLLECTION_TYPES, INSCRIPTIONS_KEYS } from "../../constants/constants";
import { setItemDetails } from "../../actions";
import { Link } from "react-router-dom";
import { setDetails } from "../../reducers/detailsReducer";

const CollectionTile = ({ data, viewVariant, type, pathname }) => {
  const { name, imageUrl, release, playedTime, poster, movieLength, year } = data;
  const inscription =
    type === COLLECTION_TYPES.FILMS
      ? INSCRIPTIONS_KEYS.TITLE_CARDS.DURATION.FILMS
      : INSCRIPTIONS_KEYS.TITLE_CARDS.DURATION.GAMES;
  const dispatch = useDispatch();
  const handleClick = () => dispatch(setDetails(data));

  return (
    <Link
    to={{
      pathname: pathname,
      search: `?id=${data.id}`,
    }}
    className={viewVariant}
  >
    <div onClick={handleClick} className="game-tile">
      <img
        src={imageUrl}
        alt={name}
        className="game-image"
      />
      <div className="game-info">
        <h2 className="game-title">{name}</h2>
        <p className="game-description">{data.deck || data.description}</p>
        <p className="game-played-time">{inscription} {playedTime || movieLength  || "-"} </p>
        <p className="game-played-year">Год: {release || year}</p>
      </div>
    </div>
    </Link>
  );
};

export default CollectionTile;
