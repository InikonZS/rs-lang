const Control = require('./control.js');
const Button = require('./button.js');
const cards = require('./cards.js');

class App {
  constructor(parentNode) {
    this.button = new Button(parentNode, '', 'Click here', () => {
      alert('hi');
    });
  }
}

module.exports = App;
