import {
  createElements,
} from '../../helpers/other';

export default class QueryForm {
  constructor() {
    const [container, text, searchButton, searchIcon, micButton, micIcon] = createElements({
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
      element: 'span',
      classes: ['query-form__mic'],
    }, {
      element: 'i',
      classes: ['material-icons'],
      textContent: 'mic',
    });
    searchButton.append(searchIcon);
    micButton.append(micIcon);
    Object.assign(this, { container, text, micButton, searchButton });

    this.container.append(this.text, this.micButton, this.searchButton);
  }
}
