const Control = require('./control.component.js');
const Button = require('./button.component.js');
const Utils = require('./utils.js');

class Card extends Control {
  constructor(parentNode) {
    super(parentNode, 'div', 'extcard_wrapper');
    this.node.style = 'width:100%';
    this.node.style = '';
    this.titleControl = new Control(this.node, 'div', 'extcard_item extcard_title');
    // https://www.imdb.com/title/tt8398600/
    this.titleLink = new Control(this.titleControl.node, 'a', 'extcard_item extcard_title');
    this.imgWrapperControl = new Control(this.node, 'div', 'extcard_item img_wrapper');
    this.imgControl = new Control(this.imgWrapperControl.node, 'img', 'ext_img');
    this.imgControl.node.onerror = () => {
      this.imgControl.node.src = 'assets/no-poster.jpg';
    };
    this.yearControl = new Control(this.node, 'div', 'extcard_item');
    this.ratingControl = new Control(this.node, 'div', 'extcard_item');
  }

  refreshTranslation(word) {
    let translate;
    Utils.sendGetRequest(Utils.getTranslateRequestURL(word),
      (res) => {
        translate = res.text[0];
        this.translationControl.node.textContent = translate;
      },
      () => {
        translate = Utils.defaultRejectMessage;
        this.translationControl.node.textContent = translate;
      });
  }

  refresh(cardData) {
    this.titleLink.node.textContent = cardData.title;
    this.titleLink.node.href = `https://www.imdb.com/title/${cardData.id}/`;
    this.titleLink.node.target = '_blank';
    this.imgControl.node.src = cardData.image;
    this.yearControl.node.innerHTML = cardData.year;
    this.ratingControl.node.textContent = `Rating: ${cardData.rating}`;
  }
}

module.exports = Card;
