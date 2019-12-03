import {
  createElements,
  getElement,
} from '../../helpers/other';

export default class WeatherDayPanel {
  constructor() {
    const [container, canvasWrapper, canvas, textWrapper, summary] = createElements({
      element: 'section',
      classes: 'day-container',
    }, {
      element: 'div',
      classes: 'day-container__canvas-wrapper',
    }, {
      element: 'canvas',
      classes: 'day-container__canvas',
    }, {
      element: 'article',
      classes: 'day-container__text-wrapper',
    }, {
      element: 'h3',
      classes: 'day-container__text-summary',
    });

    Object.assign(this, {
      container,
      canvasWrapper,
      canvas,
      textWrapper,
      summary,
    });

    this.canvasWrapper.append(this.canvas);
    this.textWrapper.append(this.summary);
    this.container.append(this.canvasWrapper, this.textWrapper);
  }

  displayData(data) {
    this.summary.textContent = data.currently.summary;
  }
}
