import {
  languages,
  temperatureValues,
} from '../assets/data';
import {
  getProperImageQuery,
} from '../helpers/other';

import {
  getCoordsURL,
} from '../helpers/fetch';

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.getInitialData();
    this.handleTemperature = this.handleTemperature.bind(this);
    this.handleLanguage = this.handleLanguage.bind(this);
    this.handleTheme = this.handleTheme.bind(this);
    this.view.bindTemperature(this.handleTemperature);
    this.view.bindLanguage(this.handleLanguage);
    this.view.bindTheme(this.handleTheme);
    this.view.bindQuery(this.getData);
  }

  getInitialCoordinates() {
    return new Promise((resolve, reject) => {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  async getInitialData() {
    try {
      const position = await this.getInitialCoordinates();
      // this.model.postion
      const result = await this.model.loadData(position.coords.latitude, position.coords.longitude);
      const imageQuery = getProperImageQuery(result.currently.time, result.currently.icon);
      await this.model.setTheme(imageQuery);
    } catch (err) {
      throw new Error(`ERROR(${err.code}): ${err.message}`);
    }
    const {
      loadedData,
      theme,
    } = this.model;
    this.view.displayData(loadedData, languages.eng, temperatureValues.celsius, theme);
  }

  async getData(place) {
    try {
      // let position;
      // if (place) {
      // position = await this.model.getCoordsFromPlace(place);
      // } else {
      //  position = await this.getInitialCoordinates();
      // }
      const position = place ? await this.model.getCoordsFromPlace(place) : await this.getInitialCoordinates();
      const result = await this.model.loadData(position.coords.latitude, position.coords.longitude);
      const imageQuery = getProperImageQuery(result.currently.time, result.currently.icon);
      await this.model.setTheme(imageQuery);
    } catch (err) {
      throw new Error(`ERROR(${err.code}): ${err.message}`);
    }
  }

  handleTemperature(temperature) {
    const {
      setTemperature,
      loadedData,
      language,
      theme,
    } = this.model;
    setTemperature(temperature);
    this.view.displayData(loadedData, language, temperature, theme);
  }

  handleLanguage(language) {
    const {
      setLanguage,
      loadedData,
      temperature,
      theme,
    } = this.model;
    setLanguage(language);
    this.view.displayData(loadedData, language, temperature, theme);
  }

  async handleTheme() {
    const {
      setTheme,
      loadedData: {
        currently: {
          time,
          icon,
        },
      },
      loadedData,
      language,
      temperature,
      theme,
    } = this.model;
    const imageQuery = getProperImageQuery(time, icon);
    try {
      await setTheme(imageQuery);
    } catch (err) {
      throw new Error(`ERROR(${err.code}): ${err.message}`);
    }
    this.view.displayData(loadedData, language, temperature, theme);
  }
}
