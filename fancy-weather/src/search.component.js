const Control = require('./control.component.js');
const Button = require('./button.component.js');

class Search extends Control {
  constructor(parentNode) {
    super(parentNode, 'div', 'search_wrapper');
    this.searchEdit = new Control(this.node, 'input', 'search_item search_edit');
    this.searchEdit.node.placeholder = 'city name';
    this.searchEdit.node.addEventListener('keyup', (e) => {
      e.preventDefault();
      if (e.code == 'Enter') {
        this.submitButton.click();
      }
    });

    this.searchEdit.node.type = 'text';

    this.onSubmit;
    this.onMic;

    this.micButton = new Button(this.node, 'basic_ico micro_im basic_button', '', false, () => {
      this.mic();
    });

    this.submitButton = new Button(this.node, 'left_ico search_im ico_button', 'search', false, () => {
      this.submit();
    });
  }

  submit() {
    if (this.onSubmit) {
      this.onSubmit(this.searchEdit.node.value);
    }
  }

  mic() {
    if (this.onSubmit) {
      this.onMic();
    }
  }

  reset() {
    this.searchEdit.node.value = '';
  }
}

module.exports = Search;
