// import './Card.css';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getGameById,
  getGameCollection,
  getGameDetail,
} from "../../selectors/selectors";
import { fetchGameDetail } from "../../api/api";
import Button from "../Button/Button";
import classes from "./Card.module.scss";
import { GAMES } from "../../constants/ActionTypes/AtcionTypes";

export default function Card() {
  const params = new URLSearchParams(document.location.search);
  const id = params.get("id");
  const gameInfo = useSelector((state) => getGameById(state, id));
  const collection = useSelector(getGameCollection);
  const gameDeatailUrl = gameInfo?.api_detail_url;

  const dispatch = useDispatch();
  const addGameDetail = (data) => {
    dispatch({ type: GAMES.ADD_DETAILS, payload: data });
  };

  const addGameToCollection = () => {
    console.log(gameInfo);
    dispatch({ type: GAMES.ADD_TO_COLLECTION, payload: gameInfo });
  };

  const deleteGameFromCollection = () => {
    dispatch({ type: GAMES.DELETE_FROM_COLLECTION, payload: gameInfo.id });
  }
  const gameDetail = useSelector(getGameDetail);
  const isInCollection = collection.find((game) => game?.id === gameDetail?.id);

  useEffect(() => {
    const query = async () => {
      const details = await fetchGameDetail(gameDeatailUrl);
      addGameDetail(details);
    };

    query();
  }, []);

  return !gameDetail ? (
    "Loading"
  ) : (
    <div className={classes.card}>
      <div className={classes.title}>{gameDetail.name}</div>
      <div className={classes.card_content}>
        <div className={classes.image_wrapper}>
          <img src={gameDetail?.image?.medium_url} alt="" />
        </div>
        <div className={classes.description_wrapper}>
          <div className={classes.description}>{gameDetail.deck}</div>
          <div className={classes.genres}>
            {gameDetail.themes?.map((e) => (
              <span key={e.name}>{e.name + " / "}</span>
            ))}
          </div>
          <div className={classes.release}>
            Release:{" "}
            {gameDetail.original_release_date ||
              gameDetail.expected_release_year}
          </div>
          <div className={classes.developers}>
            Developers: <br></br>
            {gameDetail.developers?.map((e) => (
              <span key={e.name}>{e.name}</span>
            ))}
          </div>
          <div className={classes.button_wrapper}>
          {!isInCollection ? (
            <Button
              onClick={addGameToCollection}
              title="Добавить"
              className={classes.button}
            ></Button>
          ) : (
            ""
          )}  
          {isInCollection ? (
            <Button
              onClick={deleteGameFromCollection}
              title="Удалить"
              className={`${classes.button} ${classes.red}`}
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
