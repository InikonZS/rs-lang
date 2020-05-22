const App = require('./app.js');

const backNode = document.querySelector('#back');
const menuNode = document.querySelector('#menu_container');
const searchNode = document.querySelector('#search_container');
const weatherNode = document.querySelector('#weather_container');
const mapNode = document.querySelector('#map_container');
const footerNode = document.querySelector('#footer');

const app = new App(
  menuNode,
  searchNode,
  weatherNode,
  mapNode,
  footerNode,
  backNode,
);

window.app = app; // allow browser console access
