import React from 'react';
import PropTypes from 'prop-types';
import './StyledTile.scss';

export default function StyledTile({ data }) {
    const { imageUrl, name, description, rating, release } = data;
  
    return (
      <div className="styled-tile">
        <div className="tile-image">
          <img src={imageUrl} alt={name} />
          {rating && <div className="rating">{rating}</div>}
        </div>
        <div className="tile-content">
          <h3 className="title">{name}</h3>
          <p className="description">{description}</p>
          {release && <div className="release-date">{release}</div>}
        </div>
      </div>
    );
  }
