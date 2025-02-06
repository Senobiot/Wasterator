import { setItemDetails } from "../actions";
import { API } from "../actions/types";
import { GAMES as API_CONFIG } from "../constants/api-config";
import { COLLECTION_FIELDS, GAMES_IPORTANT_FIELDS } from "../constants/constants";
import { fieldsFilter } from "../utils/utils";

const fetchGames = () => (next) => async (action) => {
  let modifiedData = { ...action };
  if (action.type === API.GAMES.GET_LIST_BY_NAME) {
    const response = await fetch(API_CONFIG.getByName + action.payload);
    const data = await response.json();
    const filteredData = data.results.map((e) =>
      fieldsFilter(e, GAMES_IPORTANT_FIELDS)
    );
    modifiedData.payload = { [action.payload]: filteredData };
    return next(modifiedData);
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
