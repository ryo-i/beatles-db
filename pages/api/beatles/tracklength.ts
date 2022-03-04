import beatlesData from '../data/beatles.json';


// Get Track Length
const getTrackLength = () => {
  const trackLength = {};
  trackLength['allTrackLength'] = beatlesData.values.length -1;
  return trackLength;
};

// Response
export default (req, res) => {
  const trackLength = getTrackLength();

  const tracksData = {};
  tracksData['trackInfo'] = trackLength;
  // console.log('tracksData', tracksData);
  res.status(200).json(tracksData);
}