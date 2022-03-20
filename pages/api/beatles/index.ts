import beatlesData from '../data/beatles.json';
import { keyNumbers } from '../../../modules/api/keyNumbers';
import { getKeyNumber }from '../../../modules/api/getKeyNumber';
import { getPageSegmentation }from '../../../modules/api/getPageSegmentation';
import { getDataLength }from '../../../modules/api/getDataLength';
import { getTracksArray }from '../../../modules/api/getTracksArray';


getKeyNumber(beatlesData.values[0], keyNumbers);


// Response
export default (req, res) => {
  const pageParam = req.query.page
  const dataLength = getDataLength(pageParam);
  const pageInfo = getPageSegmentation(pageParam, beatlesData.values);
  const tracksArray = getTracksArray(dataLength, pageInfo, beatlesData.values, keyNumbers, 0);

  const tracksData = {};
  tracksData['pageInfo'] = pageInfo;
  tracksData['trackList'] = tracksArray;
  // console.log('tracksData', tracksData);
  res.status(200).json(tracksData);
}