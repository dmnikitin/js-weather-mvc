export async function getContentData(latitude, longitude) {
  const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/9ae37ba17a31e03092c42e5eb4c92a4f/${latitude},${longitude}`;
  try {
    const response = await fetch(url);
    return response.clone().json();
  } catch (error) {
    console.warn(`ERROR(${error.code}): ${error.message}`);
  }
}

export async function getImage(query) {
  const url = `https://api.unsplash.com/photos/random?query=${query}&client_id=8b8a48903903e97065fa65696d60337c9b9b25a8c0e9287290f3fc2379b7cc31`;
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.warn(`ERROR(${error.code}): ${error.message}`);
  }
}

export async function getCoordinates(query) {

}
