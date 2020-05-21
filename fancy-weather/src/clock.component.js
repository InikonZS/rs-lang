const Control = require('./control.component.js');
const Button = require('./button.component.js');
const Utils = require('./utils.js');

class Clock extends Control{
  constructor (parentNode, options){
    super(parentNode, 'div', '');
    this.dateControl = new Control(this.node, 'div');
    this.timeControl = new Control(this.node, 'div');
    this.options = options
    setInterval(()=>{
      let date = new Date(Date.now());
      //this.dateControl.node.textContent = date.toLocaleDateString();
      this.timeControl.node.textContent = formatDate(date, this.options)+' '+date.toLocaleTimeString();
    }, 1000);
  }

  setOptions(options){
    this.options = options;
  }
}

function formatDate(date, options){
  if (!options) { return date.toLocaleDateString();}
  let month = Utils.times.month[options.langIndex][date.getMonth()];
  let day = Utils.times.week[options.langIndex][date.getDay()];
  let numDay = date.getDate();
  return `${day} ${numDay} ${month}`;
}


module.exports = Clock;