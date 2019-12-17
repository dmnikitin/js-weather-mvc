import API_KEYS from './sensitive';
import {
  translations,
} from '../assets/data';

const getWeatherURL = (latitude, longitude, language) => `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${API_KEYS.weatherToken}/${latitude},${longitude}?lang=${language}`;
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

async function getCoordsFromPlace(place, language) {
  const url = getCoordsURL(place, language);
  try {
    const data = await getData(url);
    const {
      geometry: coords,
    } = data.results[0];
    const {
      lat: latitude,
      lng: longitude,
    } = coords;
    return ({
      coords: {
        latitude,
        longitude,
      },
    });
  } catch (err) {
    alert(translations.layout.inputError[language]);
    throw new Error(`ERROR(${err.code}): ${err.message}`);
  }
}

async function getPlaceFromCoords(latitude, longitude, language) {
  const url = getPlaceURL(latitude, longitude, language);
  try {
    const data = await getData(url);
    const {
      city,
      country,
    } = data.results[0].components;
    return `${city}, ${country}`;
  } catch (err) {
    throw new Error(`ERROR(${err.code}): ${err.message}`);
  }
}

export {
  getWeatherURL,
  getImageURL,
  getCoordsURL,
  getPlaceURL,
  getData,
  getCoordsFromPlace,
  getPlaceFromCoords,
};
