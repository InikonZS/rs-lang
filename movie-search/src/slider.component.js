const Control = require('./control.component.js');
const Button = require('./button.component.js');
const Group = require('./radio-group.component.js');

class Slider extends Control {
  constructor(parentNode, className, slideClassName) {
    super(parentNode, 'div', className, '');
    let slider = this;
    this.slideClassName = slideClassName;
    this.currentPosition = -1;
    this.slides = [];
    this.slidesPerPage=4;

    this.horizontalWrapper = new Control(this.node, 'div', 'slider_horizontal_wrapper');

    this.zwLeftButtonWrapper = new Control(this.horizontalWrapper.node, 'div', 'slider_side_zeros slider_side_zeros_left');
    this.leftButtonWrapper = new Control(this.zwLeftButtonWrapper.node, 'div', 'slider_sides');
    this.leftButton = new Button(this.leftButtonWrapper.node, 'select_button', '<', false, function(){
      let pos = slider.currentPosition-1;
      if ((pos>=0) && (pos<= (slider.getMaxPosition()))){
        let nextButton = slider.bottomControl.buttons[pos];
        if (nextButton){
          nextButton.click();
        }
      }
    });
    this.slideArea = new Control(this.horizontalWrapper.node, 'div', 'slider_area');
    this.zwRightButtonWrapper = new Control(this.horizontalWrapper.node, 'div', 'slider_side_zeros slider_side_zeros_right');
    this.rightButtonWrapper = new Control(this.zwRightButtonWrapper.node, 'div', 'slider_sides');
    this.rightButton = new Button(this.rightButtonWrapper.node, 'select_button', '>', false, function(){
      let pos = slider.currentPosition+1;
      if ((pos>=0) && (pos<= (slider.getMaxPosition()))){
        let nextButton = slider.bottomControl.buttons[pos];
        if (nextButton){
          nextButton.click();
        }
      }
    });

    this.bottomControlWrapper = new Control(this.node, 'div', 'slider_horizontal_wrapper');
    this.bottomControl = new Group(this.bottomControlWrapper.node,'slider_bottom_control', 'select_button');
  }

  addSlide (caption){
    let slider = this;
    let el = new Control(this.slideArea.node, 'div', this.slideClassName, caption);
    this.slides.push(el); 
    let slideIndex = this.slides.length-1;
    let button = this.bottomControl.addButton((slideIndex).toString(),function(){
      slider.setPosition(slideIndex);
    });
    button.hide();

    if (this.slides.length>=this.slidesPerPage){
      this.bottomControl.buttons[this.bottomControl.buttons.length-this.slidesPerPage].show();
    }
    
    this.slides.forEach((it, i)=>{
      it.node.style = `width:${slider.getSlideWidth()}%; transform: translateX(${100*(i-this.currentPosition-1)}%)`; 
    });
    return el;
  }

  getSlideWidth(){
    let width = 100 / Math.min(this.slidesPerPage, (this.slides.length||1));
    return width;
  }

  getMaxPosition(){
    return this.slides.length - this.slidesPerPage;
  }

  setPosition(pos){
   // if ((pos>=0) && (pos<= (this.getMaxPosition()))){
      console.log('fdsfs');
      this.currentPosition = pos;
      if (this.slides[pos]){
        this.slides.forEach((it, i)=>{
         /* if (i<pos){
            this.slides[i].animate(false, `transform: translateX(-100%)`);  
          }
          if (i===pos){
            this.slides[i].animate(false, 'transform: translateX(0%)');  
          }
          if (i>pos){
            this.slides[i].animate(false, `transform: translateX(100%)`);  
          }*/
          this.slides[i].animate(false, `width:${this.getSlideWidth()}%; transform: translateX(${100*(i-pos)}%)`);
        });
      }
      return true;
  //  } else {
   //   return false;
   // }
  }
}


module.exports = Slider;