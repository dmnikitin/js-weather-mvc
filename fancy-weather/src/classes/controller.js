import {
  languages,
  temperatureValues,
} from '../assets/data';

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.getInitialData();
    this.handleTemperature = this.handleTemperature.bind(this);
    this.handleLanguage = this.handleLanguage.bind(this);
    this.view.bindTemperature(this.handleTemperature);
    this.view.bindLanguage(this.handleLanguage);
  }

  async getInitialData() {
    try {
      const position = await this.model.loadInitialData();
      const result = await this.model.loadData(position.coords.latitude, position.coords.longitude);
      this.model.loadedData = result;
    } catch (err) {
      throw new Error(`ERROR(${err.code}): ${err.message}`);
    }
    this.view.displayData(this.model.loadedData, languages.eng, temperatureValues.celsius);
  }

  // async getData() {

  // }

  handleTemperature(temperature) {
    this.model.setTemperature(temperature);
    this.view.displayData(this.model.loadedData, this.model.language, temperature);
  }

  handleLanguage(language) {
    this.model.setLanguage(language);
    this.view.displayData(this.model.loadedData, language, this.model.temperature);
  }
}
