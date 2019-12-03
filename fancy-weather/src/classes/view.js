import ControlPanel from './components/controlPanel';
import WeatherDayPanel from './components/weatherDayPanel';
import WeatherWeekPanel from './components/weatherWeekPanel';
import GeoPanel from './components/geoPanel';
import {
  createElements,
  getElement,
} from '../helpers/other';

const textData = {
  controlPanel: {},
  weatherDayPanel: {},
  weatherWeekPanel: {},
  geoPanel: {},
};


export default class View {
  constructor() {
    // this.controlPanel = new ControlPanel();
    this.weatherDayPanel = new WeatherDayPanel();
    // this.weatherWeekPanel = new WeatherWeekPanel();
    // this.geoPanel = new GeoPanel();
    const [container, navbar, mainbox] = createElements({
      element: 'main',
      classes: 'container',
    }, {
      element: 'div',
      classes: 'navbar',
    }, {
      element: 'div',
      classes: 'mainbox',
    });

    this.app = getElement('#root');
    this.container = container;
    this.navbar = navbar;
    this.mainbox = mainbox;
    // <div class="data-loading"><i class='fa fa-refresh fa-spin'></i></div>
    this.mainbox.append(this.weatherDayPanel.container);
    // this.mainbox.append(this.controlPanel.container, this.weatherDayPanel.container, this.weatherWeekPanel.container, this.geoPanel.container);
    this.container.append(this.navbar, this.mainbox);
    this.app.append(this.container);

    // const skycons = new Skycons({
    //   color: 'white'
    // });
  }


  displayData(data, language, temperature, theme) {
    // const theme = getImage(`weather ${Object.entries(this.loadedData).length === 0 ? this.loadedData.currently.summary : ''}`);

    this.weatherDayPanel.displayData(data);
  }
}
