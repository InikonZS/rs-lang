const Control = require('./control.js');
const Button = require('./button.js');
const Base = require('./base.js');
const Game = require('./game.js');
const Menu = require('./menu.js');
const cards = require('./cards.js');

class App {
  constructor(parentNode) {
    const base = new Base();
    base.addFromBaseData(cards);

    

    let baseOutput = new Control(parentNode, 'div', '', '');
    this.menu= new Menu(parentNode, baseOutput.node, base);
    this.menu.main.click();
    let start = new Button (parentNode, '', 'Start Play', ()=>{
      console.log(this.menu.currentBase);
      baseOutput.clear();
      new Game (baseOutput.node, this.menu.currentBase);
    });
    //this.button = new Button(parentNode, '', 'Click here', (() => {
    //  baseOutput.clear();
    //  new Game(baseOutput.node, base.getAnyFromCategory());
    //}));

    
  }
}

module.exports = App;
