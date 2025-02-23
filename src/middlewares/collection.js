import MovieDto from "../dtos/movieDto";
import { FILMS } from "../actions/types";
import {
  COLLECTION_ENDPOINTS,
} from "../constants/constants";
import {
  addItemToCollection,
  deleteItemFromCollection,
} from "../reducers/collectionReducer";
import { setLoading } from "../reducers/statusReducer";
import { setDetails } from "../reducers/detailsReducer";
import { updateCurrentSearchMark } from "../reducers/searchReducer";
import { setRequestOptions } from "../utils/utils";

const collection = () => (next) => async (action) => {
  if (action.type === addItemToCollection.type) {
    setLoading(true);
    try {
      const response = await fetch(
        COLLECTION_ENDPOINTS.addToCollection,
        setRequestOptions({ data: action.payload })
      );
      const data = await response.json();

      next(updateCurrentSearchMark({ id: action.payload.id, value: true }));

      return next(setDetails(data));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (action.type === deleteItemFromCollection.type) {
    setLoading(true);
    try {
      const response = await fetch(
        COLLECTION_ENDPOINTS.deleteFromCollection,
        setRequestOptions({ data: action.payload })
      );

      const data = await response.json();

      next(updateCurrentSearchMark({ id: action.payload.id, value: false }));

      return next(setDetails(data));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // if (action.type === FILMS.ADD_TO_COLLECTION) {
  //   try {
  //     const response = await fetch(
  //       AUTH_ENDPOINTS.addToCollection,
  //       setOptions({data: dto})
  //     );
  //     const data = await response.json();

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  return next(action);
};

export default collection;
