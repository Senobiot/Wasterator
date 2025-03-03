import React from "react";
import "./StyledTile.scss";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../reducers/statusReducer";
import { selectLoadingStatus } from "../../selectors/selectors";

export default function StyledTile({ data, last }) {
  const { imageUrl, name, description, rating, release, ratingMetacritic, inCollection, loader } = data;
  const dispatch = useDispatch();
  const loading = useSelector(selectLoadingStatus);
  const handleOnload = () => {

    dispatch(setLoading(false))};

  const getMetacriticColor = (score) => {
    if (score > 80) return 'metacritic-green';
    if (score > 60) return 'metacritic-yellow';
    if (score > 50) return 'metacritic-orange';
    if (score > 40) return 'metacritic-red';
    return 'metacritic-red';
  };


  return (
    <div className="styled-tile">
      <div className={`tile-image ${loading ? "canGhosted" : ""}`}>
        <img
          src={loader ? "/public/loader-fs.svg" : imageUrl}
          alt={name}
          onLoad={last && handleOnload}
        />
        {rating && <div className="rating">{rating}</div>}
        {inCollection && <div className="inCollection">{inCollection && '+'}</div>}
        {ratingMetacritic && (
          <div className={`metacritic ${getMetacriticColor(ratingMetacritic)}`}>
            {ratingMetacritic}
          </div>
        )}
      </div>
      <div className="tile-content">
        <h3 className="title">{name}</h3>
        <p className="description">{description}</p>
        {release && <div className="release-date">{release}</div>}
      </div>
    </div>
  );
}
