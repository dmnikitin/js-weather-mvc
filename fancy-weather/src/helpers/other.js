import {
  translations,
  seasons,
  dayParts,
} from '../assets/data';

const getInitialCoordinates = () => new Promise((resolve, reject) => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });

const getElement = (selector) => {
  const element = document.querySelector(selector);
  return element;
};

const createElements = (...args) => args.map((e) => {
  const element = document.createElement(e.element);
  element.classList.add(e.classes);
  return element;
});

const setAttributes = (el, attrs) => {
  for (const key in attrs) {
    if (attrs.hasOwnProperty(key)) {
      el.setAttribute(key, attrs[key]);
    }
  }
};

const toCelcius = (val) => (val - 32) * 5 / 9;
const formatDate = (time, language) => {
  const dt = new Date(time * 1000);
  const day = dt.getDate();
  const month = dt.getMonth();
  const weekDay = translations.weekday[language][dt.getUTCDay()];
  const monthArray = translations.month[language];
  return `${monthArray[month]}, ${day}, ${weekDay}`;
};

const getCurrentTime = (time) => {
  const dt = new Date(time * 1000);
  const hours = dt.getHours();
  const minutes = dt.getMinutes();
  return `${hours}:${minutes}`;
};

const getProperImageQuery = (time, weather) => {
  const dt = new Date(time * 1000);
  const month = dt.getMonth();
  const hour = dt.getHours();
  return `${weather} ${dayParts[Math.floor(hour / 6)]} ${seasons[month]}`;
};

export {
  getInitialCoordinates,
  getElement,
  createElements,
  setAttributes,
  toCelcius,
  formatDate,
  getCurrentTime,
  getProperImageQuery,
};
