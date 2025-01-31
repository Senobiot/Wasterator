import { SEARCH_TYPE } from "../constants"

export const GAMES = {
    ADD_SEARCH_LIST: 'ADD_SEARCH_LIST',
    ADD_TO_COLLECTION: 'ADD_GAME_TO_COLLECTION',
    ADD_DETAILS: 'ADD_DETAILS',
    GET_DETAILS: 'GET_DETAILS',
    GET_COLLECTION: 'GET_COLLECTION',
    DELETE_FROM_COLLECTION: 'DELETE_GAME_FROM_COLLECTION',
    UPDATE_PLAYED_TIME: 'UPDATE_PLAYED_TIME',
}

export const FILMS = {
    ADD_SEARCH_LIST: 'ADD_SEARCH_LIST',
    ADD_TO_COLLECTION: 'ADD_FILM_TO_COLLECTION',
    ADD_DETAILS: 'ADD_DETAILS',
    GET_DETAILS: 'GET_DETAILS',
    GET_COLLECTION: 'GET_COLLECTION',
    DELETE_FROM_COLLECTION: 'DELETE_FILM_FROM_COLLECTION',
}


export const SEARCH = {
    TYPE: {
        GAMES: SEARCH_TYPE.GAMES,
        FILMS: SEARCH_TYPE.FILMS,
    },
    STORE_GAME_LIST: 'STORE_GAME_LIST',
    STORE_FILM_LIST: 'STORE_FILM_LIST',
    STORAGE_GAME__HISTORY_KEY: 'gamesSearchHistory',
    STORAGE_FILMS_HISTORY_KEY: 'filmsSearchHistory',
    GET_LIST: 'GET_SEARCH_LIST',
}