export const COLLECTION_TYPES = {
  GAMES: "games",
  FILMS: "films",
  SERIALS: "serials",
};

export const SEARCH_TYPE = {
  GAMES: "SEARCH_TYPE_IS_GAMES",
  FILMS: "SEARCH_TYPE_IS_FILMS",
};

export const NUMBER_OF_SEARCH_ITEMS = {
  FILMS: 10,
};

export const INSCRIPTIONS_KEYS = {
  TITLE_CARDS: {
    DURATION: {
      FILMS: "Время:",
      GAMES: "Наиграно",
    },
  },
  STATISTIC_PAGE: {
    COLLECTION_NAMES: {
      GAMES: "Игры",
      FILMS: "Фильмы",
      SERIALS: "Сериалы",
    },
    TOTAL_TIME: "Всего потрачено времени",
    HEADER_SORT_TILES: {
      BY_TITLE: "Сортировать по названию",
      BY_TIME: "Сортировать по времени",
    },
  },
  SEARCH_BOX: {
    GAMES: "Search the game",
    FILMS: "Search the movie",
  },
};

export const ROUTES = {
  PAGE: {
    HOME: "/",
    MY_GAMES: "/games",
    MY_FILMS: "/films",
    STATISTIC: "/stats",
    SEARCH_RESULTS: "/results",
    LOGIN: "/login",
    DASHBOARD: "/dashboard",
    REGISTRATION: "/registration",
  },
  CARDS: {
    FILM: "/movie",
    GAME: "/game",
    gameDetails: "/game/:id",
    movieDetails: "/movie/:id",
  },
};

export const GAMES_IPORTANT_FIELDS = [
  "api_detail_url",
  "expected_release_year",
  "id",
  "image",
  "name",
  "original_release_date",
  "platforms",
  "resource_type",
];

export const FILMS_IMPORTANT_FIELDS = [
  "name",
  "enName",
  "alternativeName",
  "countries",
  "description",
  "shortDescription",
  "id",
  "logo",
  "poster",
  "rating",
  "year",
  "type",
  "genres",
  "isSeries",
  "votes",
];

export const COLLECTION_FIELDS = [
  "api_detail_url",
  "deck",
  "expected_release_year",
  "image",
  "name",
  "original_release_date",
  "themes",
  "id",
  "developers",
];

export const LOCAL_STORAGE = {
  GAME_HISTORY_KEY: "gamesSearchHistory",
  FILMS_HISTORY_KEY: "filmsSearchHistory",
};

export const VIEW_TYPES = {
  VARIANTS: ["x2", "x4", "list"],
  get DEFAULT() {
    return this.VARIANTS[1];
  },
};

export const FORM_INPUTS = {
  name: {
    name: "name",
    type: "text",
    id: "name",
    placeholder: "First Name",
    validationPattern: /^[a-zA-Z]+$/,
  },

  email: {
    type: "email",
    id: "email",
    name: "email",
    placeholder: "Email Address",
    errorText: "Invalid email adress",
    validationPattern: /^\S+@\S+\.\S+$/,
  },

  lastName: {
    type: "text",
    id: "lastName",
    name: "lastName",
    placeholder: "Last Name",
    validationPattern: /^[a-zA-Z]+$/,
  },

  birthday: {
    type: "text",
    id: "birthday",
    name: "birthday",
    placeholder: "Birthday YYYY-MM-DD",
    validationPattern: /^\d{4}-\d{2}-\d{2}$/,
  },

  password: {
    type: "password",
    id: "password",
    name: "password",
    placeholder: "Password",
    errorText: "Min 8 symbols: at least 1 digit, 1 uppercase letter",
    validationPattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  },

  passwordCheck: {
    type: "password",
    id: "passwordCheck",
    name: "passwordCheck",
    placeholder: "Repeat password",
    errorText: "Min 8 symbols: at least 1 digit, 1 uppercase letter",
    errorTextMatch: "Passwords didn't match",
    validationPattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  },

  phone: {
    type: "tel",
    id: "phone",
    name: "phone",
    placeholder: "Phone Number",
    validationPattern: /\d{9}/,
  },

  gender: {
    name: "gender",
    type: "radio",
    placeholder: "Choose your gender",
    variants: [
      {
        id: "femaleGender",
        placeholder: "Female",
      },
      {
        id: "maleGender",
        placeholder: "Male",
      },
    ],
  },

  submit: {
    type: "submit",
    placeholder: "Send",
  },

  register: {
    type: "submit",
    placeholder: "register",
  },

  titles: {
    register: "Please fill form fields to register:",
    login: "Please signIn:",
  },

  checkbox: {
    id: "checkbox",
    type: "checkbox",
    name: "checkbox",
    placeholder: "Remember me",
  },

  registerLink: {
    text: "Not register yet? ",
    linkText: "Register",
  },
};

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const SERVER_ENDPOINTS = {
  auth: SERVER_URL + "auth",
  collection: SERVER_URL + "collection",
  games: SERVER_URL + "games",
  movies: SERVER_URL + "movies",
};

export const AUTH_ENDPOINTS = {
  registartion: SERVER_ENDPOINTS.auth + "/registration",
  login: SERVER_ENDPOINTS.auth + "/login",
  logot: SERVER_ENDPOINTS.auth + "/logout",
  getAllUsers: SERVER_ENDPOINTS.auth + "/users", // Probably no need
  refresh: SERVER_ENDPOINTS.auth + "/refresh",
  uploadAvatar: SERVER_ENDPOINTS.auth + "/avatar",
};

export const COLLECTION_ENDPOINTS = {
  addToCollection: SERVER_ENDPOINTS.collection + "/addToCollection",
  deleteFromCollection: SERVER_ENDPOINTS.collection + "/deleteFromCollection",
  getCollection: SERVER_ENDPOINTS.collection + "/getCollection?type=",
  updateCollectableTime: SERVER_ENDPOINTS.collection + "/updateCollectableTime",
};

export const GAMES_ENDPOINTS = {
  search: SERVER_ENDPOINTS.games + "/searchGame?name=",
  getDeatails: SERVER_ENDPOINTS.games + "/getGameDetails?url=",
  getDeatailsById: SERVER_ENDPOINTS.games + "/getGameDetailsById",
  getTopGames: SERVER_ENDPOINTS.games + "/getTopGames?page=",
  getTopGamesWithAuhorization:
    SERVER_ENDPOINTS.games + "/getTopGamesWithAuthorization?page=",
};

export const MOVIES_ENDPOINTS = {
  search: SERVER_ENDPOINTS.movies + "/searchMovie?name=",
  getDetails: SERVER_ENDPOINTS.movies + "/getDetails?id=",
};

export const TOKEN_NAMES = {
  access: "accessToken",
  refresh: "refreshToken",
};
