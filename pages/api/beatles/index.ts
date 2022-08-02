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

  if (query.category) {
    const categoryPath = query.category;
    resultData = getFilterData(resultData, keyNumbers, 'path', categoryPath);
    console.log('categoryPath', categoryPath);
  } else {
    resultData = getNoCategoryData(resultData, keyNumbers);
    console.log('no catgory');
    console.log('resultData.length', resultData.length);
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


  const pageParam = req.query.page;
  const dataLength = getDataLength(pageParam);
  const pageInfo = getPageSegmentation(pageParam, resultData);
  const yearsArray = getYearsArray(resultData, keyNumbers);
  const formatsArray = getFormatsArray(resultData, keyNumbers);
  const tracksArray = getTracksArray(dataLength, pageInfo, resultData, keyNumbers);

  const tracksData = {};
  tracksData['pageInfo'] = pageInfo;
  tracksData['yearList'] = yearsArray;
  tracksData['formatList'] = formatsArray;
  tracksData['trackList'] = tracksArray;
  // console.log('tracksData', tracksData);
  res.status(200).json(tracksData);
}