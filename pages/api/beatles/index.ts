import beatlesData from '../data/beatles.json';
import { keyNumbers } from '../../../modules/api/keyNumbers';
import { getKeyNumber }from '../../../modules/api/getKeyNumber';
import { getFilterData }from '../../../modules/api/getFilterData';
import { getPageSegmentation }from '../../../modules/api/getPageSegmentation';
import { getDataLength }from '../../../modules/api/getDataLength';
import { getTracksArray }from '../../../modules/api/getTracksArray';


getKeyNumber(beatlesData.values[0], keyNumbers);


// Response
export default (req, res) => {
  let resultData = beatlesData.values;
  const query = req.query;
  let startNum = -1;

  if (query.category) {
    const categoryPath = query.category;
    resultData = getFilterData(resultData, keyNumbers, 'path', categoryPath);
    console.log('categoryPath', categoryPath);
  } else {
    resultData.shift();
    console.log('no catgory');
  }

  if (query.year) {
    const yearPath = query.year;
    resultData = getFilterData(resultData, keyNumbers, 'year', yearPath);
    console.log('yearPath', yearPath);
  }

  if (query.format) {
    const formatPath = query.format;
    resultData = getFilterData(resultData, keyNumbers, 'format', formatPath);
    console.log('formatPath', formatPath);
  }


  const pageParam = req.query.page
  const dataLength = getDataLength(pageParam);
  const pageInfo = getPageSegmentation(pageParam, resultData);
  const tracksArray = getTracksArray(dataLength, pageInfo, resultData, keyNumbers, startNum);

  const tracksData = {};
  tracksData['pageInfo'] = pageInfo;
  tracksData['trackList'] = tracksArray;
  // console.log('tracksData', tracksData);
  res.status(200).json(tracksData);
}