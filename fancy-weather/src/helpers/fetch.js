const getWeatherURL = (latitude, longitude) => `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/9ae37ba17a31e03092c42e5eb4c92a4f/${latitude},${longitude}`;
const getImageURL = (query) => `https://api.unsplash.com/photos/random?query=${query}&client_id=8b8a48903903e97065fa65696d60337c9b9b25a8c0e9287290f3fc2379b7cc31`;
const getCoordsURL = (query) => `123${query}`;

async function getData(url) {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    throw new Error(`ERROR(${error.code}): ${error.message}`);
  }
}

export {
  getWeatherURL,
  getImageURL,
  getCoordsURL,
  getData,
};
