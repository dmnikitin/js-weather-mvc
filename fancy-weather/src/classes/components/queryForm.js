import {
  createElements,
} from '../../helpers/other';

export default class QueryForm {
  constructor() {
    const [container, text, button, icon, mic] = createElements({
      element: 'form',
      classes: ['query-form'],
    }, {
      element: 'input',
      classes: ['query-form__text'],
      attrs: {
        type: 'text',
        name: 'city',
      },
    }, {
      element: 'button',
      classes: ['query-form__submit'],
    }, {
      element: 'i',
      classes: ['material-icons'],
      textContent: 'search',
    }, {
      element: 'i',
      classes: ['material-icons', 'query-form__mic'],
      textContent: 'mic',
    });
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
