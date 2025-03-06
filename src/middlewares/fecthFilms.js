import { MOVIES_ENDPOINTS } from "../constants/constants";
import { searchMovieByName, setLoading } from "../reducers";
import { setRequestOptions } from "../utils/utils";

const fecthFilms = () => (next) => async (action) => {
  if (action.type === searchMovieByName.type) {
    try {
      const response = await fetch(
        MOVIES_ENDPOINTS.search + action.payload,
        setRequestOptions()
      );
      const data = await response.json();

      return next(searchMovieByName(data));
    } catch (error) {
      console.log(error);
    } finally {
      next(setLoading(false));
    }
  }
  return next(action);
};

export default fecthFilms;
