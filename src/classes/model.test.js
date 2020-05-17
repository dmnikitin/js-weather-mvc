/* eslint no-undef: 0 */
import Model from './model';
import {
  languages,
  temperatureValues,
} from '../assets/data';

describe('testing Model component', () => {
  const model = new Model();

  it('is a constructor function', () => {
    expect(model).toMatchObject({});
  });

  it('setLanguage method works as expected', () => {
    model.setLanguage(languages.en);
    expect(model.language).toEqual('en');
  });

  it('setTemperature method works as expected', () => {
    model.setLanguage(temperatureValues.celsius);
    expect(model.language).toEqual('C');
  });
});
