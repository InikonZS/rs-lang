const Control = require('./control.js');
const Button = require('./button.js');

class Card extends Button{
  constructor (parentNode, baseRecord, click){
    super(parentNode, '', '', click);
    new Control(this.node, 'div', '',baseRecord.word);
    let im = new Control(this.node, 'img', '', '');
   // im.node.src = 'assets/'+baseRecord.imageSrc;
  }
}

module.exports = Card;