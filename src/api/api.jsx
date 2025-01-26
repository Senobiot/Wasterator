import * as api from "../constants/api/giantbomb";
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

export const fecthGamesByTitle = async (title) => {
  const response = await fetch(
    `${api.URL}${api.REQUEST.search}?api_key=${api.KEY}&format=${api.FORMAT.json}&query=${title}&resources=game`
  );
  const data = await response.json();

  return data.results.map((e) => fieldsFilter(e, importantFields));
};

export const fetchGameDetail = async (url) => {
  console.log(`FETCH fetchGameDetail`);
  const response = await fetch(
    `${url}?api_key=${api.KEY}&format=${api.FORMAT.json}`
  );
  const data = await response.json();

  return data.results;
};
