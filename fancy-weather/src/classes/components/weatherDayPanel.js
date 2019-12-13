import Skycons from 'skycons-modern';
import {
  createElements,
  setAttributes,
  toCelcius,
  formatDate,
} from '../../helpers/other';

import {
  languages,
  temperatureValues,
  translations,
} from '../../assets/data';

export default class WeatherDayPanel {
  constructor() {
    const [container, canvas, textWrapper, timeZone, currentTime, summary] = createElements({
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
    });
    setAttributes(canvas, {
      id: 'mainWeatherIcon',
      height: 300,
      width: 300,
    });
    Object.assign(this, {
      container,
      canvas,
      textWrapper,
      timeZone,
      currentTime,
      summary,
    });


    this.textWrapper.append(this.timeZone, this.currentTime, this.summary);
    this.container.append(this.canvas, this.textWrapper);
  }

  displayData(json, language, temperatureSystem, theme) {
    const {
      timezone,
      daily: {
        data,
      },
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

    this.timeZone.textContent = timezone;

    const translatedWeather = translations.weather[language];

    this.currentTime.textContent = formatDate(time, language);
    const temperatureString = temperatureSystem === temperatureValues.celsius ? `${toCelcius(temperature).toFixed(0)} °C` : `${temperature} °F`;
    this.summary.textContent = `${translatedWeather[translations.weather.eng.indexOf(icon)]}, ${temperatureString}`;
    skycons.add('mainWeatherIcon', icon);
    skycons.play();
  }
}
