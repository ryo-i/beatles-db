import beatlesData from '../data/beatles.json';

export default (req, res) => {
    const {
        query: { track }
    } = req;
    // console.log('track', track);
    // console.log('beatlesData.values[track]', beatlesData.values[track]);
    res.status(200).json(beatlesData.values[track]);
}