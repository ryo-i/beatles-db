// Get Page Key
const getPageKey = (queryText) => {
    let result = '';
    if (queryText === '' || !queryText) {
      result = '?page=';
    } else if (queryText === '?') {
      result = 'page=';
    } else {
      result = '&page=';
    }
    return result;
};

export { getPageKey };