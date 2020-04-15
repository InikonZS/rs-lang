const Control = require('./control.js');
const Button = require('./button.js');
const Base = require('./base.js');

class Statistic extends Control {
  constructor(parentNode, base) {
    super(parentNode, 'table');
    this.rows = [];
    const that = this;
    this.base = base.clone();
    const makeSorted = function (comparator) {
      const baseWords = that.base.words.sort(comparator);

      const tr = new Control(that.node, 'tr');
      let bf;
      bf = new Control(tr.node, 'td');
      tr.category = new Button(bf.node, '', 'category', () => {
        that.drawSorted((a, b) => a.category > b.category);
      });

      bf = new Control(tr.node, 'td');
      tr.word = new Button(bf.node, '', 'word', () => {
        that.drawSorted((a, b) => a.word > b.word);
      });

      bf = new Control(tr.node, 'td');
      tr.translation = new Button(bf.node, '', 'translation', () => {
        that.drawSorted((a, b) => a.translation > b.translation);
      });

      bf = new Control(tr.node, 'td');
      tr.statUp = new Button(bf.node, '', 'statUp', () => {
        that.drawSorted((a, b) => b.statUp - a.statUp);
      });

      bf = new Control(tr.node, 'td');
      tr.statDown = new Button(bf.node, '', 'statDown', () => {
        that.drawSorted((a, b) => b.statDown - a.statDown);
      });

      baseWords.forEach((it) => {
        const tr = new Control(that.node, 'tr');
        tr.category = new Control(tr.node, 'td', '', it.category);
        tr.word = new Control(tr.node, 'td', '', it.word);
        tr.translation = new Control(tr.node, 'td', '', it.translation);
        tr.statUp = new Control(tr.node, 'td', '', it.statUp.toString());
        tr.statDown = new Control(tr.node, 'td', '', it.statDown.toString());
        that.rows.push(tr);
      });
    };

    makeSorted((a, b) => b.statDown - a.statDown);
  }

  drawSorted(comparator) {
    const baseWords = this.base.words.sort(comparator);

    this.rows.forEach((it, i) => {
      // let tr = new Control(this.node, 'tr');
      it.category.render('', baseWords[i].category);
      it.word.render('', baseWords[i].word);
      it.translation.render('', baseWords[i].translation);
      it.statUp.render('', baseWords[i].statUp);
      it.statDown.render('', baseWords[i].statDown);
    });
  }
}

module.exports = Statistic;
