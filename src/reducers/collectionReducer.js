import { GAMES, FILMS } from "../constants/ActionTypes/AtcionTypes";
import { COLLECTION_TYPES } from "../constants/constants";
import { getStorageItem, setStorageItem } from "../utils/utils";

const savedGamesCollection = getStorageItem(COLLECTION_TYPES.GAMES);
const savedFilmsCollection = getStorageItem(COLLECTION_TYPES.FILMS);
const initialState = { games: savedGamesCollection, films: savedFilmsCollection };

const collectionReducer = (state = initialState, action) => {
  switch (action.type) {
    //probably no need?
    case GAMES.GET_COLLECTION: {
      return getStorageItem(COLLECTION_TYPES.GAMES);
    }
    //probably no need?
    case FILMS.GET_COLLECTION: {
      return getStorageItem(COLLECTION_TYPES.FILMS);
    }

    case GAMES.UPDATE_PLAYED_TIME: {
      const newCollection = state.games.map((game) => {
        if (game.id === action.payload.id) {
          const updatebleGame = { ...game };
          updatebleGame.playedTime = action.payload.playedTime;
          return updatebleGame;
        }

        return game;
      });
      setStorageItem(COLLECTION_TYPES.GAMES, newCollection);

      return { ...state, games: newCollection };
    }

    case GAMES.ADD_TO_COLLECTION: {
      const newCollection = [...state.games, action.payload];
      setStorageItem(COLLECTION_TYPES.GAMES, newCollection);

      return { ...state, games: newCollection };
    }

    // case FILMS.ADD_TO_COLLECTION: {
    //   console.log(state.films)
    //   console.log(action.payload);
    //   const newCollection = [...state.films, action.payload];
    //   setStorageItem(COLLECTION_TYPES.FILMS, newCollection);

    //   return { ...state, films: newCollection };
    // }

    case GAMES.DELETE_FROM_COLLECTION: {
      const newCollection = state.games.filter((e) => e.id !== action.payload);
      setStorageItem(COLLECTION_TYPES.GAMES, newCollection);
      return { ...state, games: newCollection };
    }

    default:
      return state;
  }
};

export default collectionReducer;
