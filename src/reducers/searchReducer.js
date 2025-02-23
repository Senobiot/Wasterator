import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSearch: [],
  games: [],
  films: [],
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
  },
});

export const { getListByName, type, updateCurrentSearchMark } = searchSlice.actions;
export default searchSlice.reducer;
