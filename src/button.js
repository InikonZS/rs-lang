const Control = require('./control.js');

class Button extends Control {
  constructor(parentNode, className, textContent, click) {
    super(parentNode, 'div', className, textContent);
    if (click) {
      this.click = click;
      this.node.addEventListener('click', () => {
        this.click();
      });
    }
  }
}

module.exports = Button;
