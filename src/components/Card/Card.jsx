// import './Card.css'; 
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGameById } from '../../selectors/selectors';
import { fetchGameDetail  } from '../../api/api';
import Button from '../Button/Button';
import classes from './Card.module.scss';

export default function Card () {
  const params = new URLSearchParams(document.location.search);
  const id = params.get("id");
  const gameDeatailUrl = useSelector(state => getGameById(state, id))?.api_detail_url;

  const dispatch = useDispatch();
  const addGameDetail = (data) => {
      dispatch({type: 'GAME_DETAIL', payload: data})
  }

  const addGameToCollection = () => {
    dispatch({type: 'ADD_GAME'})
}

  const getGameDeatil = useSelector(state => state.gameDetail);
  const addGame = () => {};

  useEffect(() => {
      const query = async () => {
        const details = await fetchGameDetail(gameDeatailUrl);
        addGameDetail(details);
        console.log(details.image.original_url);
      }

      query();
      
  }, []); 

  return ( !getGameDeatil ? 'Loading' :
    <div className={classes.card}>
      <div className={classes.title}>{getGameDeatil.name}</div>      
        <div className={classes.card_content}> 
          <div className={classes.image_wrapper}>
            <img src={getGameDeatil.image.medium_url} alt='' />
          </div>
          <div className={classes.description_wrapper}>
            <div className={classes.description}>{getGameDeatil.deck}</div>
            <div className={classes.genres}>{getGameDeatil.themes?.map(e => <span>{e.name + ' / '}</span>)}</div>
            <div className={classes.release}>Release: {getGameDeatil.original_release_date || getGameDeatil.expected_release_year}</div>
            <div className={classes.developers}>Developers: <br></br>{getGameDeatil.developers.map(e => <span>{e.name}</span>)}</div>
            <Button onClick={addGameToCollection} title='Добавить' className={classes.button}></Button>
          </div>
      </div>
    </div>
  );
};
