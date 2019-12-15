import {
  createElements,
  setAttributes,
} from '../../helpers/other';

export default class QueryForm {
  constructor() {
    const [container, text, button, icon, mic] = createElements({
      element: 'form',
      classes: 'query-form',
    }, {
      element: 'input',
      classes: 'query-form__text',
    }, {
      element: 'button',
      classes: 'query-form__submit',
    }, {
      element: 'i',
      classes: 'material-icons',
    }, {
      element: 'i',
      classes: 'material-icons',
    });

    setAttributes(text, {
      type: 'text',
      name: 'city',
    });

    icon.textContent = 'search';
    mic.textContent = 'mic';
    mic.classList.add('query-form__mic');

    button.append(icon);

    Object.assign(this, {
      container,
      text,
      mic,
      button,
    });

    this.container.append(this.text, this.mic, this.button);
  }
}
