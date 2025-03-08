import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  games: [],
  movies: [],
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
    getMoviesCollection: (state, action) => {
      state.movies = action.payload;
    },
  },
});

export const {
  addItemToCollection,
  deleteItemFromCollection,
  getGamesCollection,
  getMoviesCollection,
} = collectionSlice.actions;
export default collectionSlice.reducer;
