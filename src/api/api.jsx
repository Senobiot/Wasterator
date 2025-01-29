import * as API from "../constants/api";
import { fieldsFilter } from "../utils/utils";

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
];

export const fecthFilmsByTitle = async (title) => {
  const response = await fetch(API.FILMS.URL + title, {
    method: "GET",
    withCredentials: true,
    headers: {
      "X-API-KEY": API.FILMS.KEY,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  return data.docs.map((e) => fieldsFilter(e, filmsImportantFields));
};

export const fecthGamesByTitle = async (title) => {
  const response = await fetch(
    `${API.GAMES.URL}${API.GAMES.REQUEST.search}?api_key=${API.GAMES.KEY}&format=${API.GAMES.FORMAT}&query=${title}&resources=game`
  );
  const data = await response.json();

  return data.results.map((e) => fieldsFilter(e, importantFields));
};

export const fetchGameDetail = async (url) => {
  console.log(`FETCH fetchGameDetail`);
  const response = await fetch(
    `${url}?api_key=${API.GAMES.KEY}&format=${API.GAMES.FORMAT}`
  );
  const data = await response.json();

  return data.results;
};
