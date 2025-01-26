export function fieldsFilter(data, importantFields) {
  const result = Object.fromEntries(
    Object.entries(data).filter((e) => importantFields.includes(e[0]))
  );
  return result;
}

export function spacesToNumbers(value) {
  // return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    var parts = value.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
}

export function getStorageCollection(){
  return JSON.parse(localStorage.getItem("collection")) || [];
}

export function setStorageCollection(collection){
  localStorage.setItem("collection", JSON.stringify(collection))
}

