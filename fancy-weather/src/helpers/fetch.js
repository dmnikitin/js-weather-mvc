import { translations, errors } from '../assets/data';

const headers = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Requested-With': 'XMLHttpRequest',
  },
};
const { FETCH_DATA_ERROR, GEODATA_LOADING_ERROR, MAP_LOADING_ERROR } = errors;

async function fetchData(url, requestBody) {
  const arr = Object.entries(requestBody).map(([prop, value]) => `${prop}=${value}&`);
  const body = arr.join('');
  const modifiedHeaders = { ...headers, body };
  try {
    const response = await fetch(url, modifiedHeaders);
    if (!response) throw new Error(FETCH_DATA_ERROR);
    return response.json();
  } catch (error) {
    throw new Error(FETCH_DATA_ERROR);
  }
}

async function getCoordsFromPlace(place, language) {
  try {
    const requestBody = { place, language };
    const data = await fetchData('/place', requestBody);
    if (!data) throw new Error(GEODATA_LOADING_ERROR);
    const { geometry: { lat: latitude, lng: longitude } } = data.results[0];
    return ({ coords: { latitude, longitude } });
  } catch (err) {
    alert(translations.layout.inputError[language]);
    throw new Error(GEODATA_LOADING_ERROR);
  }
}

async function getPlaceFromCoords(latitude, longitude, language) {
  try {
    const requestBody = { place: `${latitude},${longitude}`, language };
    const data = await fetchData('/place', requestBody);
    if (!data) throw new Error(GEODATA_LOADING_ERROR);
    const { city, country } = data.results[0].components;
    return `${city}, ${country}`;
  } catch (err) {
    throw new Error(GEODATA_LOADING_ERROR);
  }
}

async function displayMap(latitude, longitude) {
  /* eslint no-undef: 0 */
  try {
    const response = await fetch('/map');
    const { MAP_TOKEN } = await response.json();
    mapboxgl.accessToken = MAP_TOKEN;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [longitude, latitude],
      zoom: 9,
    });
    map.on('load', () => map.resize());
    return;
  } catch (err) {
    throw new Error(MAP_LOADING_ERROR);
  }
}

export { fetchData, getCoordsFromPlace, getPlaceFromCoords, displayMap };
