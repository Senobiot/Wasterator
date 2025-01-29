import { SEARCH } from "../constants/ActionTypes/AtcionTypes";
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
      return {...state, games: newSearchGameList, currentSearch: action.payload};
    }
    default:
      return state;
  }
};

export default searchResultReducer;
