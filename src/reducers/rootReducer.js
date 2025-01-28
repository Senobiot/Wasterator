import { combineReducers } from 'redux';
import gameDetails from './gameDetails';
import currentSearchList from './currentSearchList';
import collection from './collection';
import seacrhType from './searchType';

const rootReducer = combineReducers({
  gameDetails, currentSearchList, collection, seacrhType
  });
  
  export default rootReducer;