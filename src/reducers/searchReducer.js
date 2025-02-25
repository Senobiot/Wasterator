import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSearch: [],
  games: [],
  films: [],
  topGames: {
    page: 0,
    list: []
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
      console.log(state.topGames.page);
    },
  },
});

export const { getListByName, type, updateCurrentSearchMark, getTopList, getMoreTopGames } = searchSlice.actions;
export default searchSlice.reducer;
