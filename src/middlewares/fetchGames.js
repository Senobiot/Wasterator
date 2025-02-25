import {
  GAMES_ENDPOINTS,
  SEARCH_TYPE,
} from "../constants/constants";
import { getDetails, getDetailsById } from "../reducers/detailsReducer";
import { getListByName, type, getMoreTopGames } from "../reducers/searchReducer";
import { setLoading } from "../reducers/statusReducer";
import { setRequestOptions } from "../utils/utils";

const fetchGames = () => (next) => async (action) => {
  if (action.type === getListByName.type) {
    next(setLoading(true));
    try {
      const response = await fetch(
        GAMES_ENDPOINTS.search + action.payload,
        setRequestOptions()
      );

      const result = await response.json();

      next(type(SEARCH_TYPE.GAMES));
      return next(getListByName(result));
    } catch (error) {
      console.log(error);
    } finally{
      next(setLoading(false));
    }
  }

  if (action.type === getDetails.type) {
    next(setLoading(true));

    try {
      const response = await fetch(
        GAMES_ENDPOINTS.getDeatails + action.payload,
        setRequestOptions()
      );
      const details = await response.json();
      action.payload = details;

      return next(getDetails(details));
    } catch (error) {

    } finally {
      next(setLoading(false));
    }
  }

  if (action.type === getDetailsById.type) {
    next(setLoading(true));

    try {
      const response = await fetch(
        GAMES_ENDPOINTS.getDeatailsById + action.payload,
        setRequestOptions()
      );
      const details = await response.json();
      action.payload = details;
      return
    } catch (error) {

    } finally {
      next(setLoading(false));
    }

  }

  if (action.type === getMoreTopGames.type) {
    try {
      const response = await fetch(
        GAMES_ENDPOINTS.getTopGames + action.payload,
        setRequestOptions()
      );
      const details = await response.json();
      action.payload = details;
    } catch (error) {
      console.log(error);
    } 
  }

  return next(action);
};

export default fetchGames;
