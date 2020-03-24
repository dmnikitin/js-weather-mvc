const {
  weatherToken, geoToken, imageToken,
} = process.env;
const fetch = require('node-fetch');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 8080;
const dir = path.join(__dirname, 'public');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(dir));

app.get('/loadserver', (req, res) => {
  res.send('<h1>server running</h1>');
});


app.post('/weather', (req, res) => {
  const { latitude, longitude, language } = req.body;
  const url = `https://api.darksky.net/forecast/${weatherToken}/${latitude},${longitude}?lang=${language}`;
  if (!latitude || !longitude) {
    res.redirect('/error');
  }

  fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('failed');
  }, (networkError) => console.log(networkError.message))
    .then((jsonResponse) => res.json(jsonResponse));
});


app.post('/image', (req, res) => {
  const { query } = req.body;
  const url = `https://api.unsplash.com/photos/random?query=${query}&client_id=${imageToken}`;
  if (!query) {
    res.redirect('/error');
  }
  fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('failed');
  }, (networkError) => console.log(networkError.message))
    .then((jsonResponse) => res.json(jsonResponse));
});

app.post('/place', (req, res) => {
  const { query, language } = req.body;
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${geoToken}&language=${language}&pretty=1`;
  if (!query) {
    res.redirect('/error');
  }
  fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('failed');
  }, (networkError) => console.log(networkError.message))
    .then((jsonResponse) => res.json(jsonResponse));
});


app.listen(port, () => console.log(`Listening on http://localhost:${port}/`));
