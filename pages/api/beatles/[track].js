import beatlesData from '../data/beatles.json';

// Beatles Track Data
/* const beatlesTrackData = {};
for (var i = 1; i < beatlesData.values.length; i++) {
  const keyName = [0][i];
  beatlesTrackData[keyName] = beatlesData.values[i][year];
  beatlesTrackData.push(thisObj);
}
console.log('beatlesTrackData', beatlesTrackData); */


export default (req, res) => {
    const {
        query: { track }
    } = req;

    // console.log('track', track);
    console.log('beatlesData.values[0]', beatlesData.values[0]);
    console.log('beatlesData.values[req]', beatlesData.values[track]);

    res.status(200).json(beatlesData.values[track]);
}