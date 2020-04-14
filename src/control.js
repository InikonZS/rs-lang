class Control {
  // Hard DOM functions
  constructor(parentNode, tagName, className, textContent) {
    const classNameV = className || '';
    const textContentV = textContent || '';
    const tagNameV = tagName || 'div';
    this.node = document.createElement(tagNameV);
    this.render(classNameV, textContentV);
    parentNode.appendChild(this.node);
  }

  destroy() {
    this.node.remove();
  }

  clear() {
    this.node.innerHTML = '';
  }

  // style and content functions
  render(className, textContent) {
    this.node.className = className;
    this.node.textContent = textContent;
  }

  setClass(className) {
    this.node.className = className;
  }

  hide() {
    this.node.style = 'display:none';
  }

  show() {
    this.node.style = '';
  }
  // own props functions
}

module.exports = Control;
