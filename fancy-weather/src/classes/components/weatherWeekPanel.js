import Skycons from 'skycons-modern';
import {
  createElements,
  setAttributes,
  toCelcius,
  formatDate,
} from '../../helpers/other';

import {
  temperatureValues,
} from '../../assets/data';

export default class WeatherWeekPanel {
  constructor() {
    const [container] = createElements({
      element: 'section',
      classes: 'week-container',
    });
    this.container = container;

    const nextDays = Array.from({
      length: 3,
    }, (value, index) => index);
    nextDays.forEach((day, value) => {
      const [weekdayContainer, weekdayCanvas, weekdayTextWrapper, weekdayText, weekdayTemperature] = createElements({
        element: 'section',
        classes: 'weekday-container',
      }, {
        element: 'canvas',
        classes: 'weekday-container__canvas',
      }, {
        element: 'article',
        classes: 'weekday-container__text-wrapper',
      }, {
        element: 'h3',
        classes: 'weekday-container__text-instance',
      }, {
        element: 'h3',
        classes: 'weekday-container__text-instance',
      });

      weekdayTextWrapper.append(weekdayText, weekdayTemperature);
      weekdayContainer.append(weekdayCanvas, weekdayTextWrapper);
      setAttributes(weekdayCanvas, {
        id: `icon${value + 2}`,
        data: value + 2,
        height: 50,
        width: 50,
      });

      // this.days.push ()
      // this.days.forEach()

      this.container.append(weekdayContainer);
    });

    // setAttributes(canv, { id: 'mainWeatherIcon', height: 300, width: 300 });
    // Object.assign(this, {
    //   container,
    //   canvas,
    //   textWrapper,
    //   timeZone,
    //   currentTime,
    //   summary,
    // });
  }

  displayData(json, language, temperatureSystem) {
    console.log('TCL: WeatherWeekPanel -> displayData -> language', language);
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


    [...this.container.children].forEach((element) => {
      const canvas = element.querySelector('.weekday-container__canvas');

      const value = canvas.getAttribute('data');


      const day = element.querySelectorAll('.weekday-container__text-instance')[0];
      const dayTemperature = element.querySelectorAll('.weekday-container__text-instance')[1];
      const a = json.daily.data[value];
      const average = (a.temperatureHigh + a.temperatureLow) / 2;
      const temperatureString = temperatureSystem === temperatureValues.celsius ? `${toCelcius(average).toFixed(0)} °C` : `${average} °F`;
      day.textContent = formatDate(a.time, language);
      dayTemperature.textContent = temperatureString;
      skycons.add(`${canvas.getAttribute('id')}`, a.icon);
    });
    skycons.play();
    // setTimeout(() => skycons.add(`icon${i}`, e.icon), 1000);
    // canvTxt.textContent = `${formatDate(e.time)}`;
    // canvTemp.textContent = `${toCelcius(e.temperatureHigh).toFixed(0)} °C`;
    // newDiv.append(canv, canvTxt, canvTemp);
    // dailyViewBox.appendChild(newDiv);
  }
}
