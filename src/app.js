const Control = require('./control.js');
const Button = require('./button.js');
const ButtonEx = require('./buttonEx.js');
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
    this.error.node.src = 'assets/snd/' + 'error.mp3';

    const baseOutput = new Control(parentNode, 'div', 'dash_wrapper', '');

    // let menuOutput = new Control(menuNode, 'div', '', '');
    this.menu = new Menu(this, menuNode, baseOutput.node, base);

    


    this.startButton = new ButtonEx(this.mainContol, 'start_button', 'Start Play', false, () => {
      console.log(this.menu.currentBase);
      baseOutput.clear();
      this.game = new Game(this, baseOutput.node, this.menu.currentBase);
    });

    this.resetButton = new ButtonEx(this.mainContol, 'start_button', 'reset', false, () => {
      window.localStorage.clear();
      this.base = new Base();
      this.base = this.base.addFromBaseData(cards);
      this.menu.burg.click();
      this.menu.statistic.click();
    });

    this.difficultButton = new ButtonEx(this.mainContol, 'start_button', 'repeat difficult words', false, () => {
      this.menu.burg.click();
      this.menu.diffucult.click();
    });

    this.modeButton = new ButtonEx(this.mainContol, 'start_button', 'to Game mode', true, function () {
     // this.changeState();
      that.mode = this.state;
      if (that.mode) {
        this.render('menu_button', 'to train mode');
      } else {
        this.render('menu_button', 'to Game mode');
      }
      if (that.game && !that.game.finished) {
        that.game.finish();
        that.error.node.play();
      }
      that.menu.redraw(that.mode);
    });

    this.hashProc(window.location.hash);
    window.onpopstate = ()=>{this.hashProc(window.location.hash)};
  }

  hashProc(hash){
    switch (hash) {
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
  }
}

module.exports = App;
