import {
  createElements,
  setAttributes,
} from '../../helpers/other';

export default class QueryForm {
  constructor() {
    const [container, text, button, icon] = createElements({
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
    });

    setAttributes(text, {
      type: 'text',
      name: 'city',
    });

    icon.textContent = 'search';


    button.append(icon);

    Object.assign(this, {
      container,
      text,
      button,
    });

    this.container.append(this.text, this.button);
  }
}
