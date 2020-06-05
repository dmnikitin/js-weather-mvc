import {
  createElements,
} from '../../helpers/other';

export default class Switch {
  constructor() {
    const [container, input, label, on, off] = createElements({
      element: 'div',
      classes: ['onoffswitch'],
    }, {
      element: 'input',
      classes: ['onoffswitch-checkbox'],
      attrs: {
        type: 'checkbox',
        name: 'onoffswitch',
        id: 'myonoffswitch',
        checked: true,
      },
    }, {
      element: 'label',
      classes: ['onoffswitch-label'],
      attrs: {
        for: 'myonoffswitch',
      },
    }, {
      element: 'span',
      classes: ['onoffswitch-inner'],
    }, {
      element: 'span',
      classes: ['onoffswitch-switch'],
    });
    Object.assign(this, { container, input, label, on, off });
    this.label.append(this.on, this.off);
    this.container.append(this.input, this.label);
  }
}
