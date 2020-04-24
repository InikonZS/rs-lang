class Control {
  // Hard DOM functions
  constructor(parentNode, tagName, className, textContent, click) {
    const classNameV = className || '';
    const textContentV = textContent || '';
    const tagNameV = tagName || 'div';
    this.isDisabled=false;
    this.isHidden=false;

    this.node = document.createElement(tagNameV);
    this.render(classNameV, textContentV);
    parentNode.appendChild(this.node);  

    if (click) {
      this.click = click;
      this.node.addEventListener('click', (e) => {
        if (!this.isDisabled) {
          this.click();
        }
      });
    }
  }

  clear() {
    this.node.innerHTML = '';
  }

  // style and content functions
  render(className, textContent) {
    this.node.className = className;
    this.node.textContent = textContent;
  }

  hide() {
    this.isHidden=true;
    this.node.style = 'display:none';
  }

  show() {
    this.isHidden=false;
    this.node.style = '';
  }

  animate(animationCssClass) {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        this.node.className = animationCssClass;
      });
    });
  }
  
}

module.exports = Control;