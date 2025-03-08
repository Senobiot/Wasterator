import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectDetails, selectLoadingStatus } from "../../selectors/selectors";
import Button from "../Button/Button";
import classes from "./GameCard.module.scss";
import PlayedTime from "./PlayedTime/PlayedTime";
import {
  getDetails,
  getDetailsById,
  updatePlayedTime,
} from "../../reducers/detailsReducer";
import Loader from "../Loader/Loader";
import {
  addItemToCollection,
  deleteItemFromCollection,
} from "../../reducers/collectionReducer";
import { useParams } from "react-router-dom";
import Detail from "./Detail";

export default function Card() {
  const { id: gameId } = useParams();
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
    playedTime,
    id,
  } = useSelector(selectDetails);

  const dispatch = useDispatch();
  const [loadedImg, setLoadedImg] = useState(false);
  const [bgPosition, setBgPosition] = useState(0);
  const loading = useSelector(selectLoadingStatus);

  const handleAdd = () => {
    dispatch(addItemToCollection({ type: "game", id, playedTime: 0 }));
  };

  const handleDelete = () => {
    dispatch(deleteItemFromCollection({ type: "game", id }));
  };

  const handleUpdate = () => {
    const playedTime = prompt("Сколько наиграли?");
    if (playedTime || playedTime === 0) {
      dispatch(
        updatePlayedTime({
          id,
          playedTime: +playedTime,
          type: "game",
        })
      );
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    // if (detailsUrl) {
    //   dispatch(getDetails(detailsUrl));
    // }
    if (gameId) {
      // TODO Why need to pass gameName ???
      dispatch(getDetailsById({ gameId, gameName: name }));
    }
  }, []);

  useEffect(() => {
    const image = new Image();
    image.src = imageUrl;

    image.onload = () => {
      setLoadedImg(true);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    setBgPosition(-window.scrollY / 4);
  };

  return !name ? (
    "No details...("
  ) : (
    <div className={`${classes.card}`}>
      {!loadedImg || (loading && <Loader />)}
      <div className={classes.title}>{name}</div>
      <div className={classes.card_content}>
        <div
          className={`${classes.image_wrapper}`}
          style={{
            backgroundPositionY: bgPosition,
            backgroundImage: `url("${imageUrl}")`,
          }}
        ></div>
        <div className={classes.description_wrapper}>
          <Detail details={description} styleClass={classes.description} />
          <Detail
            details={platforms}
            title="Platforms"
            styleClass={classes.platforms}
          />
          <Detail details={genres} title="Genres" styleClass={classes.genres} />
          <Detail
            details={developers}
            title="Developers"
            styleClass={classes.developers}
          />
          <Detail
            details={publishers}
            title="Publishers"
            styleClass={classes.publishers}
          />
          <Detail
            details={ratingMpaa}
            title="Rating ESRB"
            styleClass={classes.ratingMpaa}
          />
          <Detail
            details={release}
            title="Release"
            styleClass={classes.release}
          />
          {/* <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} /> */}

          {playedTime ? (
            <PlayedTime className={classes.time} time={playedTime} />
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
