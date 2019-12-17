import {
  getPlaceFromCoords,
  getWeatherURL,
  getImageURL,
  getData,
} from '../helpers/fetch';

import {
  saveToLocalStorage,
  getFromLocalStorage,
} from '../helpers/localstorage';

export default class Model {
  constructor() {
    const {
      temperature,
      language,
    } = getFromLocalStorage();
    this.loadedData = {};
    this.language = language;
    this.temperature = temperature;
    this.theme = null;
    this.setLanguage = this.setLanguage.bind(this);
    this.setTemperature = this.setTemperature.bind(this);
    this.setTheme = this.setTheme.bind(this);
    this.setGeoData = this.setGeoData.bind(this);
  }

  setLanguage(language) {
    this.language = language;
    saveToLocalStorage({
      language,
      temperature: this.temperature,
    });
  }

  setTemperature(temperature) {
    this.temperature = temperature;
    saveToLocalStorage({
      temperature,
      language: this.language,
    });
  }

  async setGeoData(latitude, longitude, language) {
    try {
      const place = await getPlaceFromCoords(latitude, longitude, language);
      Object.assign(this, {
        position: {
          latitude,
          longitude,
        },
        place,
      });
      return place;
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

  async setWeather(latitude, longitude) {
    const url = getWeatherURL(latitude, longitude, this.language);
    try {
      const result = await getData(url);
      this.loadedData = result;
      return this.loadedData;
    } catch (err) {
      throw new Error(`ERROR(${err.code}): ${err.message}`);
    }
  }
}
