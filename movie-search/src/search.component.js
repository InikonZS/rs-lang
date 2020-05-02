const Control = require('./control.component.js');
const Button = require('./button.component.js');

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
    this.searchClearButton = new Button(this.searchWrapper.node, 'search_item search_clear', 'X', false,()=>{
      this.searchEdit.node.value='';
    });
    this.searchKeyboardButton = new Button(this.searchWrapper.node, 'search_item search_keyboard', 'kbd', false, ()=>{});
    this.searchButton = new Button(this.searchWrapper.node, 'search_item search_submit', 'search', false,()=>{
      onSubmit(this.searchEdit.node.value);  
    });
  }
}

module.exports = Search;