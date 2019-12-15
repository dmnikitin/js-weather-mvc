/* eslint no-undef: 0 */

import {
  getInitialCoordinates,
  toCelcius,
  createElements,
  getCurrentTime,
} from './other';


test('getCurrentTime test', () => {
  const timeZone = 'Europe/Minsk';
  const dt = new Date().toLocaleString('en-GB', {
    timeZone,
  });
  const time = dt.split(' ')[1];
  const res = time.substring(0, time.length - 3);
  expect(getCurrentTime(timeZone)).toBe(res);
});

test('getCurrentTime test', () => {
  const timeZone = 'America/New_York';
  const dt = new Date().toLocaleString('en-GB', {
    timeZone,
  });
  const time = dt.split(' ')[1];
  const res = time.substring(0, time.length - 3);
  expect(getCurrentTime(timeZone)).toBe(res);
});


test('toCelsius test', () => {
  const fahrenheit = 451;
  expect(toCelcius(fahrenheit)).toBe(232.77777777777777);
});

test('toCelsius test', () => {
  const fahrenheit = 0;
  expect(toCelcius(fahrenheit)).toBe(-17.77777777777778);
});

test('createElementsTest', () => {
  const arr = createElements({
    element: 'img',
    classes: ['img'],
  });
  expect(arr).toMatchObject([]);
});


test('createElementsTest', () => {
  expect(getInitialCoordinates()).toMatchObject({});
});
