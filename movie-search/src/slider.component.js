const Control = require('./control.component.js');
const Button = require('./button.component.js');
const Group = require('./radio-group.component.js');

class Slider extends Control {
  constructor(parentNode, className, slideClassName, onLeftMax, onRightMax) {
    super(parentNode, 'div', className, '');
    const slider = this;
    this.slideClassName = slideClassName;
    this.currentPosition = -1;
    this.slides = [];
    this.slidesPerPage = 4;
    this.onLeftMax = onLeftMax;
    this.onRightMax = onRightMax;
    this.lock = false;

    this.horizontalWrapper = new Control(this.node, 'div', 'slider_horizontal_wrapper');

    this.zwLeftButtonWrapper = new Control(this.horizontalWrapper.node, 'div', 'slider_side_zeros slider_side_zeros_left');
    this.leftButtonWrapper = new Control(this.zwLeftButtonWrapper.node, 'div', 'slider_sides');
    this.leftButton = new Button(this.leftButtonWrapper.node, 'left_im slider_button', '', false, (() => {
      const pos = slider.currentPosition - 1;
      if (pos < (0)) {
        // console.log('left');
        if (slider.onLeftMax) {
          slider.onLeftMax();
        }
      }
      if ((pos >= 0) && (pos <= (slider.getMaxPosition()))) {
        const nextButton = slider.bottomControl.buttons[pos];
        if (nextButton) {
          nextButton.click();
        }
      }
    }));
    this.slideArea = new Control(this.horizontalWrapper.node, 'div', 'slider_area');
    this.zwRightButtonWrapper = new Control(this.horizontalWrapper.node, 'div', 'slider_side_zeros slider_side_zeros_right');
    this.rightButtonWrapper = new Control(this.zwRightButtonWrapper.node, 'div', 'slider_sides');
    this.rightButton = new Button(this.rightButtonWrapper.node, 'right_im slider_button', '', false, (() => {
      const pos = slider.currentPosition + 1;
      if (pos > (slider.getMaxPosition())) {
        // console.log(this.onRightMax);
        if (slider.onRightMax) {
          if (!slider.lock) {
            slider.lock = true;
            slider.onRightMax();
          }
        }
      }

      if ((pos >= 0) && (pos <= (slider.getMaxPosition()))) {
        const nextButton = slider.bottomControl.buttons[pos];
        if (nextButton) {
          nextButton.click();
        }
      }
    }));

    this.bottomControlWrapper = new Control(this.node, 'div', 'slider_horizontal_wrapper');
    this.bottomControl = new Group(this.bottomControlWrapper.node, 'slider_bottom_control', 'page_button');


    this.isDowned = false;
    this.dragStartX = 0;
    this.dragX = 0;
    this.dragXSpeed = 0;
    this.dragLastTime = 0;

    this.node.addEventListener('mousedown', (e) => {
      e.preventDefault();
      if (!this.isDisabled && (e.buttons == 1)) {
        this.isDowned = true;
        const time = Date.now();
        this.dragXSpeed = 0;
        this.dragLastTime = time;

        this.dragX = 0;
        this.dragXSpeed = 0;
        this.dragStartX = e.pageX;
      }
    });

    this.node.addEventListener('touchstart', (e) => {
      //e.preventDefault();
      //this.node.tabIndex=2;
      //this.node.focus();
      if (!this.isDisabled && (e.touches[0])) {
        this.isDowned = true;
        const time = Date.now();
        this.dragXSpeed = 0;
        this.dragLastTime = time;

        this.dragX = 0;
        this.dragXSpeed = 0;
        this.dragStartX = e.touches[0].pageX;
      }
    });

    const uniMoveHandler = (x) => {
      this.dragX = x - this.dragStartX;
      this.setDragOffset();

      const slideWidth = this.slideArea.node.clientWidth / this.slidesPerPage;
      const slidesMoved = Math.round((this.dragX) / slideWidth);
      const nextSlide = this.currentPosition - slidesMoved;
      this.bottomControl.highlight(nextSlide);
      if (nextSlide > this.getMaxPosition()) {
        if (slider.onRightMax) {
          if (!this.lock) {
            this.lock = true;
            slider.onRightMax();
          }
        }
      }
    };

    this.node.addEventListener('mousemove', (e) => {
      e.preventDefault();
      if (!this.isDisabled && (e.buttons == 1) && (this.isDowned)) {
        uniMoveHandler(e.pageX);
      }
    });

    this.node.addEventListener('touchmove', (e) => {
      //e.preventDefault();
      if (!this.isDisabled && (e.touches[0]) && (this.isDowned)) {
        uniMoveHandler(e.touches[0].pageX);
      }
    });

    const uniUpHandler = (x) => {
      const slideWidth = this.slideArea.node.clientWidth / this.slidesPerPage;

      const time = Date.now();
      this.dragXSpeed = (x - this.dragStartX) / (time - this.dragLastTime);

      const slidesMoved = Math.round((this.dragX) / slideWidth);
      let nextSlide = this.currentPosition - slidesMoved;
      if (nextSlide < 0) { nextSlide = 0; }
      if (nextSlide > this.getMaxPosition()) { nextSlide = this.getMaxPosition(); }
      if (this.bottomControl.buttons[nextSlide]) {
        this.bottomControl.buttons[nextSlide].click();
      }
      this.dragX = 0;
      this.isDowned = false;
      this.dragXSpeed = 0;
      this.dragLastTime = 0;
      this.dragStartX = 0;
    };

    const mouseUpHandler = (e) => {
      e.preventDefault();
      uniUpHandler(e.pageX);
    };

    const touchUpHandler = (e) => {
     // e.preventDefault();
      if (this.touchUpEvent){ //for mobile, i dont know how to blur input and hide mobile keyboard
        this.touchUpEvent();
      }
      if (e.touches && e.touches[0]) {
        uniUpHandler(e.touches[0].pageX);
      } else {
        uniUpHandler(this.dragX);
      }
    };

    this.node.addEventListener('mouseup', mouseUpHandler);

    this.node.addEventListener('mouseleave', mouseUpHandler);

    this.node.addEventListener('touchcancel', touchUpHandler);

    this.node.addEventListener('touchend', touchUpHandler);
  }

  addSlide(caption) {
    const slider = this;
    const el = new Control(this.slideArea.node, 'div', this.slideClassName, caption);
    this.slides.push(el);
    const slideIndex = this.slides.length - 1;
    const button = this.bottomControl.addButton((slideIndex).toString(), () => {
      slider.setPosition(slideIndex);
    });
    button.hide();

    if (this.slides.length >= this.slidesPerPage) {
      this.bottomControl.buttons[this.bottomControl.buttons.length - this.slidesPerPage].show();
    }
    this.slides.forEach((it, i) => {
      it.node.style = `
        transition-duration:0ms; 
        width:${this.getSlideWidth()}%; 
        transform: translateX(${100 * (i - this.currentPosition)}%)
      `;
    });
    return el;
  }

  clear() {
    this.currentPosition = -1;
    this.slides = [];
    this.slideArea.node.innerHTML = '';
    this.bottomControl.buttons = [];
    this.bottomControl.node.innerHTML = '';
  }

  getSlideWidth() {
    const width = 100 / Math.min(this.slidesPerPage, (this.slides.length || 1));
    return width;
  }

  getMaxPosition() {
    return Math.max(this.slides.length - this.slidesPerPage, 0);
  }

  setDragOffset() {
    this.bottomControl.buttons.forEach((it, i) => {
      if (i > this.getMaxPosition()) {
        it.hide();
      } else {
        it.show();
      }
    });
    let nextSlide = this.currentPosition;
    if (this.currentPosition > this.getMaxPosition()) {
      nextSlide = this.getMaxPosition();
      this.bottomControl.buttons[nextSlide].click();
    }
    if (!this.dragX) { this.dragX = 0; }
    if (this.currentPosition < 0) { this.currentPosition = 0; }
    this.slides.forEach((it, i) => {
      it.node.style = `
        transition-duration:0ms;
        width:${this.getSlideWidth()}%; 
        transform: translateX(calc(${100 * (i - this.currentPosition)}% + ${this.dragX}px))
      `;
    });
  }

  setPosition(pos) {
    this.currentPosition = pos;
    if (this.slides[pos]) {
      this.slides.forEach((it, i) => {
        this.slides[i].animate(false, `
            width:${this.getSlideWidth()}%; 
            transform: translateX(${100 * (i - pos)}%)
          `);
      });
    }
    return true;
  }
}


module.exports = Slider;
