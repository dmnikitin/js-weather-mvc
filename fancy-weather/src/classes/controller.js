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
  }


  async getInitialData() {
    try {
      const position = await getInitialCoordinates();
      console.log('TCL: Controller -> getInitialData -> position', position);
      const result = await this.model.loadData(position.coords.latitude, position.coords.longitude);
      console.log('TCL: Controller -> getInitialData -> result', result);
      const imageQuery = getProperImageQuery(result.currently.time, result.currently.icon);
      console.log(position.coords.latitude, position.coords.longitude);

      await this.model.setTheme(imageQuery);
      await this.model.getPlaceFromCoords(position.coords.latitude, position.coords.longitude, languages.en);
    } catch (err) {
      throw new Error(`ERROR(${err.code}): ${err.message}`);
    }
    const {
      loadedData,
      theme,
      place,
    } = this.model;
    this.view.displayData(loadedData, languages.en, temperatureValues.celsius, theme, place);
  }

  async getData(requiredPlace) {
    console.log('TCL: Controller -> getData -> place', requiredPlace);

    let {
      position,
    } = this.model;
    try {
      if (requiredPlace) {
        position = await this.model.getCoordsFromPlace(requiredPlace);
        console.log('TCL: Controller -> getData -> position', position);
      }
      console.log('TCL: Controller -> getData -> position', position);
      const result = await this.model.loadData(position.coords.latitude, position.coords.longitude);
      console.log('TCL: Controller -> getData -> result', result);
      // place = await this.model.getPlaceFromCoords(position.coords.latitude, position.coords.longitude)

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
      place,
    } = this.model;
    console.log('TCL: Controller -> getData -> place', place);

    try {
      this.model.place = await this.model.getPlaceFromCoords(position.coords.latitude, position.coords.longitude, language);
    } catch (err) {
      throw new Error(`ERROR(${err.code}): ${err.message}`);
    }
    this.view.displayData(loadedData, language, temperature, theme, place);
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
      position,
    } = this.model;
    setLanguage(language);

    const place = await this.model.getPlaceFromCoords(position.latitude, position.longitude, language);
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
      theme,
      place,
    } = this.model;
    const imageQuery = getProperImageQuery(time, icon);
    try {
      await setTheme(imageQuery);
    } catch (err) {
      throw new Error(`ERROR(${err.code}): ${err.message}`);
    }
    this.view.displayData(loadedData, language, temperature, theme, place);
  }
}
