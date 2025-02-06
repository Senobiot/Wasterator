// import './Card.css';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectDetails } from "../../selectors/selectors";
import Button from "../Button/Button";
import classes from "./GameCard.module.scss";
import PlayedTime from "./PlayedTime/PlayedTime";
import { addGameToCollection, deleteGameFromCollection, fetchGameInfo, setItemDetails, updatePlayedTime } from "../../actions";

export default function Card() {
  const details = useSelector(selectDetails);
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
    if (details.isInCollection) {
      return setLoadedText("");
    }
    if (details.api_detail_url) {
      // TODO тут надо сделать лоадер пока нет данных
      setLoadedText("");
      dispatch(fetchGameInfo(details.api_detail_url));
    }
  }, []);

  return !details.name ? (
    "No details...("
  ) : (
    <div className={classes.card}>
      <div className={classes.title}>{details.name}</div>
      <div className={classes.card_content}>
        <div className={`${classes.image_wrapper} ${loadedImg}`}>
          <img
            src={details?.image?.medium_url}
            onLoad={() => setLoadedImg("")}
            alt=""
          />
        </div>
        <div className={classes.description_wrapper}>
          <div className={`${classes.description} ${loadedText}`}>
            {details.deck}
          </div>
          <div className={classes.genres}>
            {details.themes?.map((e) => (
              <span key={e.name}>{e.name + " / "}</span>
            ))}
          </div>
          <div className={classes.release}>
            Release:{" "}
            {details.original_release_date || details.expected_release_year}
          </div>
          <div className={classes.developers}>
            Developers:{" "}
            {details.developers?.map((e) => (
              <div key={e.name}>{e.name}</div>
            ))}
          </div>
          {details.playedTime ? (
            <PlayedTime className={classes.time} time={details.playedTime} />
          ) : (
            ""
          )}
          <div className={classes.button_wrapper}>
            {!details.isInCollection ? (
              <Button
                onClick={handleAdd}
                title="Добавить"
                className={classes.button}
              ></Button>
            ) : (
              ""
            )}
            {details.isInCollection ? (
              <Button
                onClick={handleDelete}
                title="Удалить"
                className={`${classes.button} ${classes.red}`}
              ></Button>
            ) : (
              ""
            )}
            {details.isInCollection ? (
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
