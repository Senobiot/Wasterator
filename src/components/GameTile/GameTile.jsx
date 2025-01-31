import React from "react";
import "./GameTile.scss";
import { GAMES } from "../../constants/ActionTypes/AtcionTypes";
import { useDispatch } from "react-redux";
import { INSCRIPTIONS_KEYS, SEARCH_TYPE } from "../../constants/constants";

const GameTile = ({ data, type }) => {
  const inscription =
    type === SEARCH_TYPE.FILMS
      ? INSCRIPTIONS_KEYS.TITLE_CARDS.DURATION.FILMS
      : INSCRIPTIONS_KEYS.TITLE_CARDS.DURATION.GAMES;
  const { name, image, original_release_date, playedTime, poster, movieLength, year } = data;
  const time =  type === SEARCH_TYPE.FILMS
  const dispatch = useDispatch();
  const handleClick = () =>
    dispatch({ type: GAMES.ADD_DETAILS, payload: data });
  return (
    <div onClick={handleClick} className="game-tile">
      <img
        src={image?.medium_url || poster?.url}
        alt={name}
        className="game-image"
      />
      <div className="game-info">
        <h2 className="game-title">{name}</h2>
        <p className="game-played-time">{inscription} {playedTime || movieLength  || "-"} </p>
        <p className="game-played-year">Год: {original_release_date || year}</p>
      </div>
    </div>
  );
};

export default GameTile;
