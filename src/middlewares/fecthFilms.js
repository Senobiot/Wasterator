import { API as API_ACTION_TYPE, FILMS } from "../constants/ActionTypes/AtcionTypes";
import { FILMS as API_CONFIG } from "../constants/api-config";
import { FILMS_IMPORTANT_FIELDS, NUMBER_OF_SEARCH_ITEMS } from "../constants/constants";
import { fieldsFilter, objectSort } from "../utils/utils";

const fecthFilms = () => (next) => async (action) => {
  let modifiedData = { ...action };

  if (action.type === API_ACTION_TYPE.FILMS.GET_LIST_BY_NAME) {
    const response = await fetch(API_CONFIG.getByName + action.payload, API_CONFIG.HEADERS);
    const data = await response.json();
    const filteredData = data.docs.map((e) =>
      fieldsFilter(e, FILMS_IMPORTANT_FIELDS)
    );
    // TODO Переделать
    const sortedByVotesData = filteredData
      .sort(objectSort(["votes", "kp"]))
      .splice(0, NUMBER_OF_SEARCH_ITEMS.FILMS);
      modifiedData.payload = { [action.payload]: sortedByVotesData };
    return next(modifiedData);
  }

    if (action.type === API_ACTION_TYPE.FILMS.GET_DETAILED_INFO) {
        const response = await fetch(API_CONFIG.getInfoById + action.payload, API_CONFIG.HEADERS);
        const data = await response.json();

      return next({type: FILMS.ADD_DETAILS, payload: data});
    }

  return next(action);
};

export default fecthFilms;
