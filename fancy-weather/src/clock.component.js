const Control = require('./control.component.js');
const Button = require('./button.component.js');

const monthRu = 'январь февраль март апрель май июнь июль август сентябрь октябрь ноябрь декабрь';
const monthBel = 'студзень люты сакавiк красавiк травень чэрвень лiпень верасень кастрычнiк лiстапад снежань';
const monthEn = 'january febriary march april may june july august september october november december';

const weekRu = 'понедельник вторник среда четверг пятница суббота воскресенье';
const weekBy = 'панядзелак ауторак серада чацвер пятнiца субота нядзеля';
const weekEn = 'monday tuesday wednesday thursday friday saturday sunday';

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