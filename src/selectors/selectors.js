export const getSearchList = (state) => state.gamesSearchList;
// export const getGameById = (state, id) => {
//     // const gameDeatil = state.gameDetails.current;
//     // console.log(gameDeatil)
//     const fromSearch = state.gamesSearchList.current;
//     if (fromSearch) {
//         const result = fromSearch.find(e => e.id === +id);
//         if (result) return result;
//     }
//     const res = state.collection.find(e => e.id === +id);
// console.log(state.collection)
// console.log(id)
//     return res;

// };
export const getGameCollection = (state) => state.collection;
//export const getItemfromCollection = (state, id) => state.collection.find(e => e.id === id);
export const getGameDetail = (state) => state.gameDetails;
