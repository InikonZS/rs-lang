const Control = require('./control.component.js');
const Button = require('./button.component.js');

class Group extends Control {
  constructor(parentNode, className, buttonClassName) {
    super(parentNode, 'div', className, '');
    this.buttonClassName = buttonClassName;
    this.currentButton;
    this.buttons = [];
  }

  addButton (caption, click){
    let group = this;
    let el = new Button(this.node, this.buttonClassName, caption, true, function (){
      group.currentButton = el;
      group.buttons.forEach((it)=>{
        if (it !== this){
          it.untoggle();
        } else {
          it.toggle();
        }
      });
      if (click){
        click();
      }
    })
    this.buttons.push(el);
    return el;
  }
  
}

module.exports = Group;