// Get Query Param
const getQueryParam = (queryParam) => {
    if (queryParam) {
        let queryParamArray: string[] = [];
        let queryparamText: string = '';

        for (const property in queryParam) {
            const thisParam: string = String(`${property}=${queryParam[property]}`);
            queryParamArray.push(thisParam);
        }

        queryparamText = queryParamArray.join('&');
        return '?' + queryparamText;
    } else {
        return '';
    }
};

export { getQueryParam };