import beatlesData from '../../data/beatles.json';
import { keyNumbers }from '../../../../modules/api/keyNumbers';
import { getKeyNumber }from '../../../../modules/api/getKeyNumber';
import { getFilterData }from '../../../../modules/api/getFilterData';
import { getPageSegmentation }from '../../../../modules/api/getPageSegmentation';
import { getDataLength }from '../../../../modules/api/getDataLength';
import { getTracksArray }from '../../../../modules/api/getTracksArray';


getKeyNumber(beatlesData.values[0], keyNumbers);


// Response
export default (req, res) => {
  let categoryData = beatlesData.values;
  const query = req.query;
  const startNum = -1;

  const categoryPath = query.category;
  categoryData = getFilterData(categoryData, keyNumbers, 'path', categoryPath);
  console.log('categoryPath', categoryPath);

  if (query.year) {
    const yearPath = query.year;
    categoryData = getFilterData(categoryData, keyNumbers, 'year', yearPath);
    console.log('yearPath', yearPath);
  }

  if (query.format) {
    const formatPath = query.format;
    categoryData = getFilterData(categoryData, keyNumbers, 'format', formatPath);
    console.log('formatPath', formatPath);
  }

  const pageParam = query.page;
  const dataLength = getDataLength(pageParam);
  const pageInfo = getPageSegmentation(pageParam, categoryData);
  const tracksArray = getTracksArray(dataLength, pageInfo, categoryData, keyNumbers, startNum);
  console.log('pageParam', pageParam);

  const tracksData = {};
  tracksData['pageInfo'] = pageInfo;
  tracksData['trackList'] = tracksArray;
  // console.log('tracksData', tracksData);
  res.status(200).json(tracksData);
}