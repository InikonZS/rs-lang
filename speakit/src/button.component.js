const Control = require('./control.component.js');

class Button extends Control {
  constructor(parentNode, className, textContent, allowToggle, click) {
    super(parentNode, 'div', className, textContent);
    this.isToggled = false;
    this.isDisabled = false;
    this.isDowned = false;
    this.allowToggle = allowToggle;
    this.basicClass = className;

    this.setClick(click);
  }

  setClick(click) {
    if (click) {
      this.click = click;

      this.node.addEventListener('mousedown', (e) => {
        e.preventDefault();
        if (!this.isDisabled && (e.buttons == 1)) {
          this.isDowned = true;
          this.node.className=(`${this.basicClass} ${this.basicClass}__down`);
        }
      });

      this.node.addEventListener('mouseout', (e) => {
        if (!this.isDisabled) {
          this.isDowned = false;
          if (this.isToggled) {
            this.node.className=(`${this.basicClass} ${this.basicClass}__toggled`);
          } else {
            this.node.className=(this.basicClass);
          }
        }
      });

      this.node.addEventListener('mouseover', (e) => {
        if (!this.isDisabled) {
          if (!this.isToggled) {
            this.node.className=(`${this.basicClass} ${this.basicClass}__hover`);
          } else {
            this.node.className=(`${this.basicClass} ${this.basicClass}__dover`);
          }
        }
      });

      this.node.addEventListener('mouseup', (e) => {
        e.preventDefault();
        if (!this.isDisabled) {
          if (this.isDowned) {
            this.changeState();
            this.click();
          }
          this.isDowned = false;
          if (!this.isToggled) {
            this.node.className=(`${this.basicClass} ${this.basicClass}__hover`);
          } else {
            this.node.className=(`${this.basicClass} ${this.basicClass}__dover`);
          }
        }
      });
    }
  }

  disable() {
    this.isDisabled = true;
  }

  enable() {
    this.isDisabled = false;
  }

  changeState() {
    if (this.allowToggle) {
      this.isToggled = !this.isToggled;
    }
  }

}

module.exports = Button;
