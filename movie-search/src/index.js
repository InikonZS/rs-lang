const App = require('./app.js');

const dashBoardNode = document.querySelector('#app-main');
const searchNode = document.querySelector('#app-search');

const app = new App(
  dashBoardNode,
  searchNode,
);

window.app = app; // allow browser console access
