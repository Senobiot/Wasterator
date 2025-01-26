import { combineReducers } from 'redux';
import gameDetails from './gameDetails';
import gamesSearchList from './gamesSearchList';
import collection from './collection';
import seacrhType from './searchType';

const rootReducer = combineReducers({
  gameDetails, gamesSearchList, collection, seacrhType
  });
  
  export default rootReducer;