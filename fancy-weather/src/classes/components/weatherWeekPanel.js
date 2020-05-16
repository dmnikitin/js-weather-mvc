import Skycons from 'skycons-modern';
import {
  createElements,
  toCelcius,
  formatDate,
} from '../../helpers/other';

import {
  temperatureValues,
  formatWeekDays,
} from '../../assets/data';

export default class WeatherWeekPanel {
  constructor() {
    const [container] = createElements({
      element: 'section',
      classes: ['week-container'],
    });
    const nextDays = Array.from({
      length: 3,
    }, (value, index) => index + 2);
    const canvasData = { canvasHeight: 50, canvasWidth: 50 };
    this.container = container;
    nextDays.forEach((day) => {
      const [wdContainer, wdCanvas, wdTextWrap, wdText, wdTemp] = createElements({
        element: 'section',
        classes: ['weekday-container'],
      }, {
        element: 'canvas',
        classes: ['weekday-container__canvas'],
        attrs: { id: `icon${day}`, data: day, height: canvasData.canvasHeight, width: canvasData.canvasWidth },
      }, {
        element: 'article',
        classes: ['weekday-container__text-wrapper'],
      }, {
        element: 'h3',
        classes: ['weekday-container__text-instance'],
      }, {
        element: 'h3',
        classes: ['weekday-container__text-instance'],
      });
      wdTextWrap.append(wdText, wdTemp);
      wdContainer.append(wdCanvas, wdTextWrap);
      this.container.append(wdContainer);
    });
  }

  displayData(json, language, temperatureSystem) {
    const skycons = new Skycons({ color: 'white' });
    [...this.container.children].forEach((element) => {
      const canvas = element.querySelector('.weekday-container__canvas');
      const value = canvas.getAttribute('data');
      const day = element.querySelectorAll('.weekday-container__text-instance')[0];
      const dayTemperature = element.querySelectorAll('.weekday-container__text-instance')[1];
      const dailyTemp = json.daily.data[value - 1];
      const average = (dailyTemp.temperatureHigh + dailyTemp.temperatureLow) / 2;
      const temperatureString = temperatureSystem === temperatureValues.celsius ? `${toCelcius(average).toFixed(0)} °C` : `${average.toFixed(0)} °F`;
      day.textContent = formatDate(dailyTemp.time, language, formatWeekDays.fullName);
      dayTemperature.textContent = temperatureString;
      skycons.add(`${canvas.getAttribute('id')}`, dailyTemp.icon);
    });
    skycons.play();
  }
}
