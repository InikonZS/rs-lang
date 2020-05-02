const Control = require('./control.component.js');
const Button = require('./button.component.js');
const Card = require('./card.component.js');
const Group = require('./radio-group.component.js');
const Slider = require('./slider.component.js');
const Search = require('./search.component.js');
const Utils = require('./utils.js');

class App{
  constructor(dashBoardNode, searchNode){
    const app=this;
   /* let sel = new Control(dashBoardNode, 'div', 'levels_wrapper', 'no-selected');
    let gr = new Group(dashBoardNode, 'levels_wrapper', 'select_button');
    for (let i=0; i<5; i++){
      gr.addButton('bt'+i, function(){
        sel.node.textContent = gr.currentButton.node.textContent + ' ' + i;
      });
    }*/
    
    this.searchElement = new Search(this, searchNode, (request)=>{
      this.currentQuery=request;
      this.currentPage=1;
      this.sld.clear();
      app.refreshResults(this.currentQuery, app.currentPage);
    });


    this.currentPage = 1;
    this.currentQuery = 'dream';
    let rightMaxHandler = function(){
      app.currentPage++;
      console.log('page '+ app.currentPage);
      app.refreshResults(this.currentQuery, app.currentPage);
    }
    this.sld = new Slider(dashBoardNode, 'slider_wrapper', 'slider_slide', false, rightMaxHandler);
    
    this.refreshResults(this.currentQuery, 1);
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

  refreshResults(query = 'dream', page = 1){
    Utils.sendGetRequest(Utils.getMediaURL(query, page),(res)=>{
      res.Search.forEach((it)=>{ 
        this.getMoreFilmData(it);
      });
    })
  }
 /* refreshResults(){
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
  }*/


  getMoreFilmData(mainData){
    Utils.sendGetRequest(Utils.getMediaInfoURL(mainData.imdbID),(res)=>{
      this.addCards(mainData, res); 
    });
  }
  
  addCards(mainData, secondaryData){
    console.log(secondaryData);
    let slide = this.sld.addSlide('');
    
    let el = new Card(slide.node);
    el.refresh({image: mainData.Poster, year: mainData.Year, title: mainData.Title, rating: secondaryData.imdbRating});
    
    if (this.sld.slides.length && this.sld.currentPosition===-1){
      this.sld.bottomControl.buttons[0].click();
    } 
    this.sld.setDragOffset();
      
  }
}



module.exports = App;