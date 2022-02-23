import beatlesData from '../data/beatles.json';


// KeyNumbers
const keyNumbers = {
  id: 0,
  year: 0,
  icon: 0,
  artist: 0,
  format: 0,
  title: 0,
  number: 0,
  track: 0
};


// Set Key Numbers
const setKeyNumber = (data) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i] === 'id') {
      keyNumbers.id = i;
    } else if (data[i] === 'year') {
      keyNumbers.year = i;
    } else if (data[i] === 'icon') {
      keyNumbers.icon = i;
    } else if (data[i] === 'artist') {
      keyNumbers.artist = i;
    } else if (data[i] === 'format') {
      keyNumbers.format = i;
    } else if (data[i] === 'title') {
      keyNumbers.title = i;
    } else if (data[i] === 'number') {
      keyNumbers.number = i;
    } else if (data[i] === 'track') {
      keyNumbers.track = i;
    }
  }
}
setKeyNumber(beatlesData.values[0]);


// Page segmentation
const trackLength = beatlesData.values.length -1;
const pageUnit = 50;
const pageLength = trackLength / pageUnit;
const trackRemainder = trackLength % pageUnit;
console.log('trackLength', trackLength);
console.log('pageLength', pageLength);
console.log('trackRemainder', trackRemainder);


// getDataLength
const getDataLength = (pageParam) => {
  if (!pageParam || isNaN(pageParam || pageParam === 1)) {
    return 1;
  } else {
    return ((pageParam - 1) * 50) + 1;
  }
}


// Beatles Obj Data
const getBeatlesData = (dataLength) => {
  const beatlesObjData = [];
  for (var i = dataLength; i < dataLength + 50; i++) {
    const thisObj = {};
    thisObj['id'] = beatlesData.values[i][keyNumbers.id];
    thisObj['year'] = beatlesData.values[i][keyNumbers.year];
    thisObj['icon'] = beatlesData.values[i][keyNumbers.icon];
    thisObj['artist'] = beatlesData.values[i][keyNumbers.artist];
    thisObj['format'] = beatlesData.values[i][keyNumbers.format];
    thisObj['title'] = beatlesData.values[i][keyNumbers.title];
    thisObj['number'] = beatlesData.values[i][keyNumbers.number];
    thisObj['track'] = beatlesData.values[i][keyNumbers.track];
    beatlesObjData.push(thisObj);
  }
  return beatlesObjData;
};


// Response
export default (req, res) => {
  const pageParam = req.query.page
  console.log('pageParam', pageParam);
  const dataLength = getDataLength(pageParam);
  console.log('dataLength', dataLength);
  const beatlesData = getBeatlesData(dataLength);
  res.status(200).json(beatlesData);
}