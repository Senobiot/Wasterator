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
    getCollection: (state, action) => {
      return state;
    },
  },
});

export const { addItemToCollection, deleteItemFromCollection } =
  collectionSlice.actions;
export default collectionSlice.reducer;
