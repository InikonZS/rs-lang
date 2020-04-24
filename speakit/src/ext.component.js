const Control = require('./control.component.js');
const Button = require('./button.component.js');
const Utils = require('./utils.js');

class Ext extends Control{
  constructor(parentNode){
    super(parentNode, 'div', 'extcard_wrapper');
    this.translationControl = new Control(this.node, 'div', 'extcard_item');
    this.imgWrapperControl = new Control(this.node, 'div', 'extcard_item');
    this.imgControl = new Control(this.node, 'img');
    this.meaningControl = new Control(this.node, 'div', 'extcard_item');
    this.exampleControl = new Control(this.node, 'div', 'extcard_item');
  }

  refreshTranslation(word){
    Utils.sendGetRequest(Utils.getTranslateRequestURL(word), 
      (res)=>{
        this.translationControl.node.textContent = res.text[0];
      },
      ()=>{
        this.translationControl.node.textContent = Utils.defaultRejectMessage;
      }
    );  
  }

  refresh(cardData){
    this.refreshTranslation(cardData.word);
    this.imgControl.node.src = Utils.getMediaURL(cardData.image);
    this.meaningControl.node.innerHTML = cardData.textMeaning;
    this.exampleControl.node.innerHTML = `For example: ${cardData.textExample}`;
  }
}

module.exports = Ext;