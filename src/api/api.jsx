    import * as api from '../constants/api/giantbomb';
    import fieldsFilter from '../utils/fieldsFilter';

    export const getGamesByTitle = async ( title ) => {
        const response = await fetch(`${api.URL}${api.REQUEST.search}?api_key=${api.KEY}&format=${api.FORMAT.json}&query=${title}&resources=game`);
        const data = await response.json();
        const importantFields = ['api_detail_url', 'expected_release_year', 'id', 'image', 'name', 'original_release_date', 'platforms', 'resource_type'];


        return fieldsFilter(data.results, importantFields);
    }


    export const fetchGameDetail = async ( url ) => {
        const response = await fetch(`${url}?api_key=${api.KEY}&format=${api.FORMAT.json}`);
        const data = await response.json();
        console.log(data.results)
        return data.results;
    }

    export const fetchVideo = async ( url ) => {
        const response = await fetch(`${url}?api_key=${api.KEY}&format=${api.FORMAT.json}`);
        const data = await response.json();
        console.log(data.results)
        return data.results;
    }