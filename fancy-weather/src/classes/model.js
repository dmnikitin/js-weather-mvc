import {
  getWeatherURL,
  getImageURL,
  getData,
  getPlaceURL,
  getCoordsURL,
} from '../helpers/fetch';

import {
  languages,
  temperatureValues,
} from '../assets/data';

export default class Model {
  constructor() {
    this.loadedData = {};
    this.language = languages.eng;
    this.temperature = temperatureValues.celsius;
    this.theme = null;
    this.setLanguage = this.setLanguage.bind(this);
    this.setTemperature = this.setTemperature.bind(this);
    this.setTheme = this.setTheme.bind(this);
    this.getPlaceFromCoords = this.getPlaceFromCoords.bind(this);
  }


  setLanguage(language) {
    this.language = language;
  }

  setTemperature(temperature) {
    this.temperature = temperature;
  }

  async getCoordsFromPlace(place) {
    const url = getCoordsURL(place, this.language);
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
      throw new Error(`ERROR(${err.code}): ${err.message}`);
    }
  }

  async getPlaceFromCoords(latitude, longitude) {
    const url = getPlaceURL(latitude, longitude, this.language);
    try {
      const data = await getData(url);
      const {
        city,
        country,
      } = data.results[0].components;
      return `${city} ${country}`;
    } catch (err) {
      throw new Error(`ERROR(${err.code}): ${err.message}`);
    }
  }

  async setTheme(theme) {
    const url = getImageURL(theme);
    try {
      const result = await getData(url);
      this.theme = result.urls.regular;
      return this.theme;
    } catch (err) {
      throw new Error(`ERROR(${err.code}): ${err.message}`);
    }
  }

  async loadData(latitude, longitude) {
    const url = getWeatherURL(latitude, longitude);
    try {
      const result = await getData(url);
      this.loadedData = result;
      return this.loadedData;
    } catch (err) {
      throw new Error(`ERROR(${err.code}): ${err.message}`);
    }
  }
}
