import { GAMES } from "../constants/ActionTypes/AtcionTypes";
import { getStorageCollection, setStorageCollection } from "../utils/utils";

const savedCollection = getStorageCollection();

const collection = (state = savedCollection, action) => {
  switch (action.type) {
    case GAMES.GET_COLLECTION: {
      return getStorageCollection();
    }
    case GAMES.DELETE_FROM_COLLECTION: {
      const newCollection = state.filter((e) => e.id !== action.payload);
      setStorageCollection(newCollection);
      return newCollection;
    }
    case GAMES.UPDATE_PLAYED_TIME: {
      const updatedCollection = state.map((game) => {
        if (game.id === action.payload.id) {
          game.playedTime = action.payload.playedTime;
        }

        return game;
      });
      setStorageCollection(updatedCollection);

      return updatedCollection;
    }
    case GAMES.ADD_TO_COLLECTION: {
      const newCollection = [...state, action.payload];
      setStorageCollection(newCollection);

      return newCollection;
    }
    default:
      return state;
  }
};

export default collection;
