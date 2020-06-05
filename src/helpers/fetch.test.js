/* eslint no-undef: 0 */
import {
  getData,
  getWeatherURL,
} from './fetch';

import token from './sensitive';

describe('testing fetch helpers', () => {
  const mockData = {
    city: 'Minsk',
    date: new Date(),
    latitude: 53.812,
    longitude: 28.123,
    language: 'ru',
  };
  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponseOnce(JSON.stringify(mockData));
  });

  it('calls google and returns following pattern', () => {
    getData().then((res) => {
      expect(res).toMatchSnapshot({
        city: expect.any(String),
        date: expect.any(Date),
        latitude: expect.any(Number),
      });
    });
  });

  it('calls api and returns correct data', () => {
    getData().then((res) => {
      expect(res.city).toEqual('Minsk');
    });
  });

  it('getWeatherURL helper returns a string', () => {
    const {
      latitude,
      longitude,
      language,
    } = mockData;
    const url = `https://api.darksky.net/forecast/${token.weatherToken}/${longitude},${latitude}?lang=${language}`;
    expect(getWeatherURL(longitude, latitude, language)).toEqual(url);
  });
});
