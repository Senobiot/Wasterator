import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import {
//   selectGamesSearchHistory,
//   selectFilmsSearchHistory
// } from "../../selectors/selectors";
import classes from "./SearchBar.module.scss";
import { INSCRIPTIONS_KEYS, SEARCH_TYPE } from "../../constants/constants";
import { fetchGamesListbyName, fetchFilmsListbyName, storeFilmSearchList, storeGameSearchList } from "../../actions";
import { getListByName } from "../../reducers/searchReducer";

export default function SearchBar() {
  // const gamesSearchHistory = useSelector(selectGamesSearchHistory);
  // const filmsSearchHistory = useSelector(selectFilmsSearchHistory);
  const [searchBoxClass, setSearchBoxClass] = useState("");
  const [searchType, setSearchType] = useState(SEARCH_TYPE.GAMES);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (useKeyboard) => {
    const searchItem = inputRef.current.value;
    if (!searchItem) return;
//TODO Make dependand of API request and store loading state
    inputRef.current.value = "";

    if (useKeyboard) {
      navigate("/results");
    }
    inputRef.current.disabled = true;

    // if (searchType === SEARCH_TYPE.FILMS) {
    //   if (searchItem in filmsSearchHistory) {
    //     const list = { [searchItem]: filmsSearchHistory[searchItem] };
    //     inputRef.current.disabled = false;
    //     return dispatch(storeFilmSearchList(list));
    //   }

    //   inputRef.current.disabled = false;
    //   return dispatch(fetchFilmsListbyName(searchItem))
    // }

    // if (searchItem in gamesSearchHistory) {
    //   const list = { [searchItem]: gamesSearchHistory[searchItem] };
    //   inputRef.current.disabled = false;
    //   return dispatch(storeGameSearchList(list));
    // }

    dispatch(getListByName(searchItem))
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
        placeholder={INSCRIPTIONS_KEYS.SEARCH_BOX[searchType]}
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
          {INSCRIPTIONS_KEYS.SEARCH_BOX.GAMES}
        </div>
        <div
          onClick={() => handleType(SEARCH_TYPE.FILMS)}
          className={`${classes.types_films} ${SEARCH_TYPE.FILMS === searchType ? classes.active : ""}`}
        >
          {INSCRIPTIONS_KEYS.SEARCH_BOX.FILMS}
        </div>
      </div>
    </div>
  );
}
