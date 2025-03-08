import { COLLECTION_ENDPOINTS } from "../constants/constants";
import {
  addItemToCollection,
  deleteItemFromCollection,
  getGamesCollection,
  getMoviesCollection,
  setLoading,
  setDetails,
  updatePlayedTime,
  updateCurrentSearchMark,
  updateCurrentTopGamesCollectionMark,
} from "../reducers";
import { setRequestOptions } from "../utils/utils";

const collection = () => (next) => async (action) => {
  if (action.type === getGamesCollection.type) {
    try {
      const response = await fetch(
        COLLECTION_ENDPOINTS.getCollection + "game",
        setRequestOptions()
      );
      const data = await response.json();
      action.payload = data;
    } catch (error) {
      console.log(error);
    }
  }

  if (action.type === getMoviesCollection.type) {
    try {
      const response = await fetch(
        COLLECTION_ENDPOINTS.getCollection + "movie",
        setRequestOptions()
      );
      const data = await response.json();
      action.payload = data;
    } catch (error) {
      console.log(error);
    } finally {
      next(setLoading(false));
    }
  }

  if (action.type === addItemToCollection.type) {
    try {
      const response = await fetch(
        COLLECTION_ENDPOINTS.addToCollection,
        setRequestOptions({ data: action.payload })
      );
      const data = await response.json();

      next(updateCurrentSearchMark({ id: action.payload.id, value: true }));
      next(
        updateCurrentTopGamesCollectionMark({
          id: action.payload.id,
          value: true,
        })
      );

      return next(setDetails(data));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (action.type === deleteItemFromCollection.type) {
    try {
      const response = await fetch(
        COLLECTION_ENDPOINTS.deleteFromCollection,
        setRequestOptions({ data: action.payload })
      );

      const data = await response.json();

      next(updateCurrentSearchMark({ id: action.payload.id, value: false }));
      next(
        updateCurrentTopGamesCollectionMark({
          id: action.payload.id,
          value: false,
        })
      );

      return next(setDetails(data));
    } catch (error) {
      console.log(error);
    }
  }

  if (action.type === updatePlayedTime.type) {
    try {
      const response = await fetch(
        COLLECTION_ENDPOINTS.updateCollectableTime,
        setRequestOptions(action.payload)
      );

      const data = await response.json();
    } catch (error) {
      console.log(error);
    }
  }

  return next(action);
};

export default collection;
