// Get Query Info
const getQueryInfo = (queryParam) => {
    let queryInfoText: string = '';
    let queryParamObject = {};

    if (!Object.keys(queryParam).length) {
        return queryInfoText;
    } else {
        for (const property in queryParam) {
            queryParamObject[property] = queryParam[property];
        }

        delete queryParamObject["category"];
        delete queryParamObject["order"];
        delete queryParamObject["page"];

        queryInfoText = Object.entries(queryParamObject).map( x => x.join(": ")).join(", ");
        return queryInfoText;
    }
};

export { getQueryInfo };