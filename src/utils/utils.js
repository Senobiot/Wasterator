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
  if (!data.original_release_date) {
    if (!data.expected_release_year) {
      return "In Development";
    }

    return data.expected_release_year;
  }

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
    year: data.year || data.original_release_date || data.expected_release_year,
    enName: data.eName,
    description: data.description || data.deck,
    logo: data.logo?.url || data.poster?.previewUrl || data.poster?.url || data.image?.icon_url,
    name: data.name,
    genres: data.genres?.map(e => e.name)
  }
}
