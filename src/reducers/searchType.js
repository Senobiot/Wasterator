import { SEARCH_TYPE } from "../constants/ActionTypes/AtcionTypes";

const initialState = SEARCH_TYPE.GAMES;

const seacrhType = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_TYPE.GAMES: {
      console.log(action);
        return SEARCH_TYPE.GAMES;
    }
    case SEARCH_TYPE.FILMS: {
      console.log(action);
        return SEARCH_TYPE.FILMS;
    }
    default:
      return state;
  }
}

export default seacrhType;
