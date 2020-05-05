const Control = require('./control.component.js');
const Button = require('./button.component.js');
const Utils = require('./utils.js');

class Card extends Control{
  constructor(parentNode){
    super(parentNode, 'div', 'extcard_wrapper');
    this.titleControl = new Control(this.node, 'div', 'extcard_item extcard_title');
    this.imgWrapperControl = new Control(this.node, 'div', 'extcard_item img_wrapper');
    this.imgControl = new Control(this.imgWrapperControl.node, 'img', 'ext_img');
    this.yearControl = new Control(this.node, 'div', 'extcard_item');
    this.ratingControl = new Control(this.node, 'div', 'extcard_item');
  }

  refreshTranslation(word){
    let translate;
    Utils.sendGetRequest(Utils.getTranslateRequestURL(word), 
      (res)=>{
        translate = res.text[0];
        this.translationControl.node.textContent = translate;
      },
      ()=>{
        translate = Utils.defaultRejectMessage;
        this.translationControl.node.textContent = translate;
      }
    );  
  }

  refresh(cardData){
    this.titleControl.node.textContent = cardData.title;
    this.imgControl.node.src = cardData.image;
    this.yearControl.node.innerHTML = cardData.year;
    this.ratingControl.node.textContent = 'Rating: '+cardData.rating;
    //this.exampleControl.node.innerHTML = `For example: ${cardData.textExample}`;
  }
}

module.exports = Card;