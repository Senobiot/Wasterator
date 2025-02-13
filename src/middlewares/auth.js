import { loginSuccess, loginFailure } from "../reducers/authReducer";
import { getToken, setToken } from "../utils/utils";

const url = "http://localhost:3000/";
const defaultOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
};

const auth = () => (next) => async (action) => {
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
