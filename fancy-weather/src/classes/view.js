import ControlPanel from './components/controlPanel';
import WeatherDayPanel from './components/weatherDayPanel';
import WeatherWeekPanel from './components/weatherWeekPanel';
import GeoPanel from './components/geoPanel';
import {
  createElements,
  getElement,
} from '../helpers/other';

import {
  languages,
  temperatureValues,
} from '../assets/data';

const textData = {
  controlPanel: {},
  weatherDayPanel: {},
  weatherWeekPanel: {},
  geoPanel: {},
};

export default class View {
  constructor() {
    this.controlPanel = new ControlPanel();
    this.weatherDayPanel = new WeatherDayPanel();
    this.weatherWeekPanel = new WeatherWeekPanel();
    // this.geoPanel = new GeoPanel();
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
    this.mainbox.append(this.weatherDayPanel.container, this.weatherWeekPanel.container);
    // this.mainbox.append(this.controlPanel.container, this.weatherDayPanel.container, this.weatherWeekPanel.container, this.geoPanel.container);
    this.container.append(this.controlPanel.container, this.mainbox);
    this.app.append(this.container);
  }


  displayData(data, language, temperature, theme) {
    console.log('TCL: View -> displayData -> language', language);
    // const theme = getImage(`weather ${Object.entries(this.loadedData).length === 0 ? this.loadedData.currently.summary : ''}`);
    // this.controlPanel.displayData(language, temperature, theme)

    // Object.assign(this, {
    //   data,
    //   language,
    //   temperature,
    //   theme,
    // });

    this.weatherDayPanel.displayData(data, language, temperature, theme);
    this.weatherWeekPanel.displayData(data);
    this.controlPanel.languageButton.display(language);
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
}
