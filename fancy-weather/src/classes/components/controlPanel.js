import {
  createElements,
  setAttributes,
} from '../../helpers/other';

import {
  translations,
  languages,
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
    this.container.append(this.themeButton, this.languageButton.container, this.temperatureButton.container, this.queryForm.container);
  }

  display(language) {
    this.themeButton.textContent = translations.layout.theme[language];
    setAttributes(this.queryForm.text, {
      placeholder: translations.layout.city[language],
    });
    const otherLanguages = Object.keys(languages).filter((lang) => lang !== language);
    this.languageButton.language0.textContent = language;
    otherLanguages.forEach((lang, index) => {
      this.languageButton[`language${index + 1}`].textContent = lang;
    });
  }
}
