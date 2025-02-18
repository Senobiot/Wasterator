import { AUTH_ENDPOINTS } from "../constants/constants";
import { loginSuccess, loginFailure, authFailed, loading } from "../reducers/authReducer";
import { getToken, setToken } from "../utils/utils";

const setOptions = (body) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  };
};

const auth = () => (next) => async (action) => {
  if (action.type === "auth/registerRequest") {
    next(loading(true));
    try {
      const response = await fetch(AUTH_ENDPOINTS.registartion, setOptions(action.payload));
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
       return next(authFailed(data))
      }
      return next(action);
    } catch (error) {
      console.log(error);
    } finally {
      next(loading(false));
    }
  }

  if (action.type === "auth/loginRequest") {
    const options = { ...defaultOptions };
    options.body = JSON.stringify(action.payload);

    try {
      const response = await fetch(url + "login", options);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData);
      }

      const { user, token } = await response.json();

      setToken(token);
      console.log(user, token);
      return next(loginSuccess(user));
    } catch (error) {
      return next(loginFailure(error));
    }
  }

  if (action.type === "auth/logOff") {
    sessionStorage.clear();
  }

  if (action.type === "auth/refreshToken") {
    const options = { ...defaultOptions };

    options.body = JSON.stringify({ token: getToken(), email: action.payload });

    try {
      const response = await fetch(url + "refresh-token", options);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData);
      }

      const newToken = await response.json();

      console.log(newToken.expired);
    } catch (error) {
      console.log(error);
      return next(loginFailure(error));
    }
  }

  return next(action);
};

export default auth;
