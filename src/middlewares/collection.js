import MovieDto from "../dtos/movieDto";
import { FILMS } from "../actions/types";
import {
  COLLECTION_ENDPOINTS,
} from "../constants/constants";
import {
  addItemToCollection,
  deleteItemFromCollection,
  getGamesCollection,
} from "../reducers/collectionReducer";
import { setLoading } from "../reducers/statusReducer";
import { setDetails, updatePlayedTime } from "../reducers/detailsReducer";
import { updateCurrentSearchMark, updateCurrentTopGamesCollectionMark } from "../reducers/searchReducer";
import { setRequestOptions } from "../utils/utils";

const collection = () => (next) => async (action) => {
  if (action.type === getGamesCollection.type) {
    // setLoading(true);
    try {
      const response = await fetch(
        COLLECTION_ENDPOINTS.getCollection,
        setRequestOptions()
      );
      const data = await response.json();
      action.payload = data;
    } catch (error) {
      console.log(error);
    } finally {
      // setLoading(false);
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
      next(updateCurrentTopGamesCollectionMark({ id: action.payload.id, value: true }));
    
      return next(setDetails(data));
    } catch (error) {
      console.log(error);
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
      next(updateCurrentTopGamesCollectionMark({ id: action.payload.id, value: false }));

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
      console.log(data);
      // next(updateCurrentSearchMark({ id: action.payload.id, value: false }));
      // next(updateCurrentTopGamesCollectionMark({ id: action.payload.id, value: false }));

      // return next(setDetails(data));
    } catch (error) {
      console.log(error);
    }
  }

  return next(action);
};

export default collection;
