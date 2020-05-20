const Control = require('./control.component.js');
const Button = require('./button.component.js');
const RadioGroup = require('./radio-group.component.js');

class Menu extends Control{
  constructor (parentNode){
    super(parentNode, 'div', 'radio_group');

    let langs = ['eng', 'ru', 'bel'];
    let units = ['F', 'C', 'K'];

    this.state = {};
    this.refreshButton = new Button(this.node, 'basic_button', 'Refresh', false, ()=>{
      this.refresh();   
    });

    this.langSelect = new RadioGroup(this.node, 'radio_group', 'basic_button');
    langs.forEach((it, i)=>{
      this.langSelect.addButton(it,()=>{
        this.state.lang = it;
        this.state.langIndex = i;
        this.refresh();
      });
    });

    this.unitSelect = new RadioGroup(this.node, 'radio_group', 'basic_button');
    units.forEach((it, i)=>{
      this.unitSelect.addButton(it,()=>{
        this.state.unit = it;
        this.state.unitIndex = i;
        this.refresh();
      });
    });
    
  }

  refresh(){
    if (this.onChange){
      this.onChange(this.state);
    }
  }
}

module.exports = Menu;