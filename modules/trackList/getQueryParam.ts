// Get Query Param
const getQueryParam = (queryParam) => {
    console.log('queryParam', queryParam);

    if (queryParam.page) {
        const thisNumber: string = String(queryParam.page);
        console.log('thisNumber', thisNumber);
        return '?page=' + thisNumber;
    } else {
        return '';
    }
};

export { getQueryParam };