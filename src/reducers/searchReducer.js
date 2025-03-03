import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSearch: [],
  games: [],
  films: [],
  scrollPosition: 0,
  topGames: {
    page: 0,
    list: [],
  },
  type: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    getListByName: (state, action) => {
      state.currentSearch = action.payload;
    },
    type: (state, action) => {
      state.type = action.payload;
    },
    updateCurrentSearchMark: (state, action) => {
      const { id, value } = action.payload;
      const updated = state.currentSearch.map((e) => {
        if (e.id === id) {
          e.inCollection = value;
          return e;
        }
        return e;
      });
      state.currentSearch = updated;
    },
    getMoreTopGames: (state, action) => {
      state.topGames.list = [...state.topGames.list, ...action.payload];
      state.topGames.page++;
    },
    updateCurrentTopGamesCollectionMark: (state, action) => {
      const { id, value } = action.payload;
      const updated = state.topGames.list.map((e) => {
        if (e.id === id) {
          e.inCollection = value;
          return e;
        }
        return e;
      });
      state.topGames.list = updated;
    },
    setScrollPosition: (state, action) => {
      state.scrollPosition = action.payload;
      console.log(state.scrollPosition);
    },
  },
});

export const {
  getListByName,
  type,
  updateCurrentSearchMark,
  getTopList,
  getMoreTopGames,
  updateCurrentTopGamesCollectionMark,
  setScrollPosition,
} = searchSlice.actions;
export default searchSlice.reducer;
