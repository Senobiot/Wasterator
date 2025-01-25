import React from "react";
import "./GameTile.scss";

const GameTile = ({ title, image, description, releaseDate }) => {
  return (
    <div className="game-tile">
      <img src={image} alt={title} className="game-image" />
      <div className="game-info">
        <h2 className="game-title">{title}</h2>
        <p className="game-played-time">Total Played: </p>
        <p className="game-played-year">Last played{releaseDate}</p>
      </div>
    </div>
  );
};

export default GameTile;
