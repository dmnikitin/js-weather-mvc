import { createElements, getProperImageQuery, getInitialCoordinates, deleteChild } from '../helpers/other';
import { getCoordsFromPlace } from '../helpers/fetch';

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.handleTemperature = this.handleTemperature.bind(this);
    this.handleLanguage = this.handleLanguage.bind(this);
    this.handleTheme = this.handleTheme.bind(this);
    this.handleData = this.handleData.bind(this);
    this.handleTime = this.handleTime.bind(this);
    this.view.bindTemperature(this.handleTemperature);
    this.view.bindLanguage(this.handleLanguage);
    this.view.bindTheme(this.handleTheme);
    this.view.bindData(this.handleData);
    const [reload] = createElements({
      element: 'i',
      classes: ['material-icons', 'rotate'],
      textContent: 'loop',
    });
    this.reload = reload;
    this.handleData(null, true);
    this.handleVoiceSearch();
    setInterval(this.handleTime, 30000);
  }

  showLoading() {
    if (this.view.mainbox) deleteChild(this.view.mainbox);
    this.view.mainbox.append(this.reload);
  }

  handleTime() {
    this.view.displayTime();
  }

  async getPlaceCoordinates(requiredPlace) {
    try {
      const { language } = this.model;
      const { coords: { latitude, longitude } } = requiredPlace
        ? await getCoordsFromPlace(requiredPlace, language)
        : await getInitialCoordinates();
      return { longitude, latitude };
    } catch (err) {
      throw new Error(`ERROR(${err.code}): ${err.message}`);
    }
  }

  async handleData(requiredPlace, updateEverything) {
    try {
      this.showLoading();
      const { theme, place } = await this.setModelData(requiredPlace);
      const { loadedData, language, temperature } = this.model;
      this.view.mainbox.removeChild(this.reload);
      this.view.displayData(loadedData, language, temperature, place);
      this.view.displayTime();
      if (updateEverything) {
        this.view.displayTheme(theme);
        this.view.displayMap(loadedData, language);
      }
    } catch (err) {
      throw new Error(`ERROR(${err.code}): ${err.message}`);
    }
  }

  async setModelData(requiredPlace) {
    try {
      const { setWeather, setTheme, setGeoData, language } = this.model;
      const { latitude, longitude } = await this.getPlaceCoordinates(requiredPlace);
      const { currently: { time, icon } } = await setWeather(latitude, longitude);
      const place = await setGeoData(latitude, longitude, language);
      const imageQuery = getProperImageQuery(time, icon, place);
      const theme = await setTheme(imageQuery);
      return { theme, place };
    } catch (err) {
      throw new Error(`ERROR(${err.code}): ${err.message}`);
    }
  }

  async handleLanguage(language) {
    try {
      const { setLanguage } = this.model;
      setLanguage(language);
      this.handleData();
    } catch (err) {
      throw new Error(`ERROR(${err.code}): ${err.message}`);
    }
  }

  async handleTheme() {
    try {
      const { setTheme, place, loadedData: { currently: { time, icon } } } = this.model;
      const imageQuery = getProperImageQuery(time, icon, place);
      const theme = await setTheme(imageQuery);
      this.view.displayTheme(theme);
    } catch (err) {
      throw new Error(`ERROR(${err.code}): ${err.message}`);
    }
  }

  handleTemperature(temperature) {
    const { setTemperature, loadedData, language, place } = this.model;
    setTemperature(temperature);
    this.view.displayData(loadedData, language, temperature, place);
  }

  handleVoiceSearch() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    const {
      micButton,
      text,
    } = this.view.controlPanel.queryForm;
    micButton.addEventListener('click', () => {
      recognition.lang = this.model.language;
      recognition.start();
    });
    recognition.addEventListener('result', (event) => {
      const last = event.results.length - 1;
      const string = event.results[last][0].transcript;
      text.value = string;
    });
    recognition.addEventListener('speechend', () => {
      recognition.stop();
    });
    recognition.addEventListener('error', (error) => {
      throw new Error(`ERROR(${error.code}): ${error.message}`);
    });
  }
}
