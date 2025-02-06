import { SET_ITEM_DETAILS } from "../actions/types";

const detailsReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_ITEM_DETAILS: {
      return action.payload;
    }
    default:
      return state;
  }
};

export default detailsReducer;
