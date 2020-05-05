const Control = require('./control.component.js');
const Button = require('./button.component.js');
const Card = require('./card.component.js');
const Group = require('./radio-group.component.js');
const Slider = require('./slider.component.js');
const Search = require('./search.component.js');
const Utils = require('./utils.js');
const Keyboard = require('./keyboard.component.js');

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
    
    let detectRussian = (msg) =>{
      res = false;
      ru = 'абвгдеёжзиклмопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
      arr = ru.split('');
      for (let i=0; i<msg.length; i+=1){
        if (arr[i].indexOf(msg)!=-1){
          res = true;
          break;
        }
      }
      return res;
    }

    this.searchElement = new Search(this, searchNode, (request)=>{
      this.currentQuery=request;
      this.translate;
      this.currentPage=1;
      this.sld.clear();
      if (detectRussian(this.currentQuery)){
        Utils.sendGetRequest(Utils.getTranslateRequestURL(word), 
        (res)=>{
          this.translate = res.text[0];
          app.refreshResults(this.translate, app.currentPage);
          //todo: translation message
          //this.translationControl.node.textContent = translate;
        },
        ()=>{
          this.translate = undefined;
          //this.translationControl.node.textContent = translate;
        }
      );  
      } else {
        app.refreshResults(this.currentQuery, app.currentPage);
      }
    });


   /* refreshTranslation(word){
      let translate;
      Utils.sendGetRequest(Utils.getTranslateRequestURL(word), 
        (res)=>{
          translate = res.text[0];
          this.translationControl.node.textContent = translate;
        },
        ()=>{
          translate = Utils.defaultRejectMessage;
          this.translationControl.node.textContent = translate;
        }
      );  
    }*/


    //console.log(this.searchElement.searchWrapper.node);


    this.currentPage = 1;
    this.currentQuery = 'dream';
    let rightMaxHandler = function(){
      app.currentPage++;
      console.log('page '+ app.currentPage);
      app.refreshResults(app.currentQuery, app.currentPage);
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
      if (res && res.Search){
        res.Search.forEach((it, i)=>{ 
          last = (i==res.Search.length-1);
          this.getMoreFilmData(it, last);
        });
      } else {
        app.searchElement.searchMessage.node.textContent = Utils.defaultRejectMessage;  
      }
    }, (message)=>{
      console.log('fsdsf', message);
      app.searchElement.searchMessage.node.textContent = message || Utils.defaultRejectMessage;
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


  getMoreFilmData(mainData, last){
    Utils.sendGetRequest(Utils.getMediaInfoURL(mainData.imdbID),(res)=>{
      this.addCards(mainData, res, last); 
    });
  }
  
  addCards(mainData, secondaryData, last){
    console.log(secondaryData);
    let slide = this.sld.addSlide('');
    
    let el = new Card(slide.node);
    el.refresh({image: mainData.Poster, year: mainData.Year, title: mainData.Title, rating: secondaryData.imdbRating});
    
    if (this.sld.slides.length && this.sld.currentPosition===-1){
      this.sld.bottomControl.buttons[0].click();
    } 

    if (last){
      this.sld.lock = false;
      this.sld.setDragOffset();
    } 
  }
}

function addRandomSlide(slideParent, contentText){
  let el = new Control(slideParent, 'div', '', contentText);
  el.node.style =`
    background-color: 
    rgb(
      ${Math.trunc(Math.random()*155+100)},
      ${Math.trunc(Math.random()*155+100)},
      ${Math.trunc(Math.random()*155+100)}
    ); 
    width:100%; 
    height:100%; 
    display:flex; 
    justify-content:center; 
    align-items:center; 
    font-size:48pt
  `;
  return el;
}



module.exports = App;