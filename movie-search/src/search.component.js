const Control = require('./control.component.js');
const Button = require('./button.component.js');
const Keyboard = require('./keyboard.component.js');

class Search {
  constructor(app, parentNode, onSubmit){

    this.searchWrapper = new Control(parentNode, 'div', 'search_inner');
    
    this.searchEdit = new Control(this.searchWrapper.node, 'input', 'search_item search_edit', '',);
    this.searchEdit.node.addEventListener('keyup', (e)=>{
      e.preventDefault();
      if (e.code=="Enter"){
        this.searchButton.click();
      }
    });
    this.searchEdit.node.placeholder ="search request...";
    this.searchEdit.node.type = 'text';
    this.searchClearButton = new Button(this.searchWrapper.node, 'clear_im search_item search_clear', '', false,()=>{
      this.searchEdit.node.value='';
    });
    this.searchKeyboardButton = new Button(this.searchWrapper.node, 'keyboard_im search_item search_keyboard', '', true, ()=>{
      if (this.searchKeyboardButton.isToggled){
        this.keyboard.show();
      } else {
        this.keyboard.hide();
      }
    });
    this.searchButton = new Button(this.searchWrapper.node, 'search_im search_item search_submit', 'search', false,()=>{
      this.searchButton.node.textContent = 'wait...';
      this.searchButton.disable();
      onSubmit(this.searchEdit.node.value);  
    });

    this.keyboard = new Keyboard (parentNode, this.searchEdit.node, false, ()=>{
      this.searchButton.click();  
    });
      
    this.keyboard.hide();
    this.searchMessage = new Control(parentNode, 'div', '', 'search results');
  }
}

module.exports = Search;