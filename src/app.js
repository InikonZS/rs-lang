const Control = require('./control.js');
const Button = require('./button.js');
const Base = require('./base.js');
const Game = require('./game.js');
const Menu = require('./menu.js');
const cards = require('./cards.js');

class App {
  constructor(parentNode, menuNode) {
    const that = this;
    this.mode = 0;
    const base = new Base();
    base.addFromBaseData(cards);

    this.mainContol = document.querySelector('#main-control');
    this.gameContol = document.querySelector('#game-control');
    this.gameScore = document.querySelector('#game-score');
    this.categoryName = document.querySelector('#category');
    this.categoryDesc = document.querySelector('#category-description');
    

    this.error = new Control(parentNode, 'audio', '', '');
    this.error.node.src = 'assets/audio/' + 'error.mp3';

    const baseOutput = new Control(parentNode, 'div', 'dash_wrapper', '');

    // let menuOutput = new Control(menuNode, 'div', '', '');
    this.menu = new Menu(this, menuNode, baseOutput.node, base);

    switch (window.location.hash) {
      case '#main':
        this.menu.burg.click();
        this.menu.main.click();
        break;
      case '#random':
        this.menu.burg.click();
        this.menu.random.click();
        break;
      case '#difficult':
        this.menu.burg.click();
        this.menu.diffucult.click();
        break;
      case '#statistic':
        this.menu.burg.click();
        this.menu.statistic.click();
        break;
      default:
        this.menu.burg.click();
        this.menu.main.click();
    }


    this.startButton = new Button(this.mainContol, 'menu_button', 'Start Play', () => {
      console.log(this.menu.currentBase);
      baseOutput.clear();
      this.game = new Game(this, baseOutput.node, this.menu.currentBase);
    });

    this.modeButton = new Button(this.mainContol, 'menu_button', 'to Game mode', function () {
      this.changeState();
      that.mode = this.state;
      if (that.mode) {
        this.render('menu_button', 'to train mode');
      } else {
        this.render('menu_button', 'to Game mode');
      }
      that.menu.redraw(that.mode);
    });


    // this.button = new Button(parentNode, '', 'Click here', (() => {
    //  baseOutput.clear();
    //  new Game(baseOutput.node, base.getAnyFromCategory());
    // }));
  }
}

module.exports = App;
