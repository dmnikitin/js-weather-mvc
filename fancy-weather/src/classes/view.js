import ControlPanel from './components/controlPanel';
import WeatherDayPanel from './components/weatherDayPanel';
import WeatherWeekPanel from './components/weatherWeekPanel';
import GeoPanel from './components/geoPanel';
import { createElements, getElement, getCurrentTime, deleteChild } from '../helpers/other';
import { temperatureValues, errors } from '../assets/data';

const { GEODATA_LOADING_ERROR, WEATHER_LOADING_ERROR, THEME_LOADING_ERROR, MESSAGE } = errors;
export default class View {
  constructor() {
    this.controlPanel = new ControlPanel();
    this.dayPanel = new WeatherDayPanel();
    this.weekPanel = new WeatherWeekPanel();
    this.geoPanel = new GeoPanel();
    const [container, mainbox] = createElements({
      element: 'main',
      classes: ['container'],
    }, {
      element: 'div',
      classes: ['mainbox'],
    });
    this.app = getElement('#root');
    Object.assign(this, { container, mainbox });
    this.app.append(this.container);
    this.container.append(this.controlPanel.container, this.mainbox);
  }

  displayError(status) {
    switch (status) {
      case THEME_LOADING_ERROR: {
        alert(`${MESSAGE}: ${THEME_LOADING_ERROR}`);
        this.mainbox.style.backgroundImage = 'linear-gradient(rgba(63, 69, 81, 0.6), rgba(63, 69, 81, 0.6))';
        break;
      }
      case WEATHER_LOADING_ERROR: {
        deleteChild(this.mainbox);
        this.mainbox.textContent = `${MESSAGE}: ${WEATHER_LOADING_ERROR}`;
        break;
      }
      case GEODATA_LOADING_ERROR: {
        deleteChild(this.mainbox);
        this.mainbox.textContent = `${MESSAGE}: ${GEODATA_LOADING_ERROR}`;
        break;
      }
      default: {
        break;
      }
    }
  }

  displayTheme(theme) {
    this.mainbox.style.backgroundImage = `linear-gradient(rgba(63, 69, 81, 0.6), rgba(63, 69, 81, 0.6)), url(${theme})`;
  }

  displayTime(timezone, language) {
    const { time, dateLong } = getCurrentTime(timezone, language);
    this.dayPanel.displayTime(time, dateLong);
  }

  displayData(data, language, temperature, place) {
    this.mainbox.append(this.dayPanel.container, this.weekPanel.container, this.geoPanel.container);
    this.dayPanel.displayData(data, language, temperature, place);
    this.weekPanel.displayData(data, language, temperature);
    this.controlPanel.display(language, temperature);
  }

  async displayMap(data, language) {
    await this.geoPanel.display(data.latitude, data.longitude, language);
  }

  bindTemperature(temperatureHandler) {
    this.controlPanel.temperatureButton.container.addEventListener('change', (event) => {
      const { celsius, fahrenheit } = temperatureValues;
      const temperature = event.target.checked ? celsius : fahrenheit;
      temperatureHandler(temperature);
    });
  }

  bindLanguage(languageHandler) {
    this.controlPanel.languageButton.container.addEventListener('click', (event) => {
      const language = event.target.textContent;
      languageHandler(language);
    });
  }

  bindTheme(themeHandler) {
    this.controlPanel.themeButton.addEventListener('click', themeHandler.bind(null));
  }

  bindData(dataHandler, mapHandler, themeHandler) {
    this.controlPanel.queryForm.container.addEventListener('submit', async (event) => {
      event.preventDefault();
      const placeQuery = this.controlPanel.queryForm.text.value;
      await dataHandler(placeQuery);
      await mapHandler();
      await themeHandler();
    });
  }
}
