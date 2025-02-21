import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSearch: [],
  games: [],
  films: [],
  type: '',
};


const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    save: (state, action) => {
      state.currentSearch = action.payload;
    },
    type: (state, action) => {
      state.type = action.payload;
    },
  },
});

export const { save, type } = searchSlice.actions;
export default searchSlice.reducer;