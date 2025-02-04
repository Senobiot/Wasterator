import { configureStore } from '@reduxjs/toolkit'
import detailsReducer from '../reducers/detailsReducer';
import searchResultReducer from '../reducers/searchResultReducer';
import collectionReducer from '../reducers/collectionReducer';
import seacrhTypeReducer from '../reducers/seacrhTypeReducer';
import logger from '../middlewares/logger';
const store = configureStore({
    reducer: {
        details: detailsReducer,
        searchResult: searchResultReducer,
        collection: collectionReducer,
        // seacrhType: seacrhTypeReducer,
    },
    middleware: () => [logger],
  })

console.log(store.getState())

export default store;
