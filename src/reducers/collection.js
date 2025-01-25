import { GAMES } from "../constants/ActionTypes/AtcionTypes";
import { fieldsFilter } from "../utils/utils";

const collectionFields = [
  "api_detail_url",
  "deck",
  "expected_release_year",
  "image",
  "name",
  "original_release_date",
  "themes",
  'id',
];

const savedCollection = JSON.parse(localStorage.getItem("collection")) || [];

const collection = (state = savedCollection, action) => {
  switch (action.type) {
    case GAMES.GET_COLLECTION: {
      const collection = JSON.parse(localStorage.getItem("collection")) || [];
      return { ...state, collection: collection };
    }
    case GAMES.DELETE_FROM_COLLECTION: {
      console.log(`delete from collection ${action.payload}`)
      const collection = JSON.parse(localStorage.getItem("collection"))
      const newCollection = collection.filter(e => e.id !== action.payload);
      localStorage.setItem("collection", JSON.stringify(newCollection))
      return newCollection; 
    }
    case GAMES.ADD_TO_COLLECTION: {
      const collection = ("collection" in localStorage) ? JSON.parse(localStorage.getItem("collection")) : [];
      const newItem = action.payload;
      collection.push(newItem);
      localStorage.setItem("collection", JSON.stringify(collection));
      return collection; 
    }
    default:
      return state;
  }
};

export default collection;
