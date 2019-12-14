import {
  createElements,
  setAttributes,
} from '../../helpers/other';

export default class QueryForm {
  constructor() {
    const [container, text, submit] = createElements({
      element: 'form',
      classes: 'query-form',
    }, {
      element: 'input',
      classes: 'query-form__text',
    }, {
      element: 'input',
      classes: 'query-form__submit',
    });

    setAttributes(text, {
      type: 'text',
      name: 'city',
    });
    setAttributes(submit, {
      type: 'button',
      value: 'enter',
    });

    Object.assign(this, {
      container,
      text,
      submit,
    });

    this.container.append(this.text, this.submit);
  }
}
