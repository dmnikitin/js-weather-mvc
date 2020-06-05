const router = require('express').Router();
const fetch = require('node-fetch');
const { BAD_REQUEST, FORBIDDEN, OK, getStatusText } = require('http-status-codes');
const { MAP_TOKEN, WEATHER_TOKEN, GEO_TOKEN, IMAGE_TOKEN } = require('./common/config');
const ExtendedError = require('./helpers/errorExtended');
const catchErrorsDecorator = require('./helpers/errorDecorator');

router.route('/weather').post(
  catchErrorsDecorator(async (req, res) => {
    const { latitude, longitude, language } = req.body;
    if (!latitude || !longitude || !language) {
      throw new ExtendedError(FORBIDDEN, getStatusText(FORBIDDEN));
    }
    const url = encodeURI(`https://api.darksky.net/forecast/${WEATHER_TOKEN}/${latitude},${longitude}?lang=${language}`);
    const response = await fetch(url);
    if (!response.ok) throw new ExtendedError(BAD_REQUEST, getStatusText(BAD_REQUEST));
    const json = await response.json();
    res.status(OK).send(json);
  }),
);

router.route('/image').post(
  catchErrorsDecorator(async (req, res) => {
    const { theme } = req.body;
    if (!theme) throw new ExtendedError(FORBIDDEN, getStatusText(FORBIDDEN));
    const url = encodeURI(`https://api.unsplash.com/photos/random?query=${theme}&client_id=${IMAGE_TOKEN}`);
    const response = await fetch(url);
    if (!response.ok) throw new ExtendedError(BAD_REQUEST, getStatusText(BAD_REQUEST));
    const json = await response.json();
    res.status(OK).send(json);
  }),
);

router.route('/place').post(
  catchErrorsDecorator(async (req, res) => {
    const { place, language } = req.body;
    if (!place || !language) throw new ExtendedError(FORBIDDEN, getStatusText(FORBIDDEN));
    const url = encodeURI(`https://api.opencagedata.com/geocode/v1/json?q=${place}&key=${GEO_TOKEN}&language=${language}&pretty=1`);
    const response = await fetch(url);
    if (!response.ok) throw new ExtendedError(BAD_REQUEST, getStatusText(BAD_REQUEST));
    const json = await response.json();
    res.status(OK).send(json);
  }),
);

router.route('/map').get((req, res) => res.status(OK).json({ MAP_TOKEN }));

module.exports = router;
