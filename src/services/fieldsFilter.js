export default function fieldsFilter (data, importantFields) {
    console.log(data)
    const filteredResults = data.map(e => Object.keys(e)
    .filter(key => importantFields.includes(key))
        .reduce((obj, key) => {
        return {
            ...obj,
            [key]: e[key]
        };
    }, {}));
    
    return filteredResults;
}
