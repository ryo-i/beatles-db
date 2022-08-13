import beatlesData from '../data/beatles.json';
import { keyNumbers } from '../../../modules/api/keyNumbers';
import { getKeyNumber }from '../../../modules/api/getKeyNumber';
import { getFilterData }from '../../../modules/api/getFilterData';
import { getNoCategoryData }from '../../../modules/api/getNoCategoryData';
import { getPageSegmentation }from '../../../modules/api/getPageSegmentation';
import { getDataLength }from '../../../modules/api/getDataLength';
import { getYearsArray }from '../../../modules/api/getYearsArray';
import { getFormatsArray }from '../../../modules/api/getFormatsArray';
import { getTracksArray }from '../../../modules/api/getTracksArray';


getKeyNumber(beatlesData.values[0], keyNumbers);


// Response
export default (req, res) => {
  let resultData = beatlesData.values;
  const query = req.query;

  // category
  if (query.category) {
    const categoryPath = query.category;
    resultData = getFilterData(resultData, 'path', categoryPath);
    console.log('categoryPath', categoryPath);
  } else {
    resultData = getNoCategoryData(resultData, keyNumbers);
    console.log('no catgory');
    console.log('resultData.length', resultData.length);
  }

  // yars & formats array
  const yearsArray = getYearsArray(resultData, keyNumbers);
  const formatsArray = getFormatsArray(resultData, keyNumbers);

  // Get Filter Data
  if (query.year) {
    resultData = getFilterData(resultData, 'year', query.year);
  } else if (query.format) {
    resultData = getFilterData(resultData, 'format', query.format);
  }

  const pageParam = req.query.page;
  const dataLength = getDataLength(pageParam);
  const pageInfo = getPageSegmentation(pageParam, resultData);
  const tracksArray = getTracksArray(dataLength, pageInfo, resultData, keyNumbers);

  const tracksData = {};
  tracksData['pageInfo'] = pageInfo;
  tracksData['yearList'] = yearsArray;
  tracksData['formatList'] = formatsArray;
  tracksData['trackList'] = tracksArray;
  // console.log('tracksData', tracksData);
  res.status(200).json(tracksData);
}