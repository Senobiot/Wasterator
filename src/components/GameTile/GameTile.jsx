import React from "react";
import "./GameTile.scss";
import { GAMES } from "../../constants/ActionTypes/AtcionTypes";
import { useDispatch } from "react-redux";


const GameTile = ({data}) => {
  const { name, image, releaseDate } = data;
  const dispatch = useDispatch();
    const handleClick = () =>
      dispatch({ type: GAMES.ADD_DETAILS, payload: data });
  return (
    <div onClick={handleClick} className="game-tile">
      <img src={image.medium_url} alt={name} className="game-image" />
      <div className="game-info">
        <h2 className="game-title">{name}</h2>
        <p className="game-played-time">Total Played: </p>
        <p className="game-played-year">Last played{releaseDate}</p>
      </div>
    </div>
  );
};

export default GameTile;
