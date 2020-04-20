const Control = require('./control.js');
const ButtonEx = require('./buttonEx.js');
const Base = require('./base.js');
const Game = require('./game.js');
const Menu = require('./menu.js');
const cards = require('./cards.js');

class App {
  constructor(parentNode, menuNode) {
    const that = this;
    this.mode = 0;
    this.base = new Base();
    this.base.addFromBaseData(cards);

    this.mainContol = document.querySelector('#main-control');
    this.gameContol = document.querySelector('#game-control');
    this.gameScore = document.querySelector('#game-score');
    this.categoryName = document.querySelector('#category');
    this.categoryDesc = document.querySelector('#category-description');

    this.error = new Control(parentNode, 'audio', '', '');
    this.error.node.src = 'assets/snd/' + 'error.mp3';

    const baseOutput = new Control(parentNode, 'div', 'dash_wrapper', '');

    this.menu = new Menu(this, menuNode, baseOutput.node);

    this.startButton = new ButtonEx(this.mainContol, 'start_button', 'Start Play', false, () => {
      console.log(this.menu.currentBase);
      baseOutput.clear();
      this.game = new Game(this, baseOutput.node, this.menu.currentBase);
    });

    this.resetButton = new ButtonEx(this.mainContol, 'start_button', 'reset', false, () => {
      window.localStorage.clear();
     // this.base = new Base(); // bug with statistics
     // console.log(this.base);
      this.base.words = [];
      this.base.addFromBaseData(cards);
      this.menu.burg.click();
      this.menu.statistic.click();
    });

    this.difficultButton = new ButtonEx(this.mainContol, 'start_button', 'repeat difficult words', false, () => {
      this.menu.burg.click();
      this.menu.diffucult.click();
    });

    this.modeButton = new ButtonEx(this.mainContol, 'start_button', 'to Game mode', true, function () {
      that.mode = this.state;
      if (that.mode) {
        this.render('menu_button', 'to train mode');
      } else {
        this.render('menu_button', 'to Game mode');
      }
      if (that.game && !that.game.finished) {
        that.game.finish();
        that.menu.burg.click();
        that.menu.currentMenuButton.click();
        that.error.node.play();
      }
      that.menu.redraw(that.mode);
    });

    this.hashProc(window.location.hash);
    window.onpopstate = () => { this.hashProc(window.location.hash); };
  }

  hashProc(hash) {
    if (hash[1]=='_'){
      let hs = hash.split('');
      hs.shift();
      hs.shift();
      let cat = +(hs.join(''));
      this.menu.burg.click();
      this.menu.categories[cat].click();
    } else {

    switch (hash) {
      case '':
        this.menu.burg.click();
        this.menu.main.click();
        break;
      case '#':
        this.menu.burg.click();
        this.menu.main.click();
        break;
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
    }
    }
  }
}

module.exports = App;
