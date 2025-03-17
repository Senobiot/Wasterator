import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registerSuccess: false,
  isLoggingIn: true,
  isLoggedIn: false,
  user: null,
  error: "",
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
      state.error = "";
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
      state.error = "";
      state.registerSuccess = true;
    },
    authStatusReset: (state) => {
      state.error = "";
      state.registerSuccess = false;
    },
    checkIsAuth: (state) => state,
    uploadAvatar: (state) => state,
    changeAvatar: (state, action) => {
      state.user.avatar = action.payload;
    },
  },
});

export const {
  checkIsAuth,
  loading,
  authFailed,
  registerRequest,
  authStatusReset,
  registerSuccess,
  loginRequest,
  loginSuccess,
  loginFailure,
  logOff,
  refreshToken,
  uploadAvatar,
  changeAvatar,
} = authSlice.actions;

export default authSlice.reducer;
