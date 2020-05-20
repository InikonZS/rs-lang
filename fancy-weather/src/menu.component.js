const Control = require('./control.component.js');
const Button = require('./button.component.js');
const RadioGroup = require('./radio-group.component.js');

class Menu extends Control{
  constructor (parentNode){
    super(parentNode, 'div', 'radio_group');

    let langs = ['eng', 'ru', 'bel'];
    let units = ['C', 'F', 'K'];

    let localOptions = localStorage.getItem('menu_options');
    if (!localOptions){
      this.state = {};
      this.state.lang = langs[0];
      this.state.langIndex = 0;
      this.state.unit = units[0];
      this.state.unitIndex = 0;
    } else {
      this.state = JSON.parse(localOptions);
    }

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
    this.langSelect.highlight(this.state.langIndex);

    this.unitSelect = new RadioGroup(this.node, 'radio_group', 'basic_button');
    units.forEach((it, i)=>{
      this.unitSelect.addButton(it,()=>{
        this.state.unit = it;
        this.state.unitIndex = i;
        this.refresh();
      });
    });
    this.unitSelect.highlight(this.state.unitIndex);
    
  }

  refresh(){
    if (this.onChange){
      localStorage.setItem('menu_options', JSON.stringify(this.state));
      this.onChange(this.state);
    }
  }
}

module.exports = Menu;