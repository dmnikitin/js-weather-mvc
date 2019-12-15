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
    const [container, mapWrapper, textWrapper, latitude, longitude] = createElements({
      element: 'section',
      classes: 'map-container',
    }, {
      element: 'div',
      classes: 'map-wrapper',
    }, {
      element: 'div',
      classes: 'map-text-wrapper',
    }, {
      element: 'h3',
      classes: 'map-text-instance',
    }, {
      element: 'h3',
      classes: 'map-text-instance',
    });
    Object.assign(this, {
      container,
      mapWrapper,
      textWrapper,
      latitude,
      longitude,
    });
    setAttributes(mapWrapper, {
      id: 'map',
    });
    this.textWrapper.append(this.latitude, this.longitude);
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
    this.latitude.textContent = `${translations.layout.geoData.latitude[language]}: ${latitude.toFixed(3)}`;
    this.longitude.textContent = `${translations.layout.geoData.longitude[language]}: ${longitude.toFixed(3)}`;
  }
}
