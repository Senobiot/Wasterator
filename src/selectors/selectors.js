export const getSearchList = (state) => state.game_list;
export const getGameById = (state, id) => state.game_list?.find(e => e.id === +id);

