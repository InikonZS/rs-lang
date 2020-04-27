const App = require('./app.js');

const dashBoardNode = document.querySelector('#app-main');

const app = new App (
  dashBoardNode, 
);

window.app = app; //allow browser console access
