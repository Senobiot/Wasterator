import * as TYPE from "./types";

export const fetchGamesListbyName = (name) => ({
  type: TYPE.API.GAMES.GET_LIST_BY_NAME,
  payload: name,
});

export const fetchFilmsListbyName = (name) => ({
  type: TYPE.API.FILMS.GET_LIST_BY_NAME,
  payload: name,
});

export const fetchGameInfo = (url) => ({
  type: TYPE.API.GAMES.GET_DETAILED_INFO,
  payload: url,
});

export const fetchFilmInfo = (id) => ({
  type: TYPE.API.FILMS.GET_DETAILED_INFO,
  payload: id,
});

export const setItemDetails = (item) => ({
  type: TYPE.SET_ITEM_DETAILS,
  payload: item,
});

export const addGameToCollection = (item) => ({
  type: TYPE.GAMES.ADD_TO_COLLECTION,
  payload: item,
});

export const deleteGameFromCollection = (item) => ({
  type: TYPE.GAMES.DELETE_FROM_COLLECTION,
  payload: item,
});

export const addFilmToCollection = (item) => ({
  type: TYPE.FILMS.ADD_TO_COLLECTION,
  payload: item,
});

export const deleteFilmFromCollection = (item) => ({
  type: TYPE.FILMS.DELETE_FROM_COLLECTION,
  payload: item,
});

export const storeGameSearchList = (list) => ({
  type: TYPE.SEARCH.STORE_GAME_LIST,
  payload: list,
});

export const storeFilmSearchList = (list) => ({
  type: TYPE.SEARCH.STORE_FILM_LIST,
  payload: list,
});

export const updatePlayedTime = (item) => ({
  type: TYPE.GAMES.UPDATE_PLAYED_TIME,
  payload: item,
});


//-----------------------------------------------------

export const s = (item) => ({
  type: TYPE.SET_ITEM_DETAILS,
  payload: item,
});
