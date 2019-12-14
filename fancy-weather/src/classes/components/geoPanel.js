import {
  createElements,
  setAttributes,
} from '../../helpers/other';
import {
  translations,
} from '../../assets/data';
import API_KEYS from '../../helpers/sensitive';

export default class GeoPanel {
  constructor() {
    const [container, mapWrapper, textWrapper] = createElements({
      element: 'section',
      classes: 'map-container',
    }, {
      element: 'div',
      classes: 'map-wrapper',
    }, {
      element: 'div',
      classes: 'map-text-wrapper',
    });
    Object.assign(this, {
      container,
      mapWrapper,
      textWrapper,
    });
    setAttributes(mapWrapper, {
      id: 'map',
    });
    this.container.append(this.mapWrapper, this.textWrapper);
  }

  display(latitude, longitude, language) {
    mapboxgl.accessToken = API_KEYS.mapToken;
    const map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [longitude, latitude],
      zoom: 11,
    });
    this.textWrapper.textContent = `${translations.layout.geoData.latitude[language]}: ${latitude}, ${translations.layout.geoData.longitude[language]}: ${longitude}`;
  }
}
