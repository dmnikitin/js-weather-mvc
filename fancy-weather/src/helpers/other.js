const getElement = (selector) => {
  const element = document.querySelector(selector);
  return element
}

const createElements = (...args) => {
  return args.map(e => {
    const element = document.createElement(e.element);
    element.classList.add(e.classes)
    return element;
  })
}

const toCelcius = val => (val - 32) * 5 / 9;
const formatDate = t => {
  const dt = new Date(t * 1000);
  const day = dt.getDate();
  const month = dt.getMonth();
  const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${monthArray[month]}, ${day}`;
}

export {
  getElement,
  createElements,
  toCelcius,
  formatDate
};