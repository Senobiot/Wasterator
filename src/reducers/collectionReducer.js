import { createSlice } from "@reduxjs/toolkit";
import { VIEW_VARIANTS } from "../constants/constants";

const initialState = {
  games: [],
  movies: [],
  viewVariant: VIEW_VARIANTS.default,
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
    setViewVariant: (state, action) => {
      state.viewVariant = action.payload;
    },
  },
});

export const {
  addItemToCollection,
  deleteItemFromCollection,
  getGamesCollection,
  getMoviesCollection,
  setViewVariant,
} = collectionSlice.actions;
export default collectionSlice.reducer;
