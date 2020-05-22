const Control = require('./control.component.js');
const Button = require('./button.component.js');
const RadioGroup = require('./radio-group.component.js');
const Select = require('./select.component.js');

class Menu extends Control{
  constructor (parentNode){
    super(parentNode, 'div', 'menu_wrapper');

    let langs = ['eng', 'ru', 'bel'];
    let units = ['C', 'F', 'K'];

    this.state = initOptions();

    this.refreshButton = new Button(this.node, 'basic_ico refresh_im basic_button', '', false, ()=>{
      this.refresh();   
    });

   /* this.langSelect = new RadioGroup(this.node, 'radio_group', 'basic_button');
    langs.forEach((it, i)=>{
      this.langSelect.addButton(it,()=>{
        this.state.lang = it;
        this.state.langIndex = i;
        this.refresh();
      });
    });
    this.langSelect.highlight(this.state.langIndex);*/

    this.langSelect = new Select(this.node, 'select_wrapper', 'drop_menu', 'basic_button', 'basic_button');
    langs.forEach((it, i)=>{
      this.langSelect.selectList.addButton(it,()=>{
        this.state.lang = it;
        this.state.langIndex = i;
        this.langSelect.highlight(this.state.langIndex);
        this.langSelect.mainButton.untoggle();  
        this.langSelect.selectList.hide();
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
      //localStorage.setItem('menu_options', JSON.stringify(this.state));
      saveOptions(this.state);
      this.onChange(this.state);
    }
  }
}

const optionsItemName = 'menu_options';

function initOptions(){
  let state = {};
  let localOptions = localStorage.getItem(optionsItemName);
  if (!localOptions){
    state.lang = langs[0];
    state.langIndex = 0;
    state.unit = units[0];
    state.unitIndex = 0;
  } else {
    state = JSON.parse(localOptions);
  }  
  return state;
}

function saveOptions(state){
  localStorage.setItem(optionsItemName, JSON.stringify(state));
}

module.exports = Menu;