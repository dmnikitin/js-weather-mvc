import API_KEYS from './sensitive';

const getWeatherURL = (latitude, longitude) => `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${API_KEYS.weatherToken}/${latitude},${longitude}`;
const getImageURL = (query) => `https://api.unsplash.com/photos/random?query=${query}&client_id=${API_KEYS.imageToken}`;
const getCoordsURL = (query, language) => `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${API_KEYS.geoToken}&language=${language}&pretty=1`;
const getPlaceURL = (latitude, longitude, language) => `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${API_KEYS.geoToken}&language=${language}&pretty=1`;
async function getData(url) {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    throw new Error(`ERROR(${error.code}): ${error.message}`);
  }
}

export {
  getWeatherURL,
  getImageURL,
  getCoordsURL,
  getPlaceURL,
  getData,
};
