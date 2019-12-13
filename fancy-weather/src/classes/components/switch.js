import {
  createElements,
  setAttributes,
} from '../../helpers/other';

export default class Switch {
  constructor() {
    const [container, input, label, on, off] = createElements({
      element: 'div',
      classes: 'onoffswitch',
    }, {
      element: 'input',
      classes: 'onoffswitch-checkbox',
    }, {
      element: 'label',
      classes: 'onoffswitch-label',
    }, {
      element: 'span',
      classes: 'onoffswitch-inner',
    }, {
      element: 'span',
      classes: 'onoffswitch-switch',
    });

    setAttributes(input, {
      type: 'checkbox',
      name: 'onoffswitch',
      id: 'myonoffswitch',
      checked: true,
    });
    setAttributes(label, {
      for: 'myonoffswitch',
    });
    Object.assign(this, {
      container,
      input,
      label,
      on,
      off,
    });

    this.label.append(this.on, this.off);
    this.container.append(this.input, this.label);
  }
}
