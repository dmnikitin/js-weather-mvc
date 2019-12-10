import {
  getWeatherURL,
  getImageURL,
  getCoordsURL,
  getData,
} from '../helpers/fetch';

export default class Model {
  constructor() {
    this.loadedData = {};
    this.lang = true;
    this.temperature = true;
  }

  // getCityFromLatLong(latitiude, longitude){}

  setLang() {
    this.lang = !this.lang;
  }

  setTemperature() {
    this.temperature = !this.temperature;
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
