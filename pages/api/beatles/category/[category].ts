import beatlesData from '../../data/beatles.json';
import { keyNumbers }from '../../../../modules/api/keyNumbers';
import { setKeyNumber }from '../../../../modules/api/setKeyNumber';
import { getPageSegmentation }from '../../../../modules/api/getPageSegmentation';
import { getDataLength }from '../../../../modules/api/getDataLength';
import { getTracksArray }from '../../../../modules/api/getTracksArray';


setKeyNumber(beatlesData.values[0], keyNumbers);


// Get Category Data
const getCategoryData = (categoryPath => {
  const result = beatlesData.values.filter((item, index) => {
    if (item[5] == categoryPath) return index;
  });
  return result;
});


// Response
export default (req, res) => {
  const categoryPath = req.query.category;
  const categoryData = getCategoryData(categoryPath);
  // console.log('categoryPath', categoryPath);
  // console.log('categoryData', categoryData);

  const pageParam = req.query.page
  const dataLength = getDataLength(pageParam);
  const pageInfo = getPageSegmentation(pageParam, categoryData);
  const tracksArray = getTracksArray(dataLength, pageInfo, categoryData, keyNumbers, -1);

  const tracksData = {};
  tracksData['pageInfo'] = pageInfo;
  tracksData['trackList'] = tracksArray;
  // console.log('tracksData', tracksData);
  res.status(200).json(tracksData);
}