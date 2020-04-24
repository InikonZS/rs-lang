const App = require('./app.js');

const dashBoardNode = document.querySelector('#app-main');
const extNode = document.querySelector('#app-ext');
const app = new App (dashBoardNode, extNode);

window.app = app; //allow browser console access
