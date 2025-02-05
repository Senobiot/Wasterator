import { SEARCH_LIST } from "../constants/ActionTypes/AtcionTypes";

const currentSearchList = (state = {}, action) => {
  switch (action.type) {
    case SEARCH_LIST.ADD: {
      return action.payload;
    }
    default:
      return state;
  }
};

export default currentSearchList;
