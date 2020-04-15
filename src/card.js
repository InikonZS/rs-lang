const Control = require('./control.js');
const Button = require('./button.js');

class Card extends Button {
  constructor(parentNode, baseRecord, click) {
    super(parentNode, 'dash_item', '', click);
    this.baseRecord = baseRecord;

    const imgURL = `assets/${this.baseRecord.imageSrc}`;
    this.aud = new Control(this.node, 'audio', '', '');
    this.aud.node.src = `assets/${this.baseRecord.audioSrc}`;

    this.sideB = new Control(this.node, 'div', 'card_side', '');
    this.sideB.name = new Control(this.sideB.node, 'div', 'card_name', this.baseRecord.translation);
    const imgWrapperB = new Control(this.sideB.node, 'div', 'card_img', '');
    imgWrapperB.node.style = 'transform: rotateY(180deg)';
    this.sideB.img = new Control(imgWrapperB.node, 'img', '', '');
    this.sideB.img.node.src = imgURL;
    this.sideB.node.style = `z-index: 1; transform: perspective(500px) rotateY(${180}deg)`;

    this.sideA = new Control(this.node, 'div', 'card_side card_side_a', '');
    this.sideA.name = new Control(this.sideA.node, 'div', 'card_name', this.baseRecord.word);
    const imgWrapperA = new Control(this.sideA.node, 'div', 'card_img', '');
    this.sideA.img = new Control(imgWrapperA.node, 'img', '', '');
    this.sideA.img.node.src = imgURL;
    this.sideA.cardMenu = new Control(this.sideA.node, 'div', 'card_menu', '');

    this.rotateButton = new Button(this.sideA.cardMenu.node, 'card_button', 'rotate', (event) => {
      this.rotate(180);
    });

    this.node.addEventListener('mouseleave', () => {
      if (!this.disabled) {
        this.rotate(0);
      }
    });

    this.listenButton = new Button(this.sideA.cardMenu.node, 'card_button', 'listen', (event) => {
      this.aud.node.play();
    });

    this.rotate(0);
  }

  rotate(deg) {
    this.sideA.node.style = `z-index: 1; transform: perspective(500px) rotateY(${deg}deg)`;
    this.sideB.node.style = `z-index: 1; transform: perspective(500px) rotateY(${180 + deg}deg)`;
  }

  setPlayMode() {
    this.sideB.hide();
    this.sideA.name.hide();
    this.sideA.cardMenu.hide();
  }

  setTrainMode() {
    this.sideB.show();
    this.sideA.name.show();
    this.sideA.cardMenu.show();
    this.rotate(0);
  }

  setCategoryMode() {
    this.sideB.hide();
    this.sideA.name.node.textContent = this.baseRecord.category;
    this.sideA.cardMenu.hide();
  }

  setMode(mode) {
    if (mode) {
      this.setPlayMode();
    } else {
      this.setTrainMode();
    }
  }

  disable() {
    super.disable();
    // console.log('dis');
    this.sideA.node.style = 'opacity:50%';
  }
}


module.exports = Card;
