const Base = require('./base.js');
const Button = require('./button.js');
const Control = require('./control.js');
const Card = require('./card.js');
const Statistic = require('./statistic.js');


class Menu extends Button {
  constructor(app, parentNode_, targetNode) {
    const parent = super(parentNode_, 'basic_block menu_burger');
    const parentNode = parent.node;
 
    let that = this;

    this.app = app;
    let base = app.base; // warning; it cant refresh from app
    this.burg = new Button(parentNode_, 'burger', '', function () {
      if (this.state) {
        that.hide();
        that.dark.hide();
        this.node.style = 'transform: rotateZ(0deg);';
        this.changeState();
      } else {
        that.show();
        that.dark.show();
        this.node.style = 'transform: rotateZ(90deg);';
        this.changeState();
      }
    });
    const el = new Control(this.burg.node, 'img', '', '');
    el.node.src = 'assets/ico/burger.png';

    this.dark = new Button(document.querySelector('body'), 'modal', '', (() => {
      that.burg.click();
    }));

    this.currentCards = [];

    const drawCards = (targetNode, base, clicker) => {
      this.currentBase = base;
      targetNode.innerHTML = '';
      this.currentCards = [];
      if (base.words.length) {
        base.words.forEach((it, i) => {
          let el;
          if (clicker) {
            el = new Card(targetNode, it, clicker(i));
            el.setCategoryMode();
          } else {
            el = new Card(targetNode, it);
            el.setMode(app.mode);
          }
          that.currentCards.push(el);
        });
      } else {
        app.startButton.hide();
        targetNode.textContent = ('Nothing found. Try another category.');
      }
    };

    const resetActive = () => {
      if (app.game && !app.game.finished) {
        app.game.finish();
        app.error.node.play();
      }
      const c = 'menu_button';
      this.main.setClass(c);
      this.random.setClass(c);
      this.statistic.setClass(c);
      this.diffucult.setClass(c);
      this.categories.forEach((it) => { it.setClass(c); });
      app.resetButton.hide();
      app.difficultButton.hide();
      if (app.mode) {
        app.startButton.show();
      } else {
        app.startButton.hide();
      }
      app.modeButton.show();
    };


    this.main = new Button(parentNode, 'menu_button', 'main');

    this.categories = [];
    base.getCategories().forEach((it, i) => {
      var el = new Button(parentNode, 'menu_button', it, function () {
        that.currentMenuButton = this;
        window.location.hash = '_'+i;
        app.categoryName.textContent = `Category: ${that.categories[i].node.textContent}`;
        app.categoryDesc.textContent = 'Click start play button to test youself';
        resetActive();
        this.setClass('menu_button menu_button_active');
        that.burg.click();
        drawCards(targetNode, base.selectCategory(it));
      });
      this.categories.push(el);
    });

    this.random = new Button(parentNode, 'menu_button', 'random', function () {
      that.currentMenuButton = this;
      window.location.hash = 'random';
      app.categoryName.textContent = 'Random words';
      app.categoryDesc.textContent = 'There are a few random words from all categories. Click start play button to test youself';
      resetActive();
      this.setClass('menu_button menu_button_active');
      that.burg.click();
      drawCards(targetNode, base.getRandomized().getFirstN(8));
    });

    this.diffucult = new Button(parentNode, 'menu_button', 'difficult', function () {
      that.currentMenuButton = this;
      window.location.hash = 'difficult';
      app.categoryName.textContent = 'Difficult words';
      app.categoryDesc.textContent = 'There are most difficult words from last games. Click start play button to test youself';
      resetActive();
      this.setClass('menu_button menu_button_active');
      that.burg.click();
      drawCards(targetNode, base
        .getFiltered((it) => it.getPercent() > 0)
        .getSorted((a, b) => b.getPercent() - a.getPercent())
        .getFirstN(8));
    });

    this.statistic = new Button(parentNode, 'menu_button', 'statistic', function () {
      that.currentMenuButton = this;
      window.location.hash = 'statistic';
      app.categoryName.textContent = 'Statistics';
      app.categoryDesc.textContent = 'Click table header to sort';
      resetActive();
      app.startButton.hide();
      app.modeButton.hide();
      app.resetButton.show();
      app.difficultButton.show();
      this.setClass('menu_button menu_button_active');
      that.burg.click();
      targetNode.innerHTML = '';
      new Statistic(targetNode, base);
    });


    const mainClick = function () {
      that.currentMenuButton = this;
      window.location.hash = '';
      app.categoryName.textContent = 'Main page';
      app.categoryDesc.textContent = 'Select a category or click play here to play with random words from all categories';
      resetActive();
      this.setClass('menu_button menu_button_active');
      that.burg.click();
      drawCards(targetNode, base.getAnyFromCategory(), (i) => () => {
        that.burg.click();
        that.categories[i].click();
      });
    };
    this.main.setClick(mainClick);
  }

  redraw(mode) {
    console.log(this.currentCards);
    this.currentCards.forEach((it) => {
      it.setMode(mode);
    });
    if (this.app.mode) {
      this.app.startButton.show();
    } else {
      this.app.startButton.hide();
    }
  }

  hide() {
    this.styleAnimate(`
      transform: scale(0);
    `);
  }

  show() {
    this.styleAnimate(`
      transform: scale(1);
    `);
  }
}

module.exports = Menu;
