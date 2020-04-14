const Control = require('./control.js');
const Button = require('./button.js');
const Base = require('./base.js');
const Game = require('./game.js');
const Menu = require('./menu.js');
const cards = require('./cards.js');

class App {
  constructor(parentNode, menuNode) {
    let that = this;
    this.mode = 0;
    const base = new Base();
    base.addFromBaseData(cards);

    this.mainContol = document.querySelector('#main-control');
    this.gameContol = document.querySelector('#game-control');
    this.gameScore = document.querySelector('#game-score');

    this.error = new Control(parentNode, 'audio','','');
    this.error.node.src='assets/audio/'+'error.mp3';

    let baseOutput = new Control(parentNode, 'div', 'dash_wrapper', '');

    //let menuOutput = new Control(menuNode, 'div', '', '');
    this.menu= new Menu(this, menuNode, baseOutput.node, base);
    this.menu.burg.click();
    this.menu.main.click();
 
    let start = new Button (this.mainContol, 'menu_button', 'Start Play', ()=>{
      console.log(this.menu.currentBase);
      baseOutput.clear();
      this.game = new Game (this, baseOutput.node, this.menu.currentBase);
    });

    let modeButton = new Button (this.mainContol, 'menu_button', 'to Game mode', function(){
      this.changeState();
      that.mode = this.state;
      if (that.mode) {
        this.render('menu_button', 'to train mode');
      } else {
        this.render('menu_button', 'to Game mode');
      }
      that.menu.redraw(that.mode);
    });

   
    //this.button = new Button(parentNode, '', 'Click here', (() => {
    //  baseOutput.clear();
    //  new Game(baseOutput.node, base.getAnyFromCategory());
    //}));

    
  }
}

module.exports = App;
