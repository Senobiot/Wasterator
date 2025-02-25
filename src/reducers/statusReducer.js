import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  error: '',
};

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = statusSlice.actions;
export default statusSlice.reducer;
