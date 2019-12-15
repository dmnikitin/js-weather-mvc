import {
  createElements,
  setAttributes,
} from '../../helpers/other';

import {
  translations,
  temperatureValues,
} from '../../assets/data';

import Switch from './switch';
import Picker from './picker';
import QueryForm from './queryForm';

export default class ControlPanel {
  constructor() {
    const [container, themeButton] = createElements({
      element: 'section',
      classes: 'control-container',
    }, {
      element: 'button',
      classes: 'control-container__button',
    });

    setAttributes(themeButton, {
      id: 'theme-button',
    });

    Object.assign(this, {
      container,
      themeButton,
    });
    this.temperatureButton = new Switch();
    this.languageButton = new Picker();
    this.queryForm = new QueryForm();
    this.container.append(this.queryForm.container, this.temperatureButton.container, this.themeButton, this.languageButton.container);
  }

  display(language, temperature) {
    this.themeButton.textContent = translations.layout.theme[language];
    if (temperature === temperatureValues.celsius) {
      this.temperatureButton.input.checked = true;
    } else {
      this.temperatureButton.input.checked = false;
    }
    setAttributes(this.queryForm.text, {
      placeholder: translations.layout.city[language],
    });
    [...this.languageButton.container.children].forEach((button) => {
      button.classList.remove('button-focus');
      if (button.textContent === language) {
        button.classList.add('button-focus');
      }
    });
  }
}
