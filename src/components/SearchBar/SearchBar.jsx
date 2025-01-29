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
  const searchType = useSelector(selectSearchType);
  const gamesSearchHistory = useSelector(selectGamesSearchHistory);
  const filmsSearchHistory = useSelector(selectFilmsSearchHistory);
  const [searchBoxClass, setSearchBoxClass] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addCurrentGameList = (data) => {
    dispatch({ type: SEARCH.STORE_GAME_LIST, payload: data });
  };
  const addCurrentFilmsList = (data) => {
    dispatch({ type: SEARCH.STORE_FILM_LIST, payload: data });
  };

  const handleSubmit = async (useKeyboard) => {
    const searchItem = inputRef.current.value;
    if (!searchItem) return;

    inputRef.current.value = "";

    if (useKeyboard) {
      navigate("/results");
    }

    if (searchType === SEARCH.TYPE.FILMS) {
      if (searchItem in filmsSearchHistory) {
        return addCurrentFilmsList({
          [searchItem]: filmsSearchHistory[searchItem],
        });
      }

      const fetchedFilms = await fecthFilmsByTitle(searchItem);
      return addCurrentFilmsList({ [searchItem]: fetchedFilms })
    }

    if (searchItem in gamesSearchHistory) {
      return addCurrentGameList({
        [searchItem]: gamesSearchHistory[searchItem],
      });
    }

    inputRef.current.disabled = true;
    const fetchedResults = await fecthGamesByTitle(searchItem);
    addCurrentGameList({ [searchItem]: fetchedResults });
    inputRef.current.disabled = false;
  };

  const handleKeyDown = (event) => {
    setSearchBoxClass("");
    if (event.keyCode == 13) handleSubmit(true);
  };

  const handleFocus = () => {
    setSearchBoxClass(classes.focused);
  };

  const handleType = (actionType) => {
    dispatch({ type: actionType });
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
