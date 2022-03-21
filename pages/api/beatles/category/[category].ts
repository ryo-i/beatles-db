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
  const aaa = req.query;
  console.log('aaa', aaa);

  const categoryPath = req.query.category;
  const categoryData = getFilterData(beatlesData.values, keyNumbers, 'path', categoryPath);
  console.log('categoryPath', categoryPath);
  // console.log('categoryData', categoryData);

  const pageParam = req.query.page;
  const dataLength = getDataLength(pageParam);
  const pageInfo = getPageSegmentation(pageParam, categoryData);
  const tracksArray = getTracksArray(dataLength, pageInfo, categoryData, keyNumbers, -1);
  console.log('pageParam', pageParam);

  const tracksData = {};
  tracksData['pageInfo'] = pageInfo;
  tracksData['trackList'] = tracksArray;
  // console.log('tracksData', tracksData);
  res.status(200).json(tracksData);
}