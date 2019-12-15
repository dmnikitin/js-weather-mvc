import './styles.scss';
import View from './classes/view';
import Model from './classes/model';
import Controller from './classes/controller';
/* eslint no-unused-vars: 0 */
const app = new Controller(new Model(), new View());
