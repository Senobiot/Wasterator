import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggingIn: false,
  isLoggedIn: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.isLoggingIn = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoggingIn = false;
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    loginFailure: (state, action) => {
      state.isLoggingIn = false;
      state.error = action.payload;
    },
    logOff: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    refreshToken: (state) => state,
  },
});

export const { loginRequest, loginSuccess, loginFailure, logOff, refreshToken } =
  authSlice.actions;
export default authSlice.reducer;
