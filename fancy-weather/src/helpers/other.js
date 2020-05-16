import { translations, formatWeekDays } from '../assets/data';

const getInitialCoordinates = () => new Promise((resolve, reject) => {
  const options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 };
  navigator.geolocation.getCurrentPosition(resolve, reject, options);
});

const getElement = (selector) => document.querySelector(selector);

const createElements = (...args) => args.map((e) => {
  const element = document.createElement(e.element);
  element.classList.add(...e.classes);
  if (Object.prototype.hasOwnProperty.call(e, 'attrs')) {
    const keys = Object.keys(e.attrs);
    keys.forEach((key) => {
      if (keys.includes(key)) element.setAttribute(key, e.attrs[key]);
    });
  }
  if (Object.prototype.hasOwnProperty.call(e, 'textContent')) element.textContent = e.textContent;
  return element;
});

const toCelcius = (val) => ((val - 32) * 5) / 9;

const formatDate = (time, language, format) => {
  const dt = new Date(time * 1000);
  const day = dt.getDate() - 1;
  const month = dt.getMonth();
  const weekDay = translations.weekday[format][language][dt.getUTCDay()];
  const monthArray = translations.month[language];
  return `${monthArray[month]}, ${day}, ${weekDay}`;
};

const getCurrentTime = (timeZone, language) => {
  const dt = new Date().toLocaleString('en-GB', { timeZone });
  const wd = new Date().toLocaleString('en-GB', { timeZone, weekday: 'long' });
  const wdIndex = translations.weekday.all.findIndex((el) => el === wd);
  const weekDayLong = translations.weekday[formatWeekDays.fullName][language][wdIndex];
  const [dtShort, timeShort] = dt.split(' ');
  const result = dtShort.split('/');
  const monthArray = translations.month[language];
  const time = timeShort.substring(0, timeShort.length - 3);
  const dateLong = `${monthArray[parseInt(result[1] - 1, 10)]}, ${result[0]}, ${weekDayLong}`;
  return { time, dateLong };
};

const getProperImageQuery = (time, weather, place) => {
  const dt = new Date(time * 1000);
  const month = dt.getMonth();
  const hour = dt.getHours();
  return `${translations.seasons[month]} ${translations.dayParts[Math.floor(hour / 6)]} ${weather} ${place}`;
};

const deleteChild = (element) => {
  let child = element.lastElementChild;
  while (child) {
    element.removeChild(child);
    child = element.lastElementChild;
  }
};

const geoCodesToView = (decimalDeg) => {
  const degrees = Math.floor(decimalDeg);
  const minutes = (decimalDeg - degrees) * 60;
  const seconds = (minutes - Math.floor(minutes)) * 60;
  return `${degrees}° ${Math.floor(minutes)}' ${seconds.toFixed(2)}"`;
};

export {
  getInitialCoordinates,
  getElement,
  createElements,
  toCelcius,
  formatDate,
  getCurrentTime,
  getProperImageQuery,
  deleteChild,
  geoCodesToView,
};
