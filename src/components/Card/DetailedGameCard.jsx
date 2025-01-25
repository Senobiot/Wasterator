// import './Card.css';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGameDetail } from "../../selectors/selectors";
import { fetchGameDetail } from "../../api/api";
import Button from "../Button/Button";
import classes from './DetailedGameCard.module.scss';
import { GAMES } from "../../constants/ActionTypes/AtcionTypes";

export default function Card() {
  const dispatch = useDispatch();
  const gameDetails = useSelector(getGameDetail);

  const addGameToCollection = () => {
    const newCollectionItem = {...gameDetails, isInCollection: true };
    dispatch({ type: GAMES.ADD_DETAILS, payload: newCollectionItem});
    dispatch({ type: GAMES.ADD_TO_COLLECTION, payload: newCollectionItem});

  };

  const deleteGameFromCollection = () => {
    dispatch({ type: GAMES.ADD_DETAILS, payload: {...gameDetails, isInCollection: false }});
    dispatch({ type: GAMES.DELETE_FROM_COLLECTION, payload: gameDetails.id });

  }

  useEffect(() => {
    const query = async () => {

      // const details = await fetchGameDetail(gameDetails);
      // addGameDetail(details);
    };

    query();
  }, []);

  return !gameDetails ? (
    "Loading"
  ) : (
    <div className={classes.card}>
      <div className={classes.title}>{gameDetails.name}</div>
      <div className={classes.card_content}>
        <div className={classes.image_wrapper}>
          <img src={gameDetails?.image?.medium_url} alt="" />
        </div>
        <div className={classes.description_wrapper}>
          <div className={classes.description}>{gameDetails.deck}</div>
          <div className={classes.genres}>
            {gameDetails.themes?.map((e) => (
              <span key={e.name}>{e.name + " / "}</span>
            ))}
          </div>
          <div className={classes.release}>
            Release:{" "}
            {gameDetails.original_release_date ||
              gameDetails.expected_release_year}
          </div>
          <div className={classes.developers}>
            Developers: <br></br>
            {gameDetails.developers?.map((e) => (
              <span key={e.name}>{e.name}</span>
            ))}
          </div>
          <div className={classes.button_wrapper}>
          {!gameDetails.isInCollection ? (
            <Button
              onClick={addGameToCollection}
              title="Добавить"
              className={classes.button}
            ></Button>
          ) : (
            ""
          )}  
          {gameDetails.isInCollection ? (
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
