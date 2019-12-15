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
  element.classList.add(...e.classes);
  if (Object.prototype.hasOwnProperty.call(e, 'attrs')) {
    const keys = Object.keys(e.attrs);
    keys.forEach((key) => {
      if (keys.includes(key)) {
        element.setAttribute(key, e.attrs[key]);
      }
    });
  }
  if (Object.prototype.hasOwnProperty.call(e, 'textContent')) {
    element.textContent = e.textContent;
  }
  return element;
});

const toCelcius = (val) => ((val - 32) * 5) / 9;
const formatDate = (time, language) => {
  const dt = new Date(time * 1000);
  const day = dt.getDate();
  const month = dt.getMonth();
  const weekDay = translations.weekday[language][dt.getUTCDay()];
  const monthArray = translations.month[language];
  return `${monthArray[month]}, ${day}, ${weekDay}`;
};

const getCurrentTime = (timeZone) => {
  const dt = new Date().toLocaleString('en-GB', {
    timeZone,
  });
  const time = dt.split(' ')[1];
  return time.substring(0, time.length - 3);
};

const getProperImageQuery = (time, weather) => {
  const dt = new Date(time * 1000);
  const month = dt.getMonth();
  const hour = dt.getHours();
  return `${weather} ${dayParts[Math.floor(hour / 6)]} ${seasons[month]}`;
};

const deleteChild = (element) => {
  let child = element.lastElementChild;
  while (child) {
    element.removeChild(child);
    child = element.lastElementChild;
  }
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
};
