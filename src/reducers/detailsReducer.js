import { createSlice } from "@reduxjs/toolkit";

const detailsSlice = createSlice({
  name: "details",
  initialState: {},
  reducers: {
    setDetails: (state, action) => {
      return action.payload;
    },
    updatePlayedTime: (state, action) => {
      state.playedTime = action.payload.playedTime;
    },
    getDetails: (state, action) => {
      return action.payload;
    },
    getDetailsById: (state, action) => {
      return action.payload;
    },
  },
});

export const { setDetails, getDetails, getDetailsById, updatePlayedTime } =
  detailsSlice.actions;
export default detailsSlice.reducer;
