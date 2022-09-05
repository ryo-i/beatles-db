// Get Page Segmentation
const getPageSegmentation = (pageParam, data) => {
  let thisPage = Number(pageParam);
  if (!pageParam || isNaN(pageParam)) {
    thisPage = 1;
  }

  const pageSegmentation = {};
  pageSegmentation['trackLength'] = data.length;
  pageSegmentation['pageUnit'] = 50;
  pageSegmentation['pageLength'] = Math.ceil(pageSegmentation['trackLength'] / pageSegmentation['pageUnit']);
  pageSegmentation['thisPage'] = thisPage;
  pageSegmentation['trackRemainder'] = pageSegmentation['trackLength'] % pageSegmentation['pageUnit'];

  return pageSegmentation;
};

export { getPageSegmentation };