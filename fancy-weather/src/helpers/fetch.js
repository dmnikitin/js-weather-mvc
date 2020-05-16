import { translations } from '../assets/data';

const headers = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Requested-With': 'XMLHttpRequest',
  },
};

async function fetchData(url, requestBody) {
  const arr = Object.entries(requestBody).map(([prop, value]) => `${prop}=${value}&`);
  const body = arr.join('');
  const modifiedHeaders = { ...headers, body };
  try {
    const response = await fetch(url, modifiedHeaders);
    if (!response) throw new Error('fetchData error');
    return response.json();
  } catch (error) {
    throw new Error(`ERROR(${error.code}): ${error.message}`);
  }
}

async function getCoordsFromPlace(place, language) {
  try {
    const requestBody = { place, language };
    const data = await fetchData('http://localhost:8080/place', requestBody);
    if (!data) throw new Error('getCoordsFromPlace error');
    const { geometry: { lat: latitude, lng: longitude } } = data.results[0];
    return ({ coords: { latitude, longitude } });
  } catch (err) {
    alert(translations.layout.inputError[language]);
    throw new Error(`ERROR(${err.code}): ${err.message}`);
  }
}

async function getPlaceFromCoords(latitude, longitude, language) {
  try {
    const requestBody = { place: `${latitude},${longitude}`, language };
    const data = await fetchData('http://localhost:8080/place', requestBody);
    if (!data) throw new Error('getPlaceFromCoords error');
    const { city, country } = data.results[0].components;
    return `${city}, ${country}`;
  } catch (err) {
    throw new Error(`ERROR(${err.code}): ${err.message}`);
  }
}

async function getMapToken() {
  try {
    const maptoken = await fetch('http://localhost:8080/map');
    if (!maptoken) throw new Error('getGeoToken error');
    return maptoken.json();
  } catch (err) {
    throw new Error(`ERROR(${err.code}): ${err.message}`);
  }
}

export { fetchData, getCoordsFromPlace, getPlaceFromCoords, getMapToken };
