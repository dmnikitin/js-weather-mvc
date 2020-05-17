import { getPlaceFromCoords, fetchData } from '../helpers/fetch';
import { saveToLocalStorage, getFromLocalStorage } from '../helpers/localstorage';
import { errors } from '../assets/data';

const { GEODATA_LOADING_ERROR, WEATHER_LOADING_ERROR, THEME_LOADING_ERROR } = errors;

export default class Model {
  constructor() {
    const { temperature, language } = getFromLocalStorage();
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

  async setWeather(latitude, longitude) {
    try {
      const requestBody = { latitude, longitude, language: this.language };
      const result = await fetchData('/weather', requestBody);
      if (!result) throw new Error(WEATHER_LOADING_ERROR);
      this.loadedData = result;
      return this.loadedData;
    } catch (err) {
      throw new Error(WEATHER_LOADING_ERROR);
    }
  }

  async setGeoData(latitude, longitude, language) {
    try {
      const place = await getPlaceFromCoords(latitude, longitude, language);
      if (!place) throw new Error(GEODATA_LOADING_ERROR);
      Object.assign(this, { position: { latitude, longitude }, place });
      return place;
    } catch (err) {
      throw new Error(GEODATA_LOADING_ERROR);
    }
  }

  async setTheme(theme) {
    try {
      const requestBody = { theme };
      const result = await fetchData('/image', requestBody);
      if (result) {
        this.theme = result.urls.regular;
      }
      return this.theme;
    } catch (err) {
      throw new Error(THEME_LOADING_ERROR);
    }
  }

  setLanguage(language) {
    this.language = language;
    saveToLocalStorage({ language, temperature: this.temperature });
  }

  setTemperature(temperature) {
    this.temperature = temperature;
    saveToLocalStorage({ temperature, language: this.language });
  }
}
