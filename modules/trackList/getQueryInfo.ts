// Get Query Info
const getQueryInfo = (queryParam) => {
    if (!Object.keys(queryParam).length) {
        return '';
    } else {
        let queryParamObject = {};

        for (const property in queryParam) {
            queryParamObject[property] = queryParam[property];
        }

        return queryParamObject;
    }
};

export { getQueryInfo };