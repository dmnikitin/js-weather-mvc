import {
  createElements,
  setAttributes,
} from '../../helpers/other';

import Switch from './switch';
import Picker from './picker';

export default class ControlPanel {
  constructor() {
    const [container, themeButton, input] = createElements({
      element: 'section',
      classes: 'control-container',
    }, {
      element: 'button',
      classes: 'control-container__button',
    }, {
      element: 'input',
      classes: 'control-container__input',
    });

    setAttributes(themeButton, {
      id: 'theme-button',
    });

    setAttributes(input, {
      type: 'text',
      name: 'firstname',
      value: 'John',
    });
    Object.assign(this, {
      container,
      themeButton,
      input,
    });
    this.temperatureButton = new Switch();
    this.languageButton = new Picker();
    this.container.append(this.themeButton, this.languageButton.container, this.temperatureButton.container, this.input);
  }


  // changeData(language, theme, temperature, inputValue) {

  // }
}
