import {
  languages,
  temperatureValues,
} from '../assets/data';
import {
  getProperImageQuery,
  getInitialCoordinates,
} from '../helpers/other';

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.handleTemperature = this.handleTemperature.bind(this);
    this.handleLanguage = this.handleLanguage.bind(this);
    this.handleTheme = this.handleTheme.bind(this);
    this.getData = this.getData.bind(this);
    this.view.bindTemperature(this.handleTemperature);
    this.view.bindLanguage(this.handleLanguage);
    this.view.bindTheme(this.handleTheme);
    this.view.bindQuery(this.getData);
    this.getInitialData();
    // setInterval(() => this.getData(this.model.place), 60000);
  }


  async getInitialData() {
    try {
      this.view.mainbox.innerHTML = '<div class="data-loading"><i class=\'fa fa-refresh fa-spin\'></i></div>';
      const position = await getInitialCoordinates();
      const {
        latitude,
        longitude,
      } = position.coords;
      const result = await this.model.loadData(latitude, longitude);
      const imageQuery = getProperImageQuery(result.currently.time, result.currently.icon);
      await this.model.setTheme(imageQuery);
      await this.model.getPlaceFromCoords(latitude, longitude, languages.en);
    } catch (err) {
      throw new Error(`ERROR(${err.code}): ${err.message}`);
    }
    const {
      loadedData,
      theme,
      place,
    } = this.model;
    this.view.mainbox.innerHTML = '';
    this.view.displayData(loadedData, languages.en, temperatureValues.celsius, theme, place);
  }

  async getData(requiredPlace) {
    this.view.mainbox.innerHTML = '<i class="material-icons rotate">loop</i>';
    let {
      position,
    } = this.model;
    try {
      if (requiredPlace) {
        position = await this.model.getCoordsFromPlace(requiredPlace);
      }
      const result = await this.model.loadData(position.coords.latitude, position.coords.longitude);
      const imageQuery = getProperImageQuery(result.currently.time, result.currently.icon);
      await this.model.setTheme(imageQuery);
    } catch (err) {
      throw new Error(`ERROR(${err.code}): ${err.message}`);
    }
    const {
      loadedData,
      language,
      temperature,
      theme,
    } = this.model;
    try {
      this.model.place = await this.model.getPlaceFromCoords(position.coords.latitude, position.coords.longitude, language);
    } catch (err) {
      throw new Error(`ERROR(${err.code}): ${err.message}`);
    }
    this.view.mainbox.innerHTML = '';
    this.view.displayData(loadedData, language, temperature, theme, this.model.place);
  }

  handleTemperature(temperature) {
    const {
      setTemperature,
      loadedData,
      language,
      theme,
      place,
    } = this.model;
    setTemperature(temperature);
    this.view.displayData(loadedData, language, temperature, theme, place);
  }

  async handleLanguage(language) {
    const {
      setLanguage,
      loadedData,
      temperature,
      theme,
      position: {
        latitude,
        longitude,
      },
    } = this.model;
    setLanguage(language);
    const place = await this.model.getPlaceFromCoords(latitude, longitude, language);
    this.view.displayData(loadedData, language, temperature, theme, place);
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
      place,
    } = this.model;
    const imageQuery = getProperImageQuery(time, icon);
    try {
      await setTheme(imageQuery);
    } catch (err) {
      throw new Error(`ERROR(${err.code}): ${err.message}`);
    }
    this.view.displayData(loadedData, language, temperature, this.model.theme, place);
  }
}