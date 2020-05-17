const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

module.exports = {
  PORT: process.env.PORT || 8080,
  NODE_ENV: process.env.NODE_ENV,
  MAP_TOKEN: process.env.MAP_TOKEN,
  WEATHER_TOKEN: process.env.WEATHER_TOKEN,
  GEO_TOKEN: process.env.GEO_TOKEN,
  IMAGE_TOKEN: process.env.IMAGE_TOKEN,
};
