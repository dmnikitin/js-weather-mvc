import Skycons from 'skycons-modern';
import {
  createElements,
  setAttributes,
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
    const [container, canvas, textWrapper, place, currentTime, currentDay, summary] = createElements({
      element: 'section',
      classes: 'day-container',
    }, {
      element: 'canvas',
      classes: 'day-container__canvas',
    }, {
      element: 'article',
      classes: 'day-container__text-wrapper',
    }, {
      element: 'h3',
      classes: 'day-container__text-instance',
    }, {
      element: 'h3',
      classes: 'day-container__text-instance',
    }, {
      element: 'h3',
      classes: 'day-container__text-instance',
    }, {
      element: 'h3',
      classes: 'day-container__text-instance',
    });
    setAttributes(canvas, {
      id: 'mainWeatherIcon',
      height: 200,
      width: 200,
    });
    Object.assign(this, {
      container,
      canvas,
      textWrapper,
      place,
      currentTime,
      currentDay,
      summary,
    });
    this.textWrapper.append(this.place, this.currentTime, this.currentDay, this.summary);
    this.container.append(this.canvas, this.textWrapper);
  }

  displayData(json, language, temperatureSystem, place) {
    const {
      timezone,
      currently: {
        time,
        summary,
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
    this.currentTime.textContent = getCurrentTime(time);
    this.currentDay.textContent = formatDate(time, language);
    this.summary.textContent = `${translatedWeather[translations.weather.en.indexOf(icon)]}, ${temperatureString}`;
    skycons.add('mainWeatherIcon', icon);
    skycons.play();
  }
}
