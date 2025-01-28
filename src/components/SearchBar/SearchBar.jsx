import { styled } from "styled-components";
import { useRef, useState } from "react";
import { fecthFilmsByTitle, fecthGamesByTitle } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GAMES, SEARCH_TYPE } from "../../constants/ActionTypes/AtcionTypes";
import { getSeacrhType } from "../../selectors/selectors";
import classes from "./SearchBar.module.scss";
import { SearchTypes } from "../../constants/constants";

export default function SearchBar() {
  const searchType = useSelector(getSeacrhType);
  const [searchBoxClass, setSearchBoxClass] = useState("");
  console.log("render SEARCH BAR");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addCurrentGameList = (data) => {
    dispatch({ type: GAMES.ADD_SEARCH_LIST, payload: data });
  };

  const inputRef = useRef(null);

  const handleSubmit = async (useKeyboard) => {
    const searchItem = inputRef.current.value;
    inputRef.current.value = "";

    if (!searchItem) return;

    if (useKeyboard) {
      navigate("/results");
    }
    if (searchItem in localStorage) {
      const result = JSON.parse(localStorage.getItem(searchItem));

      return addCurrentGameList(result);
    }

    if (searchType === SEARCH_TYPE.FILMS) {

      const fetchedFilms = await fecthFilmsByTitle(searchItem);
      return 
      //addCurrentFilmsList(fetchedFilms);
    }

    inputRef.current.disabled = true;
    const fetchedResults = await fecthGamesByTitle(searchItem);

    addCurrentGameList(fetchedResults);
    if (fetchedResults.length) {
      localStorage.setItem(searchItem, JSON.stringify(fetchedResults));
    }
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
          onClick={() => handleType(SEARCH_TYPE.GAMES)}
          className={`${classes.types_games} ${SEARCH_TYPE.GAMES === searchType ? classes.active : ""}`}
        >
          {SearchTypes.GAMES}
        </div>
        <div
          onClick={() => handleType(SEARCH_TYPE.FILMS)}
          className={`${classes.types_films} ${SEARCH_TYPE.FILMS === searchType ? classes.active : ""}`}
        >
          {SearchTypes.FILMS}
        </div>
      </div>
    </div>
  );
}
