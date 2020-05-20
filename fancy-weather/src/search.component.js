const Control = require('./control.component.js');
const Button = require('./button.component.js');

class Search extends Control{
  constructor (parentNode){
    super(parentNode, 'div', 'radio_group');
    this.searchEdit = new Control(this.node, 'input');
    this.searchEdit.node.addEventListener('keyup', (e) => {
      e.preventDefault();
      if (e.code == 'Enter') {
        this.submitButton.click();
      }
    });

    this.searchEdit.node.type = 'text';

    this.onSubmit;

    this.submitButton = new Button(this.node, 'basic_button', 'search', false, ()=>{
      this.submit();  
    });
  }

  submit(){
    if (this.onSubmit){
      this.onSubmit(this.searchEdit.node.value);
    }
  }

  reset(){
    this.searchEdit.node.value='';
  }
}

module.exports = Search;