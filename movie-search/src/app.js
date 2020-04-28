const Control = require('./control.component.js');
const Button = require('./button.component.js');
const Card = require('./card.component.js');
const Group = require('./radio-group.component.js');
const Slider = require('./slider.component.js');
const Utils = require('./utils.js');

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
    this.refreshResults();
  /*  for (let i=0; i<20; i++){
      let slide = this.sld.addSlide('');
      let el = new Control(slide.node, 'div', '', 'Slide '+i);
      el.node.style =`background-color: rgb(${Math.trunc(Math.random()*155+100)},${Math.trunc(Math.random()*155+100)},${Math.trunc(Math.random()*155+100)}); width:100%; height:100%; display:flex; justify-content:center; align-items:center; font-size:48pt`;
    }
    if (this.sld.slides.length){
      this.sld.bottomControl.buttons[0].click();
    }*/
    new Control(dashBoardNode,'div','','some text after slider');
  }

  refreshResults(){
    Utils.sendGetRequest(Utils.getMediaURL('dream', 2),(res)=>{
      console.log(res);
      res.Search.forEach((it)=>{
        let slide = this.sld.addSlide('');
        let el = new Card(slide.node);
        el.refresh({image: it.Poster, year: it.Year, title: it.Title});
        //let el = new Control(slide.node, 'div', '', 'Slide '+i);
        //el.node.style =`background-color: rgb(${Math.trunc(Math.random()*155+100)},${Math.trunc(Math.random()*155+100)},${Math.trunc(Math.random()*155+100)}); width:100%; height:100%; display:flex; justify-content:center; align-items:center; font-size:48pt`;
        

        //it.poster
      });
      if (this.sld.slides.length && this.sld.currentPosition===-1){
        this.sld.bottomControl.buttons[0].click();
      }
    })
  }
}

module.exports = App;