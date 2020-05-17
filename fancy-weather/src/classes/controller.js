import { createElements, getProperImageQuery, getInitialCoordinates, deleteChild } from '../helpers/other';
import { getCoordsFromPlace, displayMap } from '../helpers/fetch';
import { errors } from '../assets/data';

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.handleData = this.handleData.bind(this);
    this.handleTemperature = this.handleTemperature.bind(this);
    this.handleLanguage = this.handleLanguage.bind(this);
    this.handleTheme = this.handleTheme.bind(this);
    this.handleTime = this.handleTime.bind(this);
    this.handleMap = this.handleMap.bind(this);
    this.view.bindTemperature(this.handleTemperature);
    this.view.bindLanguage(this.handleLanguage);
    this.view.bindTheme(this.handleTheme);
    this.view.bindData(this.handleData, this.handleMap, this.handleTheme);
    this.init();
  }

  async init() {
    const [reload] = createElements({
      element: 'i',
      classes: ['material-icons', 'rotate'],
      textContent: 'loop',
    });
    this.reload = reload;
    await this.handleData();
    await this.handleTheme();
    await this.handleMap();
    this.handleVoiceSearch();
    setInterval(this.handleTime, 60000);
  }

  displayReloadButton(isDisplayed) {
    if (!isDisplayed) {
      if (this.view.mainbox) deleteChild(this.view.mainbox);
      this.view.mainbox.append(this.reload);
    } else {
      this.view.mainbox.removeChild(this.reload);
    }
  }

  async getPlaceCoordinates(requiredPlace) {
    try {
      const { language } = this.model;
      const { coords: { latitude, longitude } } = requiredPlace
        ? await getCoordsFromPlace(requiredPlace, language)
        : await getInitialCoordinates();
      return { longitude, latitude };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async handleData(requiredPlace) {
    try {
      const { displayData, displayGeoData, displayTime } = this.view;
      const { setWeather, setGeoData, language, temperature } = this.model;
      this.displayReloadButton(false);
      const { latitude, longitude } = await this.getPlaceCoordinates(requiredPlace);
      const loadedData = await setWeather(latitude, longitude);
      const place = await setGeoData(latitude, longitude, language);
      this.displayReloadButton(true);
      displayData(loadedData, language, temperature, place);
      displayTime(loadedData.timezone, language);
      displayGeoData(loadedData, language);
    } catch (err) {
      this.view.displayError(err.message);
      throw new Error(err.message);
    }
  }

  async handleTheme() {
    try {
      const { setTheme, place, loadedData: { timezone, currently: { time, icon } } } = this.model;
      const imageQuery = getProperImageQuery(timezone, time, icon, place);
      const theme = await setTheme(imageQuery);
      this.view.displayTheme(theme);
    } catch (err) {
      this.view.displayError(err.message);
    }
  }

  handleLanguage(language) {
    const { setLanguage, place } = this.model;
    setLanguage(language);
    this.handleData(place);
  }

  handleTemperature(temperature) {
    const { setTemperature, loadedData, language, place } = this.model;
    setTemperature(temperature);
    this.view.displayData(loadedData, language, temperature, place);
  }

  handleTime() {
    const { loadedData, language } = this.model;
    this.view.displayTime(loadedData.timezone, language);
  }

  async handleMap() {
    const { loadedData: { latitude, longitude } } = this.model;
    await displayMap(latitude, longitude);
  }

  handleVoiceSearch() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    const { micButton, text } = this.view.controlPanel.queryForm;
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
    recognition.addEventListener('error', () => {
      alert(errors.VOICE_RECOGNITION_ERROR);
    });
  }
}
