const Control = require('./control.component.js');
const Button = require('./button.component.js');

class Search extends Control{
  constructor (parentNode){
    super(parentNode, 'div');
    this.searchEdit = new Control(parentNode, 'input');
    this.searchEdit.node.type = 'text';

    this.onSubmit;

    this.submitButton = new Button(this.node, '', 'search', false, ()=>{
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