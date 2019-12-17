import {
  createElements,
  getProperImageQuery,
  getInitialCoordinates,
  deleteChild,
} from '../helpers/other';
import {
  getFromLocalStorage,
} from '../helpers/localstorage';
import {
  getCoordsFromPlace,
} from '../helpers/fetch';

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
    const [reload] = createElements({
      element: 'i',
      classes: ['material-icons', 'rotate'],
      textContent: 'loop',
    });
    this.reload = reload;
    this.getInitialData();
    this.handleVoiceSearch();
    setInterval(() => this.getData(this.model.place), 60000);
  }

  async getInitialData() {
    const {
      temperature,
      language,
    } = getFromLocalStorage();
    this.view.mainbox.append(this.reload);
    try {
      const position = await getInitialCoordinates();
      const {
        latitude,
        longitude,
      } = position.coords;
      const result = await this.model.setWeather(latitude, longitude);
      const {
        time,
        icon,
      } = result.currently;
      const imageQuery = getProperImageQuery(time, icon);
      await this.model.setTheme(imageQuery);
      await this.model.setGeoData(latitude, longitude, language);
    } catch (err) {
      throw new Error(`ERROR(${err.code}): ${err.message}`);
    }
    const {
      loadedData,
      theme,
      place,
    } = this.model;
    this.view.mainbox.removeChild(this.reload);
    this.view.displayData(loadedData, language, temperature, theme, place);
  }

  async getData(requiredPlace) {
    let {
      position,
    } = this.model;
    deleteChild(this.view.mainbox);
    this.view.mainbox.append(this.reload);
    try {
      if (requiredPlace) {
        position = await getCoordsFromPlace(requiredPlace, this.model.language);
      }
      const {
        latitude,
        longitude,
      } = position.coords;
      const result = await this.model.setWeather(latitude, longitude);
      const {
        time,
        icon,
      } = result.currently;
      const imageQuery = getProperImageQuery(time, icon);
      await this.model.setTheme(imageQuery);
    } catch (err) {
      throw new Error(`ERROR(${err.code}): ${err.message}`);
    }
    const {
      loadedData,
      language,
      temperature,
      theme,
      setGeoData,
    } = this.model;
    let {
      place,
    } = this.model;
    try {
      const {
        latitude,
        longitude,
      } = position.coords;
      place = await setGeoData(latitude, longitude, language);
    } catch (err) {
      throw new Error(`ERROR(${err.code}): ${err.message}`);
    }
    this.view.mainbox.removeChild(this.reload);
    this.view.displayData(loadedData, language, temperature, theme, place);
  }

  async handleLanguage(language) {
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
    this.getData(place);
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
