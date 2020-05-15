import ControlPanel from './components/controlPanel';
import WeatherDayPanel from './components/weatherDayPanel';
import WeatherWeekPanel from './components/weatherWeekPanel';
import GeoPanel from './components/geoPanel';
import {
  createElements,
  getElement,
} from '../helpers/other';

import {
  temperatureValues,
} from '../assets/data';

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
    Object.assign(this, {
      container,
      mainbox,
    });
    this.app.append(this.container);
    this.container.append(this.controlPanel.container, this.mainbox);
  }

  displayTheme(theme) {
    this.mainbox.style.backgroundImage = `linear-gradient(rgba(63, 69, 81, 0.6), rgba(63, 69, 81, 0.6)), url(${theme})`;
  }

  displayTime() {
    this.dayPanel.displayTime();
  }

  displayData(data, language, temperature, place) {
    this.mainbox.append(this.dayPanel.container, this.weekPanel.container, this.geoPanel.container);
    this.dayPanel.displayData(data, language, temperature, place);
    this.weekPanel.displayData(data, language, temperature);
    this.controlPanel.display(language, temperature);
  }

  displayMap(data, language) {
    this.geoPanel.display(data.latitude, data.longitude, language);
  }

  bindTemperature(handler) {
    this.controlPanel.temperatureButton.container.addEventListener('change', (event) => {
      const {
        celsius,
        fahrenheit,
      } = temperatureValues;
      const temperature = event.target.checked ? celsius : fahrenheit;
      handler(temperature);
    });
  }

  bindLanguage(handler) {
    this.controlPanel.languageButton.container.addEventListener('click', (event) => {
      const language = event.target.textContent;
      handler(language);
    });
  }

  bindTheme(handler) {
    this.controlPanel.themeButton.addEventListener('click', handler.bind(null));
  }

  bindData(handler) {
    this.controlPanel.queryForm.container.addEventListener('submit', (event) => {
      event.preventDefault();
      const placeQuery = this.controlPanel.queryForm.text.value;
      handler(placeQuery, true);
    });
  }
}
