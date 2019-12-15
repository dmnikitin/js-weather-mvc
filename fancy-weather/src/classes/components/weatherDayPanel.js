import Skycons from 'skycons-modern';
import {
  createElements,
  toCelcius,
  formatDate,
  getCurrentTime,
} from '../../helpers/other';

import {
  temperatureValues,
  translations,
} from '../../assets/data';

export default class WeatherDayPanel {
  constructor() {
    const [container, canvas, textWrapper, place, currTime, currDay, summary] = createElements({
      element: 'section',
      classes: ['day-container'],
    }, {
      element: 'canvas',
      classes: ['day-container__canvas'],
      attrs: {
        id: 'mainWeatherIcon',
        height: 200,
        width: 200,
      },
    }, {
      element: 'article',
      classes: ['day-container__text-wrapper'],
    }, {
      element: 'h3',
      classes: ['day-container__text-instance'],
    }, {
      element: 'h3',
      classes: ['day-container__text-instance'],
    }, {
      element: 'h3',
      classes: ['day-container__text-instance'],
    }, {
      element: 'h3',
      classes: ['day-container__text-instance'],
    });
    Object.assign(this, {
      container,
      canvas,
      textWrapper,
      place,
      currTime,
      currDay,
      summary,
    });
    this.textWrapper.append(this.place, this.currTime, this.currDay, this.summary);
    this.container.append(this.canvas, this.textWrapper);
  }

  displayData(json, language, temperatureSystem, place) {
    const {
      timezone,
      currently: {
        time,
        temperature,
        icon,
      },
    } = json;

    const skycons = new Skycons({
      color: 'white',
    });

    const translatedWeather = translations.weather[language];
    const temperatureString = temperatureSystem === temperatureValues.celsius ? `${toCelcius(temperature).toFixed(0)} °C` : `${temperature} °F`;
    this.place.textContent = place;
    this.currTime.textContent = getCurrentTime(timezone);
    this.currDay.textContent = formatDate(time, language);
    this.summary.textContent = `${translatedWeather[translations.weather.en.indexOf(icon)]}, ${temperatureString}`;
    skycons.add('mainWeatherIcon', icon);
    skycons.play();
  }
}
