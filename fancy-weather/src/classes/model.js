import {
  getPlaceFromCoords,
  fetchData,
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
    this.setWeather = this.setWeather.bind(this);
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
      if (!place) throw new Error('setGeoData model error');
      Object.assign(this, { position: { latitude, longitude }, place });
      return place;
    } catch (err) {
      throw new Error(`ERROR(${err.code}): ${err.message}`);
    }
  }

  // setters ??

  async setTheme(theme) {
    try {
      const requestBody = { theme };
      const result = await fetchData('http://localhost:8080/image', requestBody);
      // if (!result) throw new Error('setTheme model error');
      // this.theme = result.urls.regular;
      if (result) {
        this.theme = result.urls.regular;
      }
      return this.theme;
    } catch (err) {
      throw new Error(`ERROR(${err.code}): ${err.message}`);
    }
  }

  async setWeather(latitude, longitude) {
    try {
      const requestBody = { latitude, longitude, language: this.language };
      const result = await fetchData('http://localhost:8080/weather', requestBody);
      if (!result) throw new Error('setWeather model error');
      this.loadedData = result;
      return this.loadedData;
    } catch (err) {
      throw new Error(`ERROR(${err.code}): ${err.message}`);
    }
  }
}
