import { GAMES } from "../constants/ActionTypes/AtcionTypes";

const gamesSearchList = (state = {}, action) => {
  switch (action.type) {
    case GAMES.ADD_SEARCH_LIST: {}
      return { ...state, current: action.payload };
    default:
      return state;
  }
};

export default gamesSearchList;
