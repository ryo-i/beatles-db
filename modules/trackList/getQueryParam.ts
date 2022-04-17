// Get Query Param
const getQueryParam = (queryParam) => {
    if (!Object.keys(queryParam).length) {
        return '';
    } else {
        let queryParamArray: string[] = [];
        let queryparamText: string = '';

        for (const property in queryParam) {
            const thisParam: string = String(`${property}=${queryParam[property]}`);
            queryParamArray.push(thisParam);
        }

        queryparamText = queryParamArray.join('&');
        return '?' + queryparamText;
    }
};

export { getQueryParam };