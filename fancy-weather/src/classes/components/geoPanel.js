import { createElements, geoCodesToView } from '../../helpers/other';
import { getMapToken } from '../../helpers/fetch';
import { translations, errors } from '../../assets/data';

export default class GeoPanel {
  constructor() {
    const [container, mapWrapper, textWrapper, latitude, longitude] = createElements({
      element: 'section',
      classes: ['map-container'],
    }, {
      element: 'div',
      classes: ['map-wrapper'],
      attrs: { id: 'map' },
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
    Object.assign(this, { container, mapWrapper, textWrapper, latitude, longitude });
    this.textWrapper.append(this.latitude, this.longitude);
    this.container.append(this.mapWrapper, this.textWrapper);
  }

  async display(latitude, longitude, language) {
    /* eslint no-undef: 0 */
    try {
      const { MAP_TOKEN } = await getMapToken();
      mapboxgl.accessToken = MAP_TOKEN;
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [longitude, latitude],
        zoom: 9,
      });
      map.on('load', () => map.resize());
      this.latitude.textContent = `${translations.layout.geoData.latitude[language]}: ${geoCodesToView(latitude)}`;
      this.longitude.textContent = `${translations.layout.geoData.longitude[language]}: ${geoCodesToView(longitude)}`;
    } catch (err) {
      throw new Error(errors.MAP_LOADING_ERROR);
    }
  }
}
