const router = require('express').Router();
const fetch = require('node-fetch');
const catchErrorsDecorator = require('./middlewares');
const ExtendedError = require('./helpers');
const {
  MAP_TOKEN,
  WEATHER_TOKEN,
  GEO_TOKEN,
  IMAGE_TOKEN,
} = require('./config');

router.route('/weather').post(
  catchErrorsDecorator(async (req, res) => {
    const { latitude, longitude, language } = req.body;
    // if (!latitude || !longitude || language) throw new ExtendedError(403, 'not enough data');
    //  res.redirect('/error');
    const url = encodeURI(`https://api.darksky.net/forecast/${WEATHER_TOKEN}/${latitude},${longitude}?lang=${language}`);
    const response = await fetch(url);
    if (!response.ok) throw new ExtendedError(403, 'failed');
    const json = await response.json();
    res.send(json);
  }),
);

router.route('/image').post(
  catchErrorsDecorator(async (req, res) => {
    const { theme } = req.body;
    if (!theme) throw new ExtendedError(403, 'not enough data');
    //  res.redirect('/error');
    const url = encodeURI(`https://api.unsplash.com/photos/random?query=${theme}&client_id=${IMAGE_TOKEN}`);
    const response = await fetch(url);
    if (!response.ok) throw new ExtendedError(403, 'failed');
    // return null
    const json = await response.json();
    res.send(json);
  }),
);

router.route('/place').post(
  catchErrorsDecorator(async (req, res) => {
    const { place, language } = req.body;
    if (!place || !language) throw new ExtendedError(403, 'not enough data');
    //  res.redirect('/error');
    const url = encodeURI(`https://api.opencagedata.com/geocode/v1/json?q=${place}&key=${GEO_TOKEN}&language=${language}&pretty=1`);
    const response = await fetch(url);
    if (!response.ok) throw new ExtendedError(403, 'failed');
    const json = await response.json();
    res.send(json);
  }),
);

router.route('/map').get((req, res) => res.json({ MAP_TOKEN }));

module.exports = router;
