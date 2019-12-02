const getFromLocalStorage = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem('state') || '{}');
    const storage = parsed;
    if (parsed === null) {
      return undefined;
    }
    if (!Object.prototype.hasOwnProperty.call(parsed, 'tool')) storage.tool = 'pencil';
    if (!Object.prototype.hasOwnProperty.call(parsed, 'colors') || !parsed.colors.length) storage.colors = ['green', 'grey', 'red', 'blue'];
    if (!Object.prototype.hasOwnProperty.call(parsed, 'parts')) storage.parts = [];
    if (!Object.prototype.hasOwnProperty.call(parsed, 'matrixLength')) storage.matrixLength = 128;
    if (!Object.prototype.hasOwnProperty.call(parsed, 'image')) storage.image = null;
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
