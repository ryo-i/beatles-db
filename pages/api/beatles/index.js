import beatlesData from '../data/beatles.json';


// KeyNumbers
let id = 0;
let year = 0;
let category = 0;
let artist = 0;
let format = 0;
let title = 0;
let number = 0;
let track = 0;


// Set Key Numbers
const setKeyNumber = (data) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i] === 'id') {
      id = i;
    } else if (data[i] === 'year') {
      year = i;
    } else if (data[i] === 'category') {
      category = i;
    } else if (data[i] === 'artist') {
      artist = i;
    } else if (data[i] === 'format') {
      format = i;
    } else if (data[i] === 'title') {
      title = i;
    } else if (data[i] === 'number') {
      number = i;
    } else if (data[i] === 'track') {
      track = i;
    }
  }
}
setKeyNumber(beatlesData.values[0]);


// Page segmentation
const trackLength = beatlesData.values.length;
const pageUnit = 50;
const pageLength = trackLength / pageUnit;
const trackRemainder = trackLength % pageUnit;
console.log('trackLength', trackLength);
console.log('pageLength', pageLength);
console.log('trackRemainder', trackRemainder);


// Beatles Obj Data
const beatlesObjData = [];
for (var i = 1; i < beatlesData.values.length; i++) {
  const thisObj = {};
  thisObj['id'] = beatlesData.values[i][id];
  thisObj['year'] = beatlesData.values[i][year];
  thisObj['category'] = beatlesData.values[i][category];
  thisObj['artist'] = beatlesData.values[i][artist];
  thisObj['format'] = beatlesData.values[i][format];
  thisObj['title'] = beatlesData.values[i][title];
  thisObj['number'] = beatlesData.values[i][number];
  thisObj['track'] = beatlesData.values[i][track];
  beatlesObjData.push(thisObj);
}


// Response
export default (req, res) => {
  console.log('req.query', req.query);
  console.log('req.body', req.body);
  res.status(200).json(beatlesObjData);
}