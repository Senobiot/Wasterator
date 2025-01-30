import { SEARCH } from "../constants/ActionTypes/AtcionTypes";
import { SEARCH_TYPE } from "../constants/constants";
import { getStorageItem, setStorageItem } from "../utils/utils";

const initialStore = {
  currentSearch: [],
  games: getStorageItem(SEARCH.STORAGE_GAME__HISTORY_KEY),
  films: getStorageItem(SEARCH.STORAGE_FILMS_HISTORY_KEY),
};

const searchResultReducer = (state = initialStore, action) => {
  switch (action.type) {
    case SEARCH.STORE_GAME_LIST: {
      const newSearchGameList = { ...state.games, ...action.payload };
      setStorageItem(SEARCH.STORAGE_GAME__HISTORY_KEY, newSearchGameList);
      console.log(action.payload);
      return {...state, games: newSearchGameList, currentSearch: {...action.payload, type: SEARCH_TYPE.GAMES}};
    }
    case SEARCH.STORE_FILM_LIST: {
      const newSearchFilmsList = { ...state.films, ...action.payload };
      setStorageItem(SEARCH.STORAGE_FILMS_HISTORY_KEY, newSearchFilmsList);
      return {...state, films: newSearchFilmsList, currentSearch: action.payload};
    }
    default:
      return state;
  }
};

export default searchResultReducer;
