const Control = require('./control.component.js');
const Button = require('./button.component.js');
const Utils = require('./utils.js');

class Card extends Control{
  constructor (parentNode, cardData, click){
    super(parentNode,'div', 'dash_item', '', click);
    this.isMarked=false;
    this.cardData = cardData;
    this.audioControl = new Control(this.node, 'audio');
    this.audioControl.node.src = Utils.getMediaURL(cardData.audio);
    this.audioPlayButton = new Button(this.node,'basic_button listen', '', false, ()=>{
      this.audioControl.node.play();
    });
    
    this.textWrapper = new Control(this.node, 'div');
    this.wordControl = new Control(this.textWrapper.node, 'div', '', cardData.word);
    this.transcriptionControl = new Control(this.textWrapper.node, 'div', '', cardData.transcription);

    //this.translationControl = new Control(this.node, 'div', '', 'translation...');
    //this.refreshTranslation(cardData.word);
    
    //this.imageControl = new Control(this.node, 'img');
    //this.imageControl.node.src = getMediaURL(cardData.image);

    
  }
  setPlayMode(){
    this.audioPlayButton.hide();
  }

  setTrainMode(){
    this.audioPlayButton.show();
    this.unmark();
  }

  mark(){
    this.isMarked=true;
    this.node.classList.add('card_correct');
  }

  unmark(){
    this.isMarked=false;
    this.node.className=('dash_item');
  }
}

module.exports = Card;