const Control = require('./control.js');

class Button extends Control {
  constructor(parentNode, className, textContent, click) {
    super(parentNode, 'div', className, textContent);
    this.state = false;
    if (click) {
      this.click = click;
      this.node.addEventListener('click', () => {
        this.click();
      });
    }
  }

  changeState() {
    this.state = !this.state;
  }
}

module.exports = Button;
