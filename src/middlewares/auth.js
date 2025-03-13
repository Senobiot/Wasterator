import {
  AUTH_ENDPOINTS,
  FORM_INPUTS,
  TOKEN_NAMES,
} from "../constants/constants";
import {
  setLoading,
  loginSuccess,
  loginFailure,
  authFailed,
  loading,
  uploadAvatar,
} from "../reducers";
import { getToken, setSessionToken, setStorageItem } from "../utils/utils";
import { setRequestOptions } from "../utils/utils";

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
    // TODO Make this everywere
    next(loading(true));
    try {
      const response = await fetch(
        AUTH_ENDPOINTS.registartion,
        setOptions(action.payload)
      );
      const data = await response.json();

      if (!response.ok) {
        return next(authFailed(data));
      }

      return next(action);
    } catch (error) {
      console.log(error);
    } finally {
      next(loading(false));
    }
  }

  if (action.type === "auth/loginRequest") {
    try {
      const response = await fetch(
        AUTH_ENDPOINTS.login,
        setOptions(action.payload)
      );
      const data = await response.json();

      if (!response.ok) {
        return next(authFailed(data));
      }
      const { user, accessToken } = data;

      if (action.payload[FORM_INPUTS.stayLogged.id]) {
        setStorageItem(TOKEN_NAMES.access, accessToken);
      }

      setSessionToken(accessToken);

      return next(loginSuccess(user));
    } catch (error) {
      return next(loginFailure(error));
    }
  }

  if (action.type === "auth/logOff") {
    sessionStorage.clear();
    localStorage.removeItem(TOKEN_NAMES.access);
  }

  if (action.type === "auth/checkIsAuth") {
    if (localStorage[TOKEN_NAMES.access]) {
      try {
        const response = await fetch(AUTH_ENDPOINTS.refresh, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();

        if (!response.ok) {
          next(setLoading(false));
          next(loginFailure());
          return next(action);
        }

        const { user, accessToken } = data;

        setStorageItem(TOKEN_NAMES.access, accessToken);
        setSessionToken(accessToken);

        next(loginSuccess(user));
        return next(setLoading(false));
      } catch (error) {
        console.log(error);
      }
    } else {
      next(setLoading(false));
      return next(loginFailure());
    }
  }

  if (action.type === "auth/refreshToken") {
    try {
    } catch (error) {
      console.log(error);
    }
  }

  if (action.type === "auth/uploadAvatar") {
    try {
      const formData = new FormData();
      formData.append("file", action.payload);

      const response = await fetch(AUTH_ENDPOINTS.uploadAvatar, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionStorage.accessToken ?? ""}`,
        },
        credentials: "include",
        body: formData,
      });

      const data = await response.json();
      next(loginSuccess(data));
    } catch (error) {
      console.log(error);
    }
  }

  return next(action);
};

export default auth;
