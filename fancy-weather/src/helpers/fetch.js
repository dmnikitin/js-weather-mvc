import {
  translations,
} from '../assets/data';

const headers = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Requested-With': 'XMLHttpRequest',
  },
};


async function getData(url, ...requestBody) {
  // const bodyQuery = requestBody.reduce( (acc, el) => `${acc}&${el}`, '');
  const bodyQuery = requestBody.join('&');
  const modifiedHeaders = { ...headers, body: bodyQuery };
  try {
    const response = await fetch(url, modifiedHeaders);
    return response.json();
  } catch (error) {
    throw new Error(`ERROR(${error.code}): ${error.message}`);
  }
}

async function getCoordsFromPlace(place, language) {
  try {
    const data = await getData('/place', place, language);
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
  const place = `${latitude},${longitude}`;
  try {
    const data = await getData('/place', place, language);
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
  getData,
  getCoordsFromPlace,
  getPlaceFromCoords,
};
