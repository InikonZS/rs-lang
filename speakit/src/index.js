const App = require('./app.js');
const Button = require('./button.component.js');
const Control = require('./control.component.js');

const startScreenNode = document.querySelector('#page1');
const nextButtonNode = document.querySelector('#next-button');
const appScreenNode = document.querySelector('#page2');
const statisticScreenNode = document.querySelector('#page3');

const dashBoardNode = document.querySelector('#app-main');
const extNode = document.querySelector('#app-ext');
const levelsNode = document.querySelector('#app-levels');
const scoreNode = document.querySelector('#app-score');
const controlsNode = document.querySelector('#app-controls');

const app = new App (
  dashBoardNode, 
  extNode, 
  levelsNode, 
  scoreNode, 
  controlsNode, 
  appScreenNode,
  statisticScreenNode,
  startScreenNode,
  nextButtonNode 
);

window.app = app; //allow browser console access
