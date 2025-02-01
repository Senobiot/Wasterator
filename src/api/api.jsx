const gamesApiKey = import.meta.env.VITE_API_KEY_GAMES;
const filmsApiKey = import.meta.env.VITE_API_KEY_FILMS;
import * as API from "../constants/api-config";
import { NUMBER_OF_SEARCH_ITEMS } from "../constants/constants";
import { fieldsFilter, objectSort } from "../utils/utils";

const importantFields = [
  "api_detail_url",
  "expected_release_year",
  "id",
  "image",
  "name",
  "original_release_date",
  "platforms",
  "resource_type",
];

const filmsImportantFields = [
  "name",
  "enName",
  "alternativeName",
  "countries",
  "description",
  "shortDescription",
  "id",
  "logo",
  "poster",
  "rating",
  "year",
  "type",
  "genres",
  "isSeries",
  "votes",
];

export const fecthFilmsByTitle = async (title) => {
  const response = await fetch(API.FILMS.SEARCH_BY_NAME + title, {
    method: "GET",
    withCredentials: true,
    headers: {
      "X-API-KEY": filmsApiKey,
      "Content-Type": API.FILMS.CONTENT_TYPE,
    },
  });
  const data = await response.json();

  const filteredData = data.docs.map((e) =>
    fieldsFilter(e, filmsImportantFields)
  );
  return filteredData
    .sort(objectSort(["votes", "kp"]))
    .splice(0, NUMBER_OF_SEARCH_ITEMS.FILMS);
};

export const fecthFilmById = async (title) => {
  const response = await fetch(API.FILMS.SEARCH_BY_ID + title, {
    method: "GET",
    withCredentials: true,
    headers: {
      "X-API-KEY": filmsApiKey,
      "Content-Type": API.FILMS.CONTENT_TYPE,
    },
  });
  const data = await response.json();
  return data;
};

export const fecthGamesByTitle = async (title) => {
  const response = await fetch(
    `${API.GAMES.URL}${API.GAMES.REQUEST.search}?api_key=${gamesApiKey}&format=${API.GAMES.FORMAT}&query=${title}&resources=game`
  );
  const data = await response.json();

  return data.results.map((e) => fieldsFilter(e, importantFields));
};

export const fetchGameDetail = async (url) => {
  console.log(`FETCH fetchGameDetail`);
  const response = await fetch(
    `${url}?api_key=${gamesApiKey}&format=${API.GAMES.FORMAT}`
  );
  const data = await response.json();

  return data.results;
};
