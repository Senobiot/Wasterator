export function fieldsFilter(data, importantFields) {
  const result = Object.fromEntries(
    Object.entries(data).filter((e) => importantFields.includes(e[0]))
  );
  return result;
}

export function spacesToNumbers(value) {
  // return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  if (!value) return;
  var parts = value.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
}

export function getToken() {
  return JSON.parse(sessionStorage.getItem('accessToken')) || '';
}

export function setSessionToken(token = '') {
  sessionStorage.setItem('accessToken', token);
}

export function getStorageItem(item) {
  return JSON.parse(localStorage.getItem(item)) || [];
}

export function setStorageItem(item, value) {
  localStorage.setItem(item, JSON.stringify(value));
}

export function descendingCompare(a, b) {
  if (a.playedTime < b.playedTime) {
    return 1;
  }
  if (a.playedTime > b.playedTime) {
    return -1;
  }
  return 0;
}

export function objectSort(field, sortDirection = 1) {
  return function (a, b) {
    if (Array.isArray(field)) {
      if (a[field[0]][field[1]] < b[field[0]][field[1]]) {
        return sortDirection;
      }
      if (a[field[0]][field[1]]> b[field[0]][field[1]]) {
        return -sortDirection;
      }
      return 0;
    }
    if (a[field] < b[field]) {
      return sortDirection;
    }
    if (a[field] > b[field]) {
      return -sortDirection;
    }
    return 0;
  };
}

export const releaseToLocale = (data) => {
  if (!data) return "In Development";

  const release = new Date(data.original_release_date);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return release.toLocaleDateString("ru-RU", options);
};

export const unifyFields = data => {
  return {
    name: data.name,
    year: data.year || data.original_release_date || data.expected_release_year,
    enName: data.enName || data.alternativeName,
    description: data.description || data.deck,
    logo: data.logo?.url || data.poster?.previewUrl || data.poster?.url || data.image?.icon_url,
    genres: data.genres?.map(e => e.name),
    id: data.id,
    api_detail_url: data.api_detail_url,
    platforms: data.platforms,
    rating: data.rating?.kp ? Number(data.rating?.kp).toFixed(2) : '',
  }
}
 
export const setRequestOptions = (body) => {

  return {
    method: body ? "POST" : "GET",
    headers: {
      Authorization: `Bearer ${sessionStorage.accessToken ?? ''}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  };
};
