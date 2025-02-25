import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSearch: [],
  games: [],
  films: [],
  topGames: [],
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
    getTopList: (state, action) => {
      state.topGames = action.payload;
    },
  },
});

export const { getListByName, type, updateCurrentSearchMark, getTopList } = searchSlice.actions;
export default searchSlice.reducer;
