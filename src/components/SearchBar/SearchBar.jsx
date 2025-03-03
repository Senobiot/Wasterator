import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaGamepad, FaFilm, FaSearch } from "react-icons/fa";
import classes from "./SearchBar.module.scss";
import { INSCRIPTIONS_KEYS, SEARCH_TYPE } from "../../constants/constants";
import {
  fetchFilmsListbyName,
} from "../../actions";
import { getListByName } from "../../reducers/searchReducer";

export default function SearchBar() {
  const [isMoviesSearch, setisMoviesSearch] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event, useKeyboard) => {
    const searchItem = inputRef.current.value.trim();

    if (!searchItem) return event.preventDefault();
    if (useKeyboard) navigate("/results");

    isMoviesSearch
      ? dispatch(fetchFilmsListbyName(searchItem))
      : dispatch(getListByName(searchItem));
  };

  const handleToggleChange = () => {
    setisMoviesSearch(!isMoviesSearch);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode == 13) handleSubmit(event, true);
  };

  return (
    <div
      className={`${classes.search_container} ${isMoviesSearch ? classes.movies : classes.games}`}
    >
      <Link
        to="/results"
        onClick={handleSubmit}
        className={`${classes.lense_wrapper} ${isMoviesSearch ? classes.movies : classes.games}`}
        title={isMoviesSearch ? "Search movies" : "Search games"}
      >
        <FaSearch className={classes.search_lens} />
      </Link>
      <div
        className={`${classes.icon_wrapper} ${isMoviesSearch ? classes.movies : classes.games}`}
        onClick={handleToggleChange}
        title={isMoviesSearch ? "Switch to games" : "Switch to movies"}
      >
        {isMoviesSearch ? <FaFilm /> : <FaGamepad />}
      </div>
      <input
        onKeyDown={handleKeyDown}
        ref={inputRef}
        type="text"
        placeholder={isMoviesSearch ? "Search movies..." : "Search games..."}
        className={classes.search_input}
      />
    </div>
  );
}
