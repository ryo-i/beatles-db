import beatlesData from '../data/beatles.json';


// KeyNumbers
const keyNumbers = {
  id: 0,
  artist: 0,
  track: 0
};


// Set Key Numbers
const setKeyNumber = (data) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i] === 'id') {
      keyNumbers.id = i;
    } else if (data[i] === 'artist') {
      keyNumbers.artist = i;
    } else if (data[i] === 'track') {
      keyNumbers.track = i;
    }
  }
}
setKeyNumber(beatlesData.values[0]);


// Get Page Info
const getPageInfo = () => {
  const pageInfo= {};
  pageInfo['trackLength'] = beatlesData.values.length -1;
  return pageInfo;
};


// Get Tracks Array
const getTracksArray = () => {
  const tracksArray = [];
  for (var i = 1; i < beatlesData.values.length; i++) {
    const thisObj = {};
    thisObj['id'] = beatlesData.values[i][keyNumbers.id];
    thisObj['artist'] = beatlesData.values[i][keyNumbers.artist];
    thisObj['track'] = beatlesData.values[i][keyNumbers.track];
    tracksArray.push(thisObj);
  }
  return tracksArray;
};


// Response
export default (req, res) => {
  const pageInfo = getPageInfo();
  const tracksArray = getTracksArray();

  const tracksData = {};
  tracksData['pageInfo'] = pageInfo;
  tracksData['trackList'] = tracksArray;
  // console.log('tracksData', tracksData);
  res.status(200).json(tracksData);
}