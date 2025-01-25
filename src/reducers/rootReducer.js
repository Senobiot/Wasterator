import { combineReducers } from 'redux';
import gameDetails from './gameDetails';
import gamesSearchList from './gamesSearchList';
import collection from './collection';

const rootReducer = combineReducers({
  gameDetails, gamesSearchList, collection
  });
  
  export default rootReducer;