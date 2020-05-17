import { createElements, geoCodesToView } from '../../helpers/other';
import { translations } from '../../assets/data';

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

  displayGeoData(latitude, longitude, language) {
    this.latitude.textContent = `${translations.layout.geoData.latitude[language]}: ${geoCodesToView(latitude)}`;
    this.longitude.textContent = `${translations.layout.geoData.longitude[language]}: ${geoCodesToView(longitude)}`;
  }
}
