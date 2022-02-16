import beatlesData from './data/beatles.json';

export default (req, res) => {
  console.log(req.query);
  res.status(200).json(beatlesData);
}