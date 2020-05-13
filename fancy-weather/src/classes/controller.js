import {
  createElements,
  getProperImageQuery,
  getInitialCoordinates,
  deleteChild,
} from '../helpers/other';
import { getCoordsFromPlace } from '../helpers/fetch';

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.handleTemperature = this.handleTemperature.bind(this);
    this.handleLanguage = this.handleLanguage.bind(this);
    this.handleTheme = this.handleTheme.bind(this);
    this.showData = this.showData.bind(this);
    this.view.bindTemperature(this.handleTemperature);
    this.view.bindLanguage(this.handleLanguage);
    this.view.bindTheme(this.handleTheme);
    this.view.bindQuery(this.showData);
    const [reload] = createElements({
      element: 'i',
      classes: ['material-icons', 'rotate'],
      textContent: 'loop',
    });
    this.reload = reload;
    this.showData();
    this.handleVoiceSearch();
    // setInterval(() => this.changeTime(), 60000);
  }

  showLoading() {
    if (this.view.mainbox) deleteChild(this.view.mainbox);
    this.view.mainbox.append(this.reload);
  }

  // changeTime() {

  // }

  async showData(requiredPlace) {
    try {
      this.showLoading();
      const { theme, place } = await this.setModelData(requiredPlace || undefined);
      const { loadedData, language, temperature } = this.model;
      this.view.mainbox.removeChild(this.reload);
      this.view.displayData(loadedData, language, temperature, place);
      this.view.displayTheme(theme);
    } catch (err) {
      throw new Error(`ERROR(${err.code}): ${err.message}`);
    }
  }

  async setModelData(requiredPlace) {
    try {
      const {
        setWeather, setTheme, setGeoData, language,
      } = this.model;
      const { coords: { latitude, longitude } } = requiredPlace
        ? await getCoordsFromPlace(requiredPlace, language)
        : await getInitialCoordinates();
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
      const {
        setLanguage,
        setGeoData,
        position: {
          latitude,
          longitude,
        },
      } = this.model;
      setLanguage(language);
      const place = await setGeoData(latitude, longitude, language);
      this.showData(place);
    } catch (err) {
      throw new Error(`ERROR(${err.code}): ${err.message}`);
    }
  }

  async handleTheme() {
    try {
      const {
        setTheme,
        loadedData: {
          currently: {
            time,
            icon,
          },
        },
        place,
      } = this.model;
      const imageQuery = getProperImageQuery(time, icon, place);
      const theme = await setTheme(imageQuery);
      this.view.displayTheme(theme);
    } catch (err) {
      throw new Error(`ERROR(${err.code}): ${err.message}`);
    }
  }

  handleTemperature(temperature) {
    const {
      setTemperature,
      loadedData,
      language,
      place,
    } = this.model;
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
