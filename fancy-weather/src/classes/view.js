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
    this.weatherDayPanel = new WeatherDayPanel();
    this.weatherWeekPanel = new WeatherWeekPanel();
    this.geoPanel = new GeoPanel();
    const [container, mainbox] = createElements({
      element: 'main',
      classes: 'container',
    }, {
      element: 'div',
      classes: 'mainbox',
    });

    this.app = getElement('#root');
    this.container = container;

    this.mainbox = mainbox;
    // <div class="data-loading"><i class='fa fa-refresh fa-spin'></i></div>
    this.mainbox.append(this.weatherDayPanel.container, this.weatherWeekPanel.container, this.geoPanel.container);
    this.container.append(this.controlPanel.container, this.mainbox);
    this.app.append(this.container);
  }


  displayData(data, language, temperature, theme, place) {
    // rgba(63, 69, 81, 0.6)
    // rgba(255,255,255,.5)

    this.mainbox.style.backgroundImage = `linear-gradient(rgba(63, 69, 81, 0.6), rgba(63, 69, 81, 0.6)), url(${theme})`;
    this.weatherDayPanel.displayData(data, language, temperature, place);
    this.weatherWeekPanel.displayData(data, language, temperature);
    this.controlPanel.display(language);
    this.geoPanel.display(data.latitude, data.longitude, language);
  }

  bindTemperature(handler) {
    this.controlPanel.temperatureButton.container.addEventListener('click', (event) => {
      const temperature = event.target.checked ? temperatureValues.celsius : temperatureValues.fahrenheit;
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
    this.controlPanel.themeButton.addEventListener('click', () => {
      handler();
    });
  }

  bindQuery(handler) {
    this.controlPanel.queryForm.container.addEventListener('submit', (event) => {
      console.log('pidr');
      console.log(this.controlPanel.queryForm.text.value);
      event.preventDefault();
      handler(this.controlPanel.queryForm.text.value);
    });
  }
}
