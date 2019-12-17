import {
  createElements,
  geoCodesToView,
} from '../../helpers/other';
import {
  translations,
} from '../../assets/data';
import API_KEYS from '../../helpers/sensitive';

export default class GeoPanel {
  constructor() {
    const [container, mapWrapper, textWrapper, latitude, longitude] = createElements({
      element: 'section',
      classes: ['map-container'],
    }, {
      element: 'div',
      classes: ['map-wrapper'],
      attrs: {
        id: 'map',
      },
    }, {
      element: 'div',
      classes: ['map-text-wrapper'],
    }, {
      element: 'h3',
      classes: ['map-text-instance'],
    }, {
      element: 'h3',
      classes: ['map-text-instance'],
    });
    Object.assign(this, {
      container,
      mapWrapper,
      textWrapper,
      latitude,
      longitude,
    });
    this.textWrapper.append(this.latitude, this.longitude);
    this.container.append(this.mapWrapper, this.textWrapper);
  }

  display(latitude, longitude, language) {
    /* eslint no-undef: 0 */
    /* eslint no-unused-vars: 0 */
    mapboxgl.accessToken = API_KEYS.mapToken;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [longitude, latitude],
      zoom: 11,
    });
    map.on('load', () => {
      map.resize();
    });
    this.latitude.textContent = `${translations.layout.geoData.latitude[language]}: ${geoCodesToView(latitude)}`;
    this.longitude.textContent = `${translations.layout.geoData.longitude[language]}: ${geoCodesToView(longitude)}`;
  }
}
