const Control = require('./control.component.js');
const Button = require('./button.component.js');
const Group = require('./radio-group.component.js');
const Slider = require('./slider.component.js');

class App{
  constructor(dashBoardNode){
    const app=this;
    let sel = new Control(dashBoardNode, 'div', 'levels_wrapper', 'no-selected');
    let gr = new Group(dashBoardNode, 'levels_wrapper', 'select_button');
    for (let i=0; i<5; i++){
      gr.addButton('bt'+i, function(){
        sel.node.textContent = gr.currentButton.node.textContent + ' ' + i;
      });
    }

    this.sld = new Slider(dashBoardNode, 'slider_wrapper', 'slider_slide');
    for (let i=0; i<15; i++){
      let slide = this.sld.addSlide('');
      let el = new Control(slide.node, 'div', '', 'Slide '+i);
      el.node.style =`background-color: rgb(${Math.trunc(Math.random()*155+100)},${Math.trunc(Math.random()*155+100)},${Math.trunc(Math.random()*155+100)}); width:100%; height:100%; display:flex; justify-content:center; align-items:center; font-size:48pt`;
    }
    if (this.sld.slides.length){
      this.sld.bottomControl.buttons[0].click();
    }
    new Control(dashBoardNode,'div','','some text after slider');
  }
}

module.exports = App;