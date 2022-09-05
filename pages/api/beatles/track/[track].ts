import beatlesData from '../../data/beatles.json';


// Get Track Obj Data
const getTrackObjData = (track) => {
  const keyArray = beatlesData.values[0];
  const valArray = beatlesData.values[track];
  const thisObj = {};

  if (keyArray.length === valArray.length) {
    for (var i = 0; i < keyArray.length; i++) {
      thisObj[keyArray[i]] = valArray[i];
    }
  }
  return thisObj;
};


// Response
export default (req, res) => {
  const {
      query: { track }
  } = req;

  // console.log('req.query', req.query);
  const trackObjData = getTrackObjData(track);
  // console.log('trackObjData', trackObjData);
  res.status(200).json(trackObjData);
}