// Delete Param
const deleteParam = (queryParam) => {
    let result = queryParam;
    if (result.page) {
        delete result.page;
    }

    if (result.category) {
        delete result.category;
    }
    return result;
};

export { deleteParam };