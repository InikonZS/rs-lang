const Control = require('./control.component.js');
const Button = require('./button.component.js');
const Group = require('./radio-group.component.js');


class Select extends Control {
  constructor(parentNode, className, listClassName, mainButtonClassName, buttonClassName) {
    super(parentNode, 'div', className, '');
    this.mainButton = new Button(this.node, mainButtonClassName, '' , true, ()=>{
      if (this.mainButton.isToggled){
        this.selectList.show();  
      } else {
        this.selectList.hide();
      }
    });
    this.selectList = new Group(this.node, listClassName, buttonClassName);
    this.selectList.hide();
  }

  highlight(index){
    this.selectList.highlight(index);
    this.mainButton.node.textContent = this.selectList.buttons[index].node.textContent;
  }
}

module.exports = Select;
