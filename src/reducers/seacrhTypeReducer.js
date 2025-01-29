import { SEARCH } from "../constants/ActionTypes/AtcionTypes";

const initialState = SEARCH.TYPE.GAMES;

const seacrhTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH.TYPE.GAMES: {
        return SEARCH.TYPE.GAMES;
    }
    case SEARCH.TYPE.FILMS: {
        return SEARCH.TYPE.FILMS;
    }
    default:
      return state;
  }
}

export default seacrhTypeReducer;
