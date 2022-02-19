import beatlesData from '../data/beatles.json';


// KeyNumbers
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
    if (data[i] === 'year') {
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


// Beatles Obj Data
const beatlesObjData = [];
for (var i = 1; i < beatlesData.values.length; i++) {
  const thisObj = {};
  thisObj['year'] = beatlesData.values[i][year];
  thisObj['category'] = beatlesData.values[i][category];
  thisObj['artist'] = beatlesData.values[i][artist];
  thisObj['format'] = beatlesData.values[i][format];
  thisObj['title'] = beatlesData.values[i][title];
  thisObj['number'] = beatlesData.values[i][number];
  thisObj['track'] = beatlesData.values[i][track];
  beatlesObjData.push(thisObj);
}
// console.log('beatlesObjData', beatlesObjData);


// Response
export default (req, res) => {
  // console.log(req.query);
  res.status(200).json(beatlesObjData);
}