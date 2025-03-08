import { MOVIES_ENDPOINTS, SEARCH_TYPE } from "../constants/constants";
import {
  getMovieDetails,
  searchMovieByName,
  setDetails,
  setLoading,
  setSearchType,
} from "../reducers";
import { setRequestOptions } from "../utils/utils";

const fecthFilms = () => (next) => async (action) => {
  if (action.type === searchMovieByName.type) {
    try {
      const response = await fetch(
        MOVIES_ENDPOINTS.search + action.payload,
        setRequestOptions()
      );
      const data = await response.json();
      next(setSearchType(SEARCH_TYPE.FILMS));
      return next(searchMovieByName(data));
    } catch (error) {
      console.log(error);
    } finally {
      next(setLoading(false));
    }
  }

  if (action.type === getMovieDetails.type) {
    try {
      const response = await fetch(
        MOVIES_ENDPOINTS.getDetails + action.payload,
        setRequestOptions()
      );

      const data = await response.json();
      console.log(data);
      return next(setDetails(data));
    } catch (error) {
      console.log(error);
    } finally {
      next(setLoading(false));
    }
  }

  return next(action);
};

export default fecthFilms;
