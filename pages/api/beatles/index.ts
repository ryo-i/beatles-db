import beatlesData from '../data/beatles.json';


// KeyNumbers
const keyNumbers = {
  id: 0,
  year: 0,
  icon: 0,
  artist: 0,
  format: 0,
  title: 0,
  order: 0,
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
    } else if (data[i] === 'order') {
      keyNumbers.order = i;
    } else if (data[i] === 'number') {
      keyNumbers.number = i;
    } else if (data[i] === 'track') {
      keyNumbers.track = i;
    }
  }
}
setKeyNumber(beatlesData.values[0]);


// Get Page Segmentation
const getPageSegmentation = (pageParam) => {
  let thisPage = Number(pageParam);
  if (!pageParam || isNaN(pageParam)) {
    thisPage = 1;
    // console.log('thisPage', thisPage);
  }

  const pageSegmentation = {};
  pageSegmentation['trackLength'] = beatlesData.values.length -1;
  pageSegmentation['pageUnit'] = 50;
  pageSegmentation['pageLength'] = Math.ceil(pageSegmentation['trackLength'] / pageSegmentation['pageUnit']);
  pageSegmentation['thisPage'] = thisPage;
  pageSegmentation['trackRemainder'] = pageSegmentation['trackLength'] % pageSegmentation['pageUnit'];
  return pageSegmentation;
};

// getDataLength
const getDataLength = (pageParam) => {
  if (!pageParam || isNaN(pageParam || pageParam === 1)) {
    return 1;
  } else {
    return ((pageParam - 1) * 50) + 1;
  }
}


// Get Tracks Array
const getTracksArray = (dataLength, pageInfo) => {
  let addLength = 50;
  if ((dataLength + addLength) > pageInfo.trackLength) {
    addLength = pageInfo.trackRemainder;
  }

  const tracksArray = [];
  for (var i = dataLength; i < dataLength + addLength; i++) {
    const thisObj = {};
    thisObj['id'] = beatlesData.values[i][keyNumbers.id];
    thisObj['year'] = beatlesData.values[i][keyNumbers.year];
    thisObj['icon'] = beatlesData.values[i][keyNumbers.icon];
    thisObj['artist'] = beatlesData.values[i][keyNumbers.artist];
    thisObj['format'] = beatlesData.values[i][keyNumbers.format];
    thisObj['title'] = beatlesData.values[i][keyNumbers.title];
    thisObj['order'] = beatlesData.values[i][keyNumbers.order];
    thisObj['number'] = beatlesData.values[i][keyNumbers.number];
    thisObj['track'] = beatlesData.values[i][keyNumbers.track];
    tracksArray.push(thisObj);
  }
  return tracksArray;
};


// Response
export default (req, res) => {
  const pageParam = req.query.page
  const dataLength = getDataLength(pageParam);
  const pageInfo = getPageSegmentation(pageParam);
  const tracksArray = getTracksArray(dataLength, pageInfo);

  const tracksData = {};
  tracksData['pageInfo'] = pageInfo;
  tracksData['trackList'] = tracksArray;
  // console.log('tracksData', tracksData);
  res.status(200).json(tracksData);
}