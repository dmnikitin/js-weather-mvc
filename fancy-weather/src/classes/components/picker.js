import {
  createElements,
  setAttributes,
} from '../../helpers/other';

import {
  languages,
} from '../../assets/data';

export default class Picker {
  constructor() {
    // const [container, current, options, list, language0, language1, language2] = createElements({
    //   element: 'div',
    //   classes: 'select',
    // }, {
    //   element: 'div',
    //   classes: 'select-current',
    // }, {
    //   element: 'div',
    //   classes: 'select-options',
    // }, {
    //   element: 'ul',
    //   classes: 'select-list',
    // }, {
    //   element: 'div',
    //   classes: 'select-option',
    // }, {
    //   element: 'div',
    //   classes: 'select-option',
    // }, {
    //   element: 'div',
    //   classes: 'select-option',
    // });

    // Object.assign(this, {
    //   container,
    //   current,
    //   options,
    //   list,
    //   language0,
    //   language1,
    //   language2,
    // });
    // this.list.append(language0, language1, language2);
    // this.options.append(this.list);
    // this.container.append(this.current, this.options);

    const [container, language0, language1, language2] = createElements({
      element: 'div',
      classes: 'select',
    }, {
      element: 'button',
      classes: 'select-button',
    }, {
      element: 'button',
      classes: 'select-button',
    }, {
      element: 'button',
      classes: 'select-button',
    });
    Object.assign(this, {
      container,
      language0,
      language1,
      language2,
    });
    this.container.append(language0, language1, language2);
  }

  display(language) {
    const otherLanguages = Object.keys(languages).filter((lang) => lang !== language);
    this.language0.textContent = language;
    otherLanguages.forEach((lang, index) => {
      this[`language${index + 1}`].textContent = lang;
    });
  }
}