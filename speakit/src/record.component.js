const Control = require('./control.component.js');
const Button = require('./button.component.js');
const Utils = require('./utils.js');

class Record extends Control{
  constructor (parentNode, record, click){
    super(parentNode,'div', 'dash_item', '', click);
    //this.isMarked=false;
    this.record = record;
    //this.audioControl = new Control(this.node, 'audio');
    //this.audioControl.node.src = Utils.getMediaURL(cardData.audio);
    //this.audioPlayButton = new Button(this.node,'listen basic_button', '', false, ()=>{
    //  this.audioControl.node.play();
    //});
    
    this.textWrapper = new Control(this.node, 'div');
    this.wordControl = new Control(this.textWrapper.node, 'div', '', record.word);
    this.countControl = new Control(this.textWrapper.node, 'div', '', record.count.toString());

    //this.translationControl = new Control(this.node, 'div', '', 'translation...');
    //this.refreshTranslation(cardData.word);
    
    //this.imageControl = new Control(this.node, 'img');
    //this.imageControl.node.src = getMediaURL(cardData.image);

    
  }
}

module.exports = Record;