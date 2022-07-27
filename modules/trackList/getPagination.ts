const getPagination = (pageInfo) => {
  let pagination = [];
  for (let i = 0; i < pageInfo['pageLength']; i++) {
    const pageNum = i +1;
    const checkCurrent = () => {
      if (pageNum === pageInfo['thisPage']) {
        return 'currentPage';
      } else {
        return '';
      }
    };
    const thisPage = checkCurrent();
    pagination.push({
      pageNum: pageNum,
      thisPage: thisPage
    });
  }

  return pagination;
};

export { getPagination };