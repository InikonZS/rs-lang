const Control = require('./control.js');

class Button extends Control {
  constructor(parentNode, className, textContent, click) {
    super(parentNode, 'div', className, textContent);
    this.state = false;
    this.disabled = false;
 /*   if (click) {
      this.click = click;
      this.node.addEventListener('click', (e) => {
        this.click();
      });
    }*/
    this.setClick(click);
  }

  changeState() {
    this.state = !this.state;
  }

  setClick (click){
    if (click) {
      this.click = click;
      this.node.addEventListener('click', (e) => {
        if (!this.disabled){
          this.click();
        }
      });
    }  
  }

  disable (){
    this.disabled = true;
  }
}

module.exports = Button;
