const App = require('./app.js');

const dashBoardNode = document.querySelector('#app-main');
const extNode = document.querySelector('#app-ext');
const levelsNode = document.querySelector('#app-levels');
const scoreNode = document.querySelector('#app-score');
const controlsNode = document.querySelector('#app-controls');

const app = new App (dashBoardNode, extNode, levelsNode, scoreNode, controlsNode);

window.app = app; //allow browser console access
