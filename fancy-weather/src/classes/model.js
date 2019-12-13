import {
  getWeatherURL,
  getImageURL,
  getCoordsURL,
  getData,
} from '../helpers/fetch';

import {
  languages,
  temperatureValues,
} from '../assets/data';

export default class Model {
  constructor() {
    this.loadedData = {};
    this.language = languages.eng;
    this.temperature = temperatureValues.celcius;
  }

  // getCityFromLatLong(latitiude, longitude){}

  setLanguage(language) {
    this.language = language;
  }

  setTemperature(temperature) {
    this.temperature = temperature;
  }

  changeTheme() {

  }

  loadInitialData() {
    return new Promise((resolve, reject) => {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  async loadData(latitude, longitude) {
    const url = getWeatherURL(latitude, longitude);
    const result = await getData(url);
    this.loadedData = result;
    return this.loadedData;
  }
}
