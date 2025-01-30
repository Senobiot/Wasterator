import { useRef, useState } from "react";
import { fecthFilmsByTitle, fecthGamesByTitle } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SEARCH } from "../../constants/ActionTypes/AtcionTypes";
import {
  selectSearchType,
  selectGamesSearchHistory,
  selectFilmsSearchHistory
} from "../../selectors/selectors";
import classes from "./SearchBar.module.scss";
import { SearchTypes } from "../../constants/constants";

export default function SearchBar() {
  const gamesSearchHistory = useSelector(selectGamesSearchHistory);
  const filmsSearchHistory = useSelector(selectFilmsSearchHistory);
  const [searchBoxClass, setSearchBoxClass] = useState("");
  const [searchType, setSearchType] = useState(SEARCH.TYPE.GAMES);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (useKeyboard) => {
    const searchItem = inputRef.current.value;
    if (!searchItem) return;

    inputRef.current.value = "";

    if (useKeyboard) {
      navigate("/results");
    }
    inputRef.current.disabled = true;
  
    if (searchType === SEARCH.TYPE.FILMS) {
      if (searchItem in filmsSearchHistory) {
        const payload = { [searchItem]: filmsSearchHistory[searchItem] };
        inputRef.current.disabled = false;
        return dispatch({ type: SEARCH.STORE_FILM_LIST, payload: payload });
      }

      const fetchedFilms = await fecthFilmsByTitle(searchItem);
      inputRef.current.disabled = false;
      return dispatch({type: SEARCH.STORE_FILM_LIST, payload: { [searchItem]: fetchedFilms }})
    }

    if (searchItem in gamesSearchHistory) {
      const payload = { [searchItem]: gamesSearchHistory[searchItem] };
      inputRef.current.disabled = false;
      return dispatch({ type: SEARCH.STORE_GAME_LIST, payload: payload });
    }

    const fetchedGames = await fecthGamesByTitle(searchItem);
      dispatch({ type: SEARCH.STORE_GAME_LIST, payload:  { [searchItem]: fetchedGames }});
    inputRef.current.disabled = false;
  };

  const handleKeyDown = (event) => {
    setSearchBoxClass("");
    if (event.keyCode == 13) handleSubmit(true);
  };

  const handleFocus = () => {
    setSearchBoxClass(classes.focused);
  };

  const handleType = (type) => {
    setSearchType(type);
    setSearchBoxClass("");
  };

  return (
    <div className={classes.search_wrapper}>
      <input
        className={classes.search_input}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        ref={inputRef}
        type="search"
        id="gamesSearch"
        placeholder={SearchTypes[searchType]}
      />
      <Link to="/results">
        <span className={classes.search_lense} onClick={handleSubmit}>
          <img className={classes.search_image} />
        </span>
      </Link>
      <div className={`${classes.types} ${searchBoxClass}`}>
        <div
          onClick={() => handleType(SEARCH.TYPE.GAMES)}
          className={`${classes.types_games} ${SEARCH.TYPE.GAMES === searchType ? classes.active : ""}`}
        >
          {SearchTypes.GAMES}
        </div>
        <div
          onClick={() => handleType(SEARCH.TYPE.FILMS)}
          className={`${classes.types_films} ${SEARCH.TYPE.FILMS === searchType ? classes.active : ""}`}
        >
          {SearchTypes.FILMS}
        </div>
      </div>
    </div>
  );
}
