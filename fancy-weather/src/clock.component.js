const Control = require('./control.component.js');
const Button = require('./button.component.js');

class Clock extends Control{
  constructor (parentNode){
    super(parentNode, 'div', 'radio_group');
    this.dateControl = new Control(this.node, 'div');
    this.timeControl = new Control(this.node, 'div');

    setInterval(()=>{
      let date = new Date(Date.now());
      this.dateControl.node.textContent = date.toLocaleDateString();
      this.timeControl.node.textContent = date.toLocaleTimeString();
    }, 1000);
  }
}


module.exports = Clock;