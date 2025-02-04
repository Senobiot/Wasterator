// import './Card.css';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectDetails } from "../../selectors/selectors";
import { fetchGameDetail, fecthFilmById } from "../../api/api";
import Button from "../Button/Button";
import classes from "./DetailedGameCard.module.scss";
import { GAMES } from "../../constants/ActionTypes/AtcionTypes";
import { fieldsFilter } from "../../utils/utils";
import { collectionFields } from "../../constants/constants";
import PlayedTime from "./PlayedTime/PlayedTime";

export default function Card() {
  const dispatch = useDispatch();
  const [loadedImg, setLoadedImg] = useState('ghostloader');
  const [loadedText, setLoadedText] = useState('ghostloader');
  const updateCurrent = (item) => {
    dispatch({ type: GAMES.ADD_DETAILS, payload: item });
  };
  const details = useSelector(selectDetails);

  const addGameToCollection = () => {
    const newCollectionItem = { ...details, isInCollection: true, playedTime: 0 };
    dispatch({ type: GAMES.ADD_TO_COLLECTION, payload: newCollectionItem });
    updateCurrent(newCollectionItem);
  };

  const deleteGameFromCollection = () => {
    dispatch({ type: GAMES.DELETE_FROM_COLLECTION, payload: details.id });
    updateCurrent({ ...details, isInCollection: false });
  };

  const updatePlayedTime = () => {
    const playedTime = prompt("Сколько наиграли?");
    if (playedTime || playedTime === 0) {
      console.log(playedTime);
      dispatch({
        type: GAMES.UPDATE_PLAYED_TIME,
        payload: { id: details.id, playedTime: +playedTime },
      });
      updateCurrent({ ...details, playedTime: +playedTime });
    }
  };

  useEffect(() => {
    if (details.isInCollection) {
      return setLoadedText('');
    }
    const query = async () => {
      // if (details.itemType) {
      //   const res = await fecthFilmById(details.id);
      //   console.log(res);
      // }
      const url = details.api_detail_url;
      if (url) {
        const details = await fetchGameDetail(url);
        const filteredDetails = fieldsFilter(details, collectionFields);
        updateCurrent({ ...details, ...filteredDetails });
        setLoadedText('');
      }
    };

    query();
  }, []);

  return !details.name ? (
    "No details...("
  ) : (
    <div className={classes.card}>
      <div className={classes.title}>{details.name}</div>
      <div className={classes.card_content}>
        <div className={`${classes.image_wrapper} ${loadedImg}`}>
          <img src={details?.image?.medium_url} onLoad={() => setLoadedImg('')} alt="" />
        </div>
        <div className={classes.description_wrapper}>
          <div className={`${classes.description} ${loadedText}`}>{details.deck}</div>
          <div className={classes.genres}>
            {details.themes?.map((e) => (
              <span key={e.name}>{e.name + " / "}</span>
            ))}
          </div>
          <div className={classes.release}>
            Release:{" "}
            {details.original_release_date ||
              details.expected_release_year}
          </div>
          <div className={classes.developers}>
            Developers:  {details.developers?.map((e) => (
              <div key={e.name}>{e.name}</div>
            ))}
          </div>
          {details.playedTime ? (
            <PlayedTime
              className={classes.time}
              time={details.playedTime}
            />
          ) : (
            ""
          )}
          <div className={classes.button_wrapper}>
            {!details.isInCollection ? (
              <Button
                onClick={addGameToCollection}
                title="Добавить"
                className={classes.button}
              ></Button>
            ) : (
              ""
            )}
            {details.isInCollection ? (
              <Button
                onClick={deleteGameFromCollection}
                title="Удалить"
                className={`${classes.button} ${classes.red}`}
              ></Button>
            ) : (
              ""
            )}
            {details.isInCollection ? (
              <Button
                onClick={updatePlayedTime}
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
