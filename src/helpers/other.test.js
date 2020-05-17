/* eslint no-undef: 0 */

import {
  getInitialCoordinates,
  toCelcius,
  createElements,
  getCurrentTime,
} from './other';

describe('test other helpers funcs', () => {
  test('getCurrentTime', () => {
    const timeZone = 'Europe/Minsk';
    const dt = new Date().toLocaleString('en-GB', {
      timeZone,
    });
    const time = dt.split(' ')[1];
    const res = time.substring(0, time.length - 3);
    expect(getCurrentTime(timeZone)).toBe(res);
  });
  test('toCelsius', () => {
    const fahrenheit = 451;
    expect(toCelcius(fahrenheit)).toBe(232.77777777777777);
  });
  test('createElementsTest', () => {
    const arr = createElements({
      element: 'img',
      classes: ['img', 'cat'],
    }, {
      element: 'div',
      classes: ['wrapper'],
    });
    expect(arr).toHaveLength(2);
  });
  test('getInitialCoordinatesTest', () => {
    expect(getInitialCoordinates()).toMatchObject({});
  });
});
