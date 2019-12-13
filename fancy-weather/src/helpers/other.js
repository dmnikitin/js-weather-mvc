import {
  translations,
} from '../assets/data';

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
const formatDate = (t, language) => {
  const dt = new Date(t * 1000);
  const day = dt.getDate();
  const month = dt.getMonth();
  const weekDay = translations.weekday[language][dt.getUTCDay()];
  const monthArray = translations.month[language];
  return `${monthArray[month]}, ${day}, ${weekDay}`;
};

export {
  getElement,
  createElements,
  setAttributes,
  toCelcius,
  formatDate,
};
