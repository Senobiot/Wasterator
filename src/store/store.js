import { configureStore } from '@reduxjs/toolkit'
import detailsReducer from '../reducers/detailsReducer';
import searchResultReducer from '../reducers/searchResultReducer';
import collectionReducer from '../reducers/collectionReducer';
import seacrhTypeReducer from '../reducers/seacrhTypeReducer';

const store = configureStore({
    reducer: {
        details: detailsReducer,
        searchResult: searchResultReducer,
        collection: collectionReducer,
        // seacrhType: seacrhTypeReducer,
    }
  })

console.log(store.getState())

export default store;
