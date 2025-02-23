import { SEARCH_TYPE } from "../constants/constants";

export const GAMES = {
  ADD_TO_COLLECTION: "ADD_GAME_TO_COLLECTION",
  GET_COLLECTION: "GAMES_GET_COLLECTION",
  DELETE_FROM_COLLECTION: "DELETE_GAME_FROM_COLLECTION",
  UPDATE_PLAYED_TIME: "GAMES_UPDATE_PLAYED_TIME",
};

export const FILMS = {
  ADD_TO_COLLECTION: "ADD_FILM_TO_COLLECTION",
  GET_COLLECTION: "FILMS_GET_COLLECTION",
  DELETE_FROM_COLLECTION: "DELETE_FILM_FROM_COLLECTION",
};

export const SEARCH = {
  // TYPE: {
  //   GAMES: SEARCH_TYPE.GAMES,
  //   FILMS: SEARCH_TYPE.FILMS,
  // },
  // STORE_GAME_LIST: "STORE_GAME_LIST",
  // STORE_FILM_LIST: "STORE_FILM_LIST",
  STORE: "STORE_SEARCH_RESULTS",
};

export const API = {
  GAMES: {
    GET_LIST_BY_NAME: "GAMES_GET_LIST_BY_NAME",
    GET_DETAILED_INFO: "GAMES_GET_DETAILED_INFO",
  },
  FILMS: {
    GET_LIST_BY_NAME: "FILMS_GET_LIST_BY_NAME",
    GET_DETAILED_INFO: "FILMS_GET_DETAILED_INFO",
  },
};

export const SET_ITEM_DETAILS = 'SET_ITEM_DETAILS';
