const Control = require('./control.js');
const Button = require('./button.js');
const Base = require('./base.js');
const Game = require('./game.js');
const Menu = require('./menu.js');
const cards = require('./cards.js');

class App {
  constructor(parentNode, menuNode) {
    const base = new Base();
    base.addFromBaseData(cards);

    
    this.gameContol = document.querySelector('#game-control');
    this.gameScore = document.querySelector('#game-score');

    let baseOutput = new Control(parentNode, 'div', 'dash_wrapper', '');

    //let menuOutput = new Control(menuNode, 'div', '', '');
    this.menu= new Menu(menuNode, baseOutput.node, base);
    this.menu.burg.click();
    this.menu.main.click();
 
    let start = new Button (parentNode, '', 'Start Play', ()=>{
      console.log(this.menu.currentBase);
      baseOutput.clear();
      new Game (this, baseOutput.node, this.menu.currentBase);
    });
    //this.button = new Button(parentNode, '', 'Click here', (() => {
    //  baseOutput.clear();
    //  new Game(baseOutput.node, base.getAnyFromCategory());
    //}));

    
  }
}

module.exports = App;
