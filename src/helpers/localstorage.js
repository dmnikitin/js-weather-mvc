import {
  temperatureValues,
  languages,
} from '../assets/data';

const getFromLocalStorage = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem('state') || '{}');
    const storage = parsed;
    if (parsed === null) {
      return undefined;
    }
    if (!Object.prototype.hasOwnProperty.call(parsed, 'language')) storage.language = languages.en;
    if (!Object.prototype.hasOwnProperty.call(parsed, 'temperature')) storage.temperature = temperatureValues.celsius;
    return storage;
  } catch (err) {
    return undefined;
  }
};

const saveToLocalStorage = (value) => localStorage.setItem('state', JSON.stringify(value));

export {
  getFromLocalStorage,
  saveToLocalStorage,
};
