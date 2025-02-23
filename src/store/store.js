import { configureStore } from "@reduxjs/toolkit";
import detailsReducer from "../reducers/detailsReducer";
import collectionReducer from "../reducers/collectionReducer";
import logger from "../middlewares/logger";
import fetchGames from "../middlewares/fetchGames";
import collectionMW from "../middlewares/collection";
import fecthFilms from "../middlewares/fecthFilms";
import authReducer from "../reducers/authReducer";
import auth from "../middlewares/auth";
import searchReducer from "../reducers/searchReducer";
import statusReducer from "../reducers/statusReducer";

const store = configureStore({
  reducer: {
    searchResult: searchReducer,
    collection: collectionReducer,
    auth: authReducer,
    status: statusReducer,
    details: detailsReducer
  },
  middleware: () => [logger, fetchGames, fecthFilms, auth, collectionMW],
});

console.log(store.getState());

export default store;
