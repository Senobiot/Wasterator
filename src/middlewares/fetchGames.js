import { setItemDetails } from "../actions";
import { API } from "../actions/types";
import { GAMES as API_CONFIG } from "../constants/api-config";
import {
  COLLECTION_FIELDS,
  GAMES_ENDPOINTS,
  SEARCH_TYPE,
} from "../constants/constants";
import { getDetails } from "../reducers/detailsReducer";
import { save, type } from "../reducers/searchReducer";
import { setLoading } from "../reducers/statusReducer";

const options = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${sessionStorage.accessToken}`,
    "Content-Type": "application/json",
  },
  credentials: "include",
};

const fetchGames = () => (next) => async (action) => {
  if (action.type === API.GAMES.GET_LIST_BY_NAME) {
    next(setLoading(true));
    try {
      const response = await fetch(
        GAMES_ENDPOINTS.search + action.payload,
        options
      );

      const result = await response.json();

      next(type(SEARCH_TYPE.GAMES));
      next(save(result));
      next(setLoading(false));
    } catch (error) {
      console.log(error);
    }
  }

  if (action.type === getDetails.type) {
    next(setLoading(true));

    try {
      const response = await fetch(
        GAMES_ENDPOINTS.getDeatails + action.payload,
        options
      );
      const details = await response.json();
      action.payload = details;
      // return next(getDetails(details));
    } catch (error) {

    } finally {
      next(setLoading(false));
    }
    // return next(setItemDetails(filteredData));
  }

  return next(action);
};

export default fetchGames;
