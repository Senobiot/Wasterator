import { GAMES } from "../constants/ActionTypes/AtcionTypes";

const gamesSearchList = (state = {}, action) => {
  switch (action.type) {
    case GAMES.ADD_SEARCH_LIST:
      {
        console.log(action.payload);
        return action.payload;
      }
    default:
      return state;
  }
};

export default gamesSearchList;
