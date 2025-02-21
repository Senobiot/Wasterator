import { setItemDetails } from "../actions";
import { API } from "../actions/types";
import { GAMES as API_CONFIG } from "../constants/api-config";
import {
  COLLECTION_FIELDS,
  GAMES_ENDPOINTS,
  SEARCH_TYPE,
} from "../constants/constants";
import { save, type } from "../reducers/searchReducer";
import { setLoading } from "../reducers/statusReducer";
import { fieldsFilter } from "../utils/utils";

const fetchGames = () => (next) => async (action) => {
  if (action.type === API.GAMES.GET_LIST_BY_NAME) {
    next(setLoading(true));
    try {
      const response = await fetch(
        GAMES_ENDPOINTS.search + "?name=" + action.payload,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${sessionStorage.accessToken}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const result = await response.json();
      next(type(SEARCH_TYPE.GAMES));
      next(save(result));
      next(setLoading(false));
    } catch (error) {
      console.log(error);
    }
  }

  if (action.type === API.GAMES.GET_DETAILED_INFO) {
    const response = await fetch(action.payload + API_CONFIG.getInfoById);
    const data = await response.json();
    const filteredData = fieldsFilter(data.results, COLLECTION_FIELDS);

    return next(setItemDetails(filteredData));
  }

  return next(action);
};

export default fetchGames;
