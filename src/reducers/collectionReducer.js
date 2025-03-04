import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  games: [],
  films: [],
};

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    addItemToCollection: (state, action) => {
      return state;
    },
    deleteItemFromCollection: (state, action) => {
      return state;
    },
    getGamesCollection: (state, action) => {
      state.games = action.payload;
    },
  },
});

export const {
  addItemToCollection,
  deleteItemFromCollection,
  getGamesCollection,
} = collectionSlice.actions;
export default collectionSlice.reducer;
