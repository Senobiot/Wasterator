import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectDetails } from "../../selectors/selectors";
import Button from "../Button/Button";
import classes from "./GameCard.module.scss";
import PlayedTime from "./PlayedTime/PlayedTime";
import {
  setItemDetails,
  updatePlayedTime,
} from "../../actions";
import { getDetails } from "../../reducers/detailsReducer";
import Loader from "../Loader/Loader";

import { addItemToCollection, deleteItemFromCollection } from "../../reducers/collectionReducer";

export default function Card() {
  const details = useSelector(selectDetails);
  const {
    detailsUrl,
    inCollection,
    developers,
    genres,
    imageUrl,
    name,
    platforms,
    release,
    description,
    publishers,
    ratingMpaa,
    descriptionHtml,
    id,
  } = details;

  const dispatch = useDispatch();
  const [loadedImg, setLoadedImg] = useState(false);

  const handleAdd = () => {
    dispatch(addItemToCollection({ type: "game", id, playedTime: 0 }));
  };

  const handleDelete = () => {
    dispatch(deleteItemFromCollection({ type: "game", id }));
  };

  const handleUpdate = () => {
    const playedTime = prompt("Сколько наиграли?");
    if (playedTime || playedTime === 0) {
      dispatch(updatePlayedTime({ id: details.id, playedTime: +playedTime }));
      dispatch(setItemDetails({ ...details, playedTime: +playedTime }));
    }
  };

  useEffect(() => {
    if (detailsUrl) {
      dispatch(getDetails(detailsUrl));
    }
  }, []);

  return !details.name ? (
    "No details...("
  ) : (
    <div className={`${classes.card}`}>
      {!loadedImg ? (
        <Loader />
      ) : (
        <div
          className={classes.backDrop}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)),
        url(${imageUrl})`,
          }}
        ></div>
      )}
      <div className={classes.title}>{name}</div>
      <div className={classes.card_content}>
        <div className={`${classes.image_wrapper}`}>
          <img src={imageUrl} onLoad={() => setLoadedImg(true)} alt="" />
        </div>
        <div className={classes.description_wrapper}>
          <div className={`${classes.description}`}>{description}</div>
          {/* <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} /> */}
          <div className={classes.genres}>
            {genres?.map((e) => (
              <span key={e}>{e + " / "}</span>
            ))}
          </div>
          <div className={classes}>
            {platforms?.map((e) => (
              <span key={e.name}>{e.name + " / "}</span>
            ))}
          </div>
          <div className={classes.release}>Release: {release}</div>
          <div className={classes.developers}>
            Developers:{" "}
            {developers?.map((e) => (
              <div key={e.name}>{e.name}</div>
            ))}
          </div>
          <div className={classes.developers}>
            Publishers:{" "}
            {publishers?.map((e) => (
              <div key={e.name}>{e.name}</div>
            ))}
          </div>
          <div className={classes.developers}>
            Rating:{" "}
            {ratingMpaa?.map((e) => (
              <div key={e}>{e}</div>
            ))}
          </div>
          {details.playedTime ? (
            <PlayedTime className={classes.time} time={details.playedTime} />
          ) : (
            ""
          )}
          <div className={classes.button_wrapper}>
            {!inCollection ? (
              <Button
                onClick={handleAdd}
                title="Добавить"
                className={classes.button}
              />
            ) : (
              ""
            )}
            {inCollection ? (
              <Button
                onClick={handleDelete}
                title="Удалить"
                className={`${classes.button} ${classes.red}`}
              />
            ) : (
              ""
            )}
            {inCollection ? (
              <Button
                onClick={handleUpdate}
                title="Наиграно"
                className={`${classes.button} ${classes.yellow}`}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
