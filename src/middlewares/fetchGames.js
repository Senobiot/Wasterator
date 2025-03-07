import { GAMES_ENDPOINTS, SEARCH_TYPE } from "../constants/constants";
import {
  getDetails,
  getDetailsById,
  setDetails,
} from "../reducers/detailsReducer";
import { searchGameByName, setSearchType, getMoreTopGames } from "../reducers";
import { setLoading } from "../reducers/";
import { setRequestOptions } from "../utils/utils";

const fetchGames = () => (next) => async (action) => {
  if (action.type === searchGameByName.type) {
    try {
      const response = await fetch(
        GAMES_ENDPOINTS.search + action.payload,
        setRequestOptions()
      );

      const result = await response.json();

      next(setSearchType(SEARCH_TYPE.GAMES));
      return next(searchGameByName(result));
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Reached finally block");
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
      console.log(error);
    } finally {
      next(setLoading(false));
    }
  }

  if (action.type === getDetailsById.type) {
    next(setLoading(true));

    try {
      const response = await fetch(
        GAMES_ENDPOINTS.getDeatailsById,
        setRequestOptions(action.payload)
      );
      const details = await response.json();
      return next(setDetails(details));
    } catch (error) {
      console.log(error);
    } finally {
      next(setLoading(false));
    }
  }

  if (action.type === getMoreTopGames.type) {
    if (action.payload.loggedUser) {
      try {
        const response = await fetch(
          GAMES_ENDPOINTS.getTopGamesWithAuhorization + action.payload.page,
          setRequestOptions()
        );
        const details = await response.json();
        action.payload = details;
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await fetch(
          GAMES_ENDPOINTS.getTopGames + action.payload.page,
          setRequestOptions()
        );
        const details = await response.json();
        action.payload = details;
      } catch (error) {
        console.log(error);
      }
    }
    next(setLoading(false));
  }

  return next(action);
};

export default fetchGames;
