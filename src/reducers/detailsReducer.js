import { createSlice } from "@reduxjs/toolkit";

const detailsSlice = createSlice({
  name: "details",
  initialState: {},
  reducers: {
    setDetails: (state, action) => {
      console.log(action);
      return action.payload;
    },
    getDetails: (state, action) => {
      console.log(action);
      return action.payload;
    },
  },
});

export const { setDetails, getDetails } = detailsSlice.actions;
export default detailsSlice.reducer;
