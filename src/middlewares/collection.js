import MovieDto from "../dtos/movieDto";
import { FILMS } from "../actions/types";
import { AUTH_ENDPOINTS, TOKEN_NAMES } from "../constants/constants";


const token = sessionStorage[TOKEN_NAMES.access];

const setOptions = (body) => {
    return {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    };
  };


const collectionMW = () => (next) => async (action) => {
  console.log(action.payload);
  const dto = new MovieDto(action.payload);

  if (action.type === FILMS.ADD_TO_COLLECTION) {
    try {
      const response = await fetch(
        AUTH_ENDPOINTS.addToCollection,
        setOptions({data: dto})
      );
      const data = await response.json();
      console.log(data);

    } catch (error) {
      console.log(error);
    } 
  }
  return next(action);
}

export default collectionMW;
