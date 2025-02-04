const gamesApiKey = import.meta.env.VITE_API_KEY_GAMES;
const filmsApiKey = import.meta.env.VITE_API_KEY_FILMS;

export const GAMES = {
  URL: "https://www.giantbomb.com/api/",
  FORMAT: "json",
  REQUEST: {
    game: "game",
    search: "search",
  },
  get getByName() {
    return `${this.URL}${this.REQUEST.search}?api_key=${gamesApiKey}&format=${this.FORMAT}&resources=game&query=`;
  },
  get getInfoById(){
      return `?api_key=${gamesApiKey}&format=${this.FORMAT}`
  }
};

export const FILMS = {
  SEARCH_BY_ID: "https://api.kinopoisk.dev/v1.4/movie/",
  SEARCH_BY_NAME:
    "https://api.kinopoisk.dev/v1.4/movie/search",
  PAGE: "page=1",
  RESULT_ITEMS_LIMIT: "limit=10",
  HEADERS: {
      method: "GET",
      withCredentials: true,
      headers: {
        "X-API-KEY": filmsApiKey,
        "Content-Type": "application/json",
      },
    },
  get getByName() {
    return `${this.SEARCH_BY_NAME}?${this.PAGE}&${this.RESULT_ITEMS_LIMIT}&query=`;
  },
  get getInfoById() {
    return this.SEARCH_BY_ID;
  },
};
