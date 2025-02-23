// import './Card.css';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectDetails } from "../../selectors/selectors";
import Button from "../Button/Button";
import classes from "./GameCard.module.scss";
import PlayedTime from "./PlayedTime/PlayedTime";
import {
  addGameToCollection,
  deleteGameFromCollection,
  fetchGameInfo,
  setItemDetails,
  updatePlayedTime,
} from "../../actions";
import { getDetails } from "../../reducers/detailsReducer";

export default function Card() {
  const details = useSelector(selectDetails);
  const {
    detailUrl,
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
    descriptionHtml
  } = details;
  console.log(details);
  const dispatch = useDispatch();
  const [loadedImg, setLoadedImg] = useState("ghostloader");
  const [loadedText, setLoadedText] = useState("ghostloader");
  const handleAdd = () => {
    const newCollectionItem = {
      ...details,
      isInCollection: true,
      playedTime: 0,
    };
    dispatch(addGameToCollection(newCollectionItem));
    dispatch(setItemDetails(newCollectionItem));
  };

  const handleDelete = () => {
    dispatch(deleteGameFromCollection(details.id));
    dispatch(setItemDetails({ ...details, isInCollection: false }));
  };

  const handleUpdate = () => {
    const playedTime = prompt("Сколько наиграли?");
    if (playedTime || playedTime === 0) {
      dispatch(updatePlayedTime({ id: details.id, playedTime: +playedTime }));
      dispatch(setItemDetails({ ...details, playedTime: +playedTime }));
    }
  };

  useEffect(() => {
    // if (inCollection) {
    //   return setLoadedText("");
    // }
    if (detailUrl) {
      // TODO тут надо сделать лоадер пока нет данных
      setLoadedText("");
      dispatch(getDetails(detailUrl));
    }
  }, []);

  return !details.name ? (
    "No details...("
  ) : (
    <div className={classes.card}>
      <div className={classes.title}>{name}</div>
      <div className={classes.card_content}>
        <div className={`${classes.image_wrapper} ${loadedImg}`}>
          <img src={imageUrl} onLoad={() => setLoadedImg("")} alt="" />
        </div>
        <div className={classes.description_wrapper}>
          <div className={`${classes.description} ${loadedText}`}>
            {description}
          </div>
          <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
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
              ></Button>
            ) : (
              ""
            )}
            {inCollection ? (
              <Button
                onClick={handleDelete}
                title="Удалить"
                className={`${classes.button} ${classes.red}`}
              ></Button>
            ) : (
              ""
            )}
            {inCollection ? (
              <Button
                onClick={handleUpdate}
                title="Наиграно"
                className={`${classes.button} ${classes.yellow}`}
              ></Button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
