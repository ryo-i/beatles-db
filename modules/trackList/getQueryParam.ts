// Get Query Param
const getQueryParam = (pageQuery, router) => {
    console.log('pageQuery', pageQuery);

    if (!router.isReady) {
        console.log('not isReady');
        return '';
    } else if (pageQuery) {
        const thisNumber: string = String(pageQuery);
        console.log('thisNumber', thisNumber);
        return '?page=' + thisNumber;
    } else {
        return '';
    }
};

export { getQueryParam };