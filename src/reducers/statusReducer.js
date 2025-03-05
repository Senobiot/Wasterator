import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ghostLoading: false,
  loading: true,
  error: "",
};

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
      // Disable ghostloader in search section after disabling global loading status
      if (!action.payload) {
        state.ghostLoading = false;
      }
    },
    setGhostLoading: (state, action) => {
      state.ghostLoading = action.payload;
    },
  },
});

export const { setLoading, setGhostLoading } = statusSlice.actions;
export default statusSlice.reducer;
