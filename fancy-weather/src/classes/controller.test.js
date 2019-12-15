import Controller from './controller';
import View from './view';
import Model from './model';
/* eslint no-undef: 0 */
it('works', () => {
  const controller = new Controller(new Model(), new View());
  expect(controller).toMatchObject({});
});
