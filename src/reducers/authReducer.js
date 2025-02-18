import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registerSuccess: false,
  isLoggingIn: false,
  isLoggedIn: false,
  user: null,
  error: '',
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loading: (state, action) => {
      state.isLoading = action.payload;
    },
    authFailed: (state, action) => {
      state.error = action.payload;
    },
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
    registerRequest: (state) => {
      state.error = '';
      state.registerSuccess = true;
    },
    registerReset: (state) => {
      state.error = '';
      state.registerSuccess = false;
    },
  },
});

export const { loading, authFailed, registerRequest, registerReset, registerSuccess, loginRequest, loginSuccess, loginFailure, logOff, refreshToken } =
  authSlice.actions;
export default authSlice.reducer;
