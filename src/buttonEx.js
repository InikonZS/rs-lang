const Button = require('./button.js');
const Control = require('./control.js');

class ButtonEx extends Control{
  constructor(parentNode, className, textContent, togle, click){
    super(parentNode, 'div', className, textContent);
    this.state = false;
    this.disabled = false;
    this.checkClicked = false;
    this.togle = togle;
    this.basicClass = className;

    this.setClick(click);
  }

  setClick(click) {
    if (click) {
      this.click = click;

      this.node.addEventListener('mousedown', (e) => {
        e.preventDefault();
        if (!this.disabled && (e.buttons == 1)) {
          this.checkClicked = true;
          this.setClass(this.basicClass+' '+this.basicClass+'__down');
        }
      });
 
      this.node.addEventListener('mouseout', (e) => {
        if (!this.disabled) {
          this.checkClicked = false;
          if (this.state){
            this.setClass(this.basicClass+' '+this.basicClass+'__toggled');
          } else {
            this.setClass(this.basicClass);
          }
        }
      });

      this.node.addEventListener('mouseover', (e) => {
        if (!this.disabled) {
          if (!this.state){
            this.setClass(this.basicClass+' '+this.basicClass+'__hover');
          } else {
            this.setClass(this.basicClass+' '+this.basicClass+'__dover');
          }
        }
      });

      this.node.addEventListener('mouseup', (e) => {
        e.preventDefault();
        if (!this.disabled) {
          if (this.checkClicked){
            this.changeState();
            this.click();
          }
          this.checkClicked = false;
          if (!this.state){
            this.setClass(this.basicClass+' '+this.basicClass+'__hover');
          } else {
            this.setClass(this.basicClass+' '+this.basicClass+'__dover');
          }
        }
      });

    }
  }

  disable() {
    this.disabled = true;
  }

  changeState() {
    if (this.togle){
     this.state = !this.state;
    }
  }

}
module.exports = ButtonEx;