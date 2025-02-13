import { configureStore } from '@reduxjs/toolkit'
import detailsReducer from '../reducers/detailsReducer';
import searchResultReducer from '../reducers/searchResultReducer';
import collectionReducer from '../reducers/collectionReducer';
import logger from '../middlewares/logger';
import fetchGames from '../middlewares/fetchGames';
import fecthFilms from '../middlewares/fecthFilms';
import authReducer from '../reducers/authReducer';
import auth from '../middlewares/auth';

const store = configureStore({
    reducer: {
        details: detailsReducer,
        searchResult: searchResultReducer,
        collection: collectionReducer,
        auth: authReducer,
    },
    middleware: () => [logger, fetchGames, fecthFilms, auth],
  })

console.log(store.getState())

export default store;
