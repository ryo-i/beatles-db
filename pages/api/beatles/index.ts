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
  let allData = beatlesData.values;
  const query = req.query;
  let startNum = 0;

  if (query.year) {
    const yearPath = query.year;
    allData = getFilterData(allData, keyNumbers, 'year', yearPath);
    startNum = -1;
    console.log('yearPath', yearPath);
  }

  if (query.format) {
    const formatPath = query.format;
    allData = getFilterData(allData, keyNumbers, 'format', formatPath);
    startNum = -1;
    console.log('formatPath', formatPath);
  }


  const pageParam = req.query.page
  const dataLength = getDataLength(pageParam);
  const pageInfo = getPageSegmentation(pageParam, allData);
  const tracksArray = getTracksArray(dataLength, pageInfo, allData, keyNumbers, startNum);

  const tracksData = {};
  tracksData['pageInfo'] = pageInfo;
  tracksData['trackList'] = tracksArray;
  // console.log('tracksData', tracksData);
  res.status(200).json(tracksData);
}