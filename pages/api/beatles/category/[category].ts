import beatlesData from '../../data/beatles.json';

console.log('test');

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


// Get Category Name
const getCategoryName = (categoryPath) => {
  let categoryName = ''
  if (categoryPath === 'beatles') {
    categoryName = 'Beatles';
  } else if (categoryPath === 'john-yoko') {
    categoryName = 'John & Yoko';
  } else if (categoryPath === 'paul') {
    categoryName = 'Paul McCartney';
  } else if (categoryPath === 'george') {
    categoryName = 'George Harrison';
  } else if (categoryPath === 'ringo') {
    categoryName = 'Ringo Starr';
  } else if (categoryPath === 'tony-beatles') {
    categoryName = 'Tony & Beatles';
  }
  return categoryName;
};


// Get Category Data
const getCategoryData = (categoryName => {
  const result = beatlesData.values.filter((item, index) => {
    if (item[4] == categoryName) return index;
  });
  return result;
});


// Get Page Segmentation
const getPageSegmentation = (pageParam, categoryData) => {
  let thisPage = Number(pageParam);
  if (!pageParam || isNaN(pageParam)) {
    thisPage = 1;
    // console.log('thisPage', thisPage);
  }

  const pageSegmentation = {};
  pageSegmentation['trackLength'] = categoryData.length -1;
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
const getTracksArray = (dataLength, pageInfo, categoryData) => {
  let addLength = 50;
  if ((dataLength + addLength) > pageInfo.trackLength) {
    addLength = pageInfo.trackRemainder;
  }

  const tracksArray = [];
  for (var i = dataLength -1; i < dataLength + addLength; i++) {
    const thisObj = {};
    thisObj['id'] = categoryData[i][keyNumbers.id];
    thisObj['year'] = categoryData[i][keyNumbers.year];
    thisObj['icon'] = categoryData[i][keyNumbers.icon];
    thisObj['artist'] = categoryData[i][keyNumbers.artist];
    thisObj['format'] = categoryData[i][keyNumbers.format];
    thisObj['title'] = categoryData[i][keyNumbers.title];
    thisObj['order'] = categoryData[i][keyNumbers.order];
    thisObj['number'] = categoryData[i][keyNumbers.number];
    thisObj['track'] = categoryData[i][keyNumbers.track];
    tracksArray.push(thisObj);
  }
  return tracksArray;
};


// Response
export default (req, res) => {
  const categoryPath = req.query.category;
  const categoryName = getCategoryName(categoryPath);
  const categoryData = getCategoryData(categoryName);
  // console.log('categoryPath', categoryPath);
  // console.log('categoryName', categoryName);
  // console.log('categoryData', categoryData);

  const pageParam = req.query.page
  const dataLength = getDataLength(pageParam);
  const pageInfo = getPageSegmentation(pageParam, categoryData);
  const tracksArray = getTracksArray(dataLength, pageInfo, categoryData);

  const tracksData = {};
  tracksData['pageInfo'] = pageInfo;
  tracksData['trackList'] = tracksArray;
  // console.log('tracksData', tracksData);
  res.status(200).json(tracksData);
}