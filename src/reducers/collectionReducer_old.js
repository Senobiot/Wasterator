import { GAMES, FILMS } from "../actions/types";
import { COLLECTION_TYPES } from "../constants/constants";
import { getStorageItem, setStorageItem } from "../utils/utils";

const savedGamesCollection = getStorageItem(COLLECTION_TYPES.GAMES);
const savedFilmsCollection = getStorageItem(COLLECTION_TYPES.FILMS);
const initialState = { games: savedGamesCollection, films: savedFilmsCollection };

const collectionReducer = (state = initialState, action) => {
  switch (action.type) {
    //TODO probably no need?
    case GAMES.GET_COLLECTION: {
      return getStorageItem(COLLECTION_TYPES.GAMES);
    }
    //TODO probably no need?
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
            // TODO перенести в middleware
      setStorageItem(COLLECTION_TYPES.GAMES, newCollection);

      return { ...state, games: newCollection };
    }

    case FILMS.ADD_TO_COLLECTION: {

      // const newCollection = [...state.films, action.payload];
      //       // TODO перенести в middleware
      // setStorageItem(COLLECTION_TYPES.FILMS, newCollection);

      // return { ...state, films: newCollection };
      return state;
    }

    case GAMES.DELETE_FROM_COLLECTION: {
      const newCollection = state.games.filter((e) => e.id !== action.payload);
            // TODO перенести в middleware
      setStorageItem(COLLECTION_TYPES.GAMES, newCollection);
      return { ...state, games: newCollection };
    }

    case FILMS.DELETE_FROM_COLLECTION: {
      const newCollection = state.films.filter((e) => e.id !== action.payload);
            // TODO перенести в middleware
      setStorageItem(COLLECTION_TYPES.FILMS, newCollection);
      return { ...state, films: newCollection };
    }

    default:
      return state;
  }
};

export default collectionReducer;
