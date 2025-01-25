import { GAMES } from "../constants/ActionTypes/AtcionTypes";
import fieldsFilter from "../utils/fieldsFilter";

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
      if (!("collection" in localStorage))
        localStorage.setItem("collection", JSON.stringify([]));
      const newCollection = JSON.parse(localStorage.getItem("collection"))
      console.log(newCollection)
      newCollection.push(action.payload);
      localStorage.setItem("collection", JSON.stringify(newCollection))
      return newCollection; 
      // console.log(action.payload)
      // const gameName = action.payload.name;
      // const filteredGameInfo = fieldsFilter(action.payload, collectionFields);
      // console.log(filteredGameInfo)
      // const newCollection = {
      //   ...collection,
      //   [gameName]: fieldsFilter(action.payload, collectionFields)[0],
      // };
      // localStorage.setItem("collection", JSON.stringify(newCollection));
      // return { ...state, collection: newCollection };
    }
    default:
      return state;
  }
};

export default collection;
