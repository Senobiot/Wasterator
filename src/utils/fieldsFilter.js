export default function fieldsFilter(data, importantFields) {
  const result = Object.fromEntries(
    Object.entries(data).filter((e) => importantFields.includes(e[0]))
  );
  return result;
}
