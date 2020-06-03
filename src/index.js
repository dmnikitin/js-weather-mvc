import './styles.scss';
import View from './classes/view';
import Model from './classes/model';
import Controller from './classes/controller';
import * as geolocation from './geolocation';
/* eslint no-unused-vars: 0 */
const app = new Controller(new Model(), new View());
