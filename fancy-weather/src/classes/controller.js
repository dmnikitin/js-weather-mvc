import {
  createElements,
  getProperImageQuery,
  getInitialCoordinates,
  deleteChild,
} from '../helpers/other';
import {
  getFromLocalStorage,
} from '../helpers/localstorage';

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
      classes: 'material-icons',
    });
    reload.classList.add('rotate');
    reload.textContent = 'loop';
    this.reload = reload;
    this.getInitialData();
    // setInterval(() => this.getData(this.model.place), 60000);
    this.voiceSearch();
  }


  async getInitialData() {
    const {
      temperature,
      language,
    } = getFromLocalStorage();
    const {
      mainbox,
      displayData,
    } = this.view;
    mainbox.append(this.reload);
    try {
      const {
        setTheme,
        getPlaceFromCoords,
        loadData,
      } = this.model;
      const position = await getInitialCoordinates();
      const {
        latitude,
        longitude,
      } = position.coords;
      const result = await loadData(latitude, longitude);
      const {
        time,
        icon,
      } = result.currently;
      const imageQuery = getProperImageQuery(time, icon);
      await setTheme(imageQuery);
      await getPlaceFromCoords(latitude, longitude, language);
    } catch (err) {
      throw new Error(`ERROR(${err.code}): ${err.message}`);
    }
    const {
      loadedData,
      console.log("TCL: Controller -> getInitialData -> loadedData", loadedData)
      theme,
      place,
    } = this.model;
    mainbox.removeChild(this.reload);
    displayData(loadedData, language, temperature, theme, place);
  }

  async getData(requiredPlace) {
    let {
      position,
    } = this.model;
    const {
      getCoordsFromPlace,
      loadData,
      setTheme,
      position: {
        coords: {
          latitude,
          longitude,
        },
      },
    } = this.model;
    const {
      mainbox,
      displayData,
    } = this.view;
    deleteChild(mainbox);
    mainbox.append(this.reload);
    try {
      if (requiredPlace) {
        position = await getCoordsFromPlace(requiredPlace);
      }
      const result = await loadData(latitude, longitude);
      const {
        time,
        icon,
      } = result.currently;
      const imageQuery = getProperImageQuery(time, icon);
      await setTheme(imageQuery);
    } catch (err) {
      throw new Error(`ERROR(${err.code}): ${err.message}`);
    }
    const {
      loadedData,
      language,
      temperature,
      theme,
      getPlaceFromCoords,
    } = this.model;
    let {
      place,
    } = this.model;
    try {
      place = await getPlaceFromCoords(position.coords.latitude, position.coords.longitude, language);
    } catch (err) {
      throw new Error(`ERROR(${err.code}): ${err.message}`);
    }
    mainbox.removeChild(this.reload);
    displayData(loadedData, language, temperature, theme, place);
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
      getPlaceFromCoords,
      position: {
        latitude,
        longitude,
      },
    } = this.model;
    setLanguage(language);
    const place = await getPlaceFromCoords(latitude, longitude, language);
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

  voiceSearch() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    const {
      mic,
      text,
    } = this.view.controlPanel.queryForm;
    mic.addEventListener('click', () => {
      recognition.lang = this.model.language;
      recognition.start();
    });
    recognition.addEventListener('result', (e) => {
      const last = e.results.length - 1;
      const string = e.results[last][0].transcript;
      text.value = string;
    });
    recognition.addEventListener('speechend', () => {
      recognition.stop();
    });
    recognition.addEventListener('error', (e) => {
      throw new Error(`ERROR(${error.code}): ${error.message}`);
    });
  }
}