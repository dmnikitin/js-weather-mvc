import Skycons from 'skycons-modern';
import { createElements, toCelcius } from '../../helpers/other';
import { temperatureValues, translations, languages } from '../../assets/data';

export default class WeatherDayPanel {
  constructor() {
    const [container, canvas, textWrapper] = createElements({
      element: 'section',
      classes: ['day-container'],
    }, {
      element: 'canvas',
      classes: ['day-container__canvas'],
      attrs: { id: 'mainWeatherIcon', height: 200, width: 200 },
    }, {
      element: 'div',
      classes: ['day-container__text-wrapper'],
    });
    const [place, currTime, currDay, sum] = createElements({
      element: 'h3',
      classes: ['day-container__text-instance-h3'],
    }, {
      element: 'h3',
      classes: ['day-container__text-instance-h3'],
    }, {
      element: 'h3',
      classes: ['day-container__text-instance-h3'],
    }, {
      element: 'h3',
      classes: ['day-container__text-instance-h3'],
    });
    const [apparent, wind, humid] = createElements({
      element: 'h4',
      classes: ['day-container__text-instance-h4'],
    }, {
      element: 'h4',
      classes: ['day-container__text-instance-h4'],
    }, {
      element: 'h4',
      classes: ['day-container__text-instance-h4'],
    });
    Object.assign(this,
      { container, canvas, textWrapper, place, currTime, currDay, sum, apparent, wind, humid });
    this.textWrapper.append(this.place, this.currDay, this.currTime, this.sum);
    this.textWrapper.append(this.apparent, this.wind, this.humid);
    this.container.append(this.canvas, this.textWrapper);
  }

  displayData(data, language, temperatureSystem, place) {
    const {
      currently: { summary, temperature, apparentTemperature, humidity, windSpeed, icon },
    } = data;
    const skycons = new Skycons({ color: 'white' });
    const temperatureString = temperatureSystem === temperatureValues.celsius ? `${toCelcius(temperature).toFixed(0)} °C` : `${temperature.toFixed(0)} °F`;
    const apparentString = temperatureSystem === temperatureValues.celsius ? `${toCelcius(apparentTemperature).toFixed(0)} °C` : `${apparentTemperature.toFixed(0)} °F`;
    const windSpeedParts = language === languages.en ? 'm/s' : 'м/c';
    this.place.textContent = place;
    this.sum.textContent = `${summary}, ${temperatureString}`;
    this.apparent.textContent = `${translations.layout.weather.apparent[language]}: ${apparentString}`;
    this.wind.textContent = `${translations.layout.weather.windSpeed[language]}: ${windSpeed} ${windSpeedParts}`;
    this.humid.textContent = `${translations.layout.weather.humidity[language]}: ${humidity}%`;
    skycons.add('mainWeatherIcon', icon);
    skycons.play();
  }

  displayTime(time, dateLong) {
    this.currDay.textContent = dateLong;
    this.currTime.textContent = time;
  }
}
