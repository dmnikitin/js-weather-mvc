import {
  createElements,
} from '../../helpers/other';

export default class Picker {
  constructor() {
    const [container, language0, language1, language2] = createElements({
      element: 'div',
      classes: ['select'],
    }, {
      element: 'button',
      classes: ['select-button'],
      textContent: 'en',
    }, {
      element: 'button',
      classes: ['select-button'],
      textContent: 'ru',
    }, {
      element: 'button',
      classes: ['select-button'],
      textContent: 'be',
    });
    language0.classList.toggle('button-focus');
    Object.assign(this, {
      container,
      language0,
      language1,
      language2,
    });
    this.container.append(language0, language1, language2);
  }
}
