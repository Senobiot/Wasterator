import * as TYPE from "./types";

export const fetchGamesListbyName = (name) => ({
  type: TYPE.API.GAMES.GET_LIST_BY_NAME,
  payload: name,
});

export const fetchFilmsListbyName = (name) => ({
    type: TYPE.API.FILMS.GET_LIST_BY_NAME,
    payload: name,
  });