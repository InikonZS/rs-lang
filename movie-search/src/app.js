const Control = require('./control.component.js');
const Button = require('./button.component.js');
const Card = require('./card.component.js');
const Group = require('./radio-group.component.js');
const Slider = require('./slider.component.js');
const Search = require('./search.component.js');
const Utils = require('./utils.js');
const Keyboard = require('./keyboard.component.js');

class App {
  constructor(dashBoardNode, searchNode) {
    const app = this;

    this.currentType;
    this.currentPage = 1;
    this.currentQuery = 'dream';

    //  this.spinnerImg;
    //  Utils.sendBlobRequest('assets/loading.gif','image/gif',(blob)=>{
    //    this.spinnerImg = URL.createObjectURL(blob);
    //  });

    const types = ['all', 'movie', 'series', 'game'];
    const sel = new Control(searchNode, 'div', 'levels_wrapper', 'no-selected');
    sel.hide();
    const gr = new Group(searchNode, 'levels_wrapper', 'select_button');
    for (let i = 0; i < types.length; i++) {
      gr.addButton(types[i], () => {
        if (this.currentType != types[i]) {
          sel.node.textContent = gr.currentButton.node.textContent;

          this.currentType = types[i];
          this.searchElement.searchButton.click();
        }
      });
    }
    this.typeSelector = gr;

   /* const detectRussian = (msg) => {
      res = false;
      ru = 'абвгдеёжзиклмопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
      arr = ru.split('');
      for (let i = 0; i < msg.length; i += 1) {
        if (msg.indexOf(arr[i]) != -1) {
          res = true;
          break;
        }
      }
      return res;
    };*/

    this.searchElement = new Search(this, searchNode, (request) => {
      if (request) {
        this.currentQuery = request;
        this.translate;
        this.currentPage = 1;
        this.sld.clear();
        if (detectRussian(this.currentQuery)) {
          const word = this.currentQuery;

          Utils.sendGetRequest(Utils.getTranslateRequestURL(word),
            (res) => {
              this.translate = res.text[0];
              app.refreshResults(this.translate, app.currentPage);
            },
            (m) => {
              app.searchElement.searchButton.node.textContent = 'search';
              app.searchElement.searchButton.enable();
              app.sld.rightButton.basicClass='right_im slider_button';
              app.sld.rightButton.node.className='right_im slider_button';
              this.translate = undefined;
            });
        } else {
          app.refreshResults(this.currentQuery, app.currentPage);
        }
      }
    });


    const rightMaxHandler = function () {
      app.currentPage++;
      console.log(`page ${app.currentPage}`);
      app.refreshResults(app.translate || app.currentQuery, app.currentPage);
    };
    this.sld = new Slider(dashBoardNode, 'slider_wrapper', 'slider_slide', false, rightMaxHandler);
    this.sld.touchUpEvent = ()=>{
      this.searchElement.searchEdit.node.blur();
    }

    this.searchElement.searchEdit.node.focus();
    this.typeSelector.buttons[0].click();
    app.searchElement.searchButton.node.textContent = 'search';
    app.searchElement.searchButton.enable();

    const resizeHandler = () => {
      console.log('resize');
      const dw = document.documentElement.clientWidth;
      if (dw > 1023) {
        this.sld.slidesPerPage = 4;
        this.sld.setDragOffset();
      } else if (dw > 767) {
        this.sld.slidesPerPage = 3;
        this.sld.setDragOffset();
      } else if (dw > 480) {
        this.sld.slidesPerPage = 2;
        this.sld.setDragOffset();
      } else {
        this.sld.slidesPerPage = 1;
        this.sld.setDragOffset();
      }

      if (document.documentElement.clientWidth < 768) {
        this.searchElement.searchKeyboardButton.hide();

        if (this.searchElement.searchKeyboardButton.isToggled) {
          this.searchElement.keyboard.hide();
        }
      }
      if (document.documentElement.clientWidth > 798) {
        this.searchElement.searchKeyboardButton.show();
        if (this.searchElement.searchKeyboardButton.isToggled) {
          this.searchElement.keyboard.show();
        }
      }
    };

    window.addEventListener('resize', resizeHandler);
    resizeHandler();
    this.refreshResults(this.currentQuery, 1);
  }

  refreshResults(query = 'dream', page = 1) {
    Utils.sendGetRequest(Utils.getMediaURL(query, page, this.currentType), (res) => {
      console.log(res);
      if (res && res.Search) {
        res.Search.forEach((it, i) => {
          last = (i == res.Search.length - 1);
          this.getMoreFilmData(it, last);
          app.searchElement.searchMessage.node.textContent = `Found ${res.totalResults} for ${query}`;
        });
      } else {
        app.searchElement.searchButton.node.textContent = 'search';
        app.searchElement.searchButton.enable();
        app.sld.rightButton.basicClass='right_im slider_button';
        app.sld.rightButton.node.className='right_im slider_button';
        app.searchElement.searchMessage.node.textContent = res.Error || Utils.defaultRejectMessage;
      }
    }, (message) => {
      app.searchElement.searchButton.node.textContent = 'search';
      app.searchElement.searchButton.enable();
      app.sld.rightButton.basicClass='right_im slider_button';
      app.sld.rightButton.node.className='right_im slider_button';
      console.log('fsdsf', message);
      app.searchElement.searchMessage.node.textContent = message || Utils.defaultRejectMessage;
    });
  }


  getMoreFilmData(mainData, last) {
    Utils.sendGetRequest(Utils.getMediaInfoURL(mainData.imdbID), (res) => {
      this.addCards(mainData, res, last);
    });
  }

  addCards(mainData, secondaryData, last) {
    const slide = this.sld.addSlide('');

    const el = new Card(slide.node);
    el.refresh({
      image: mainData.Poster, year: mainData.Year, title: mainData.Title, rating: secondaryData.imdbRating, id: mainData.imdbID,
    });


    if (last) {
      app.searchElement.searchButton.node.textContent = 'search';
      app.searchElement.searchButton.enable();
      this.sld.lock = false;
      this.sld.rightButton.basicClass='right_im slider_button';
      this.sld.rightButton.node.className='right_im slider_button';
      this.sld.setDragOffset();
    }
    if (this.sld.slides.length && this.sld.currentPosition === -1) {
      this.sld.bottomControl.buttons[0].click();
    }
  }
}

function addRandomSlide(slideParent, contentText) {
  const el = new Control(slideParent, 'div', '', contentText);
  el.node.style = `
    background-color: 
    rgb(
      ${Math.trunc(Math.random() * 155 + 100)},
      ${Math.trunc(Math.random() * 155 + 100)},
      ${Math.trunc(Math.random() * 155 + 100)}
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

function detectRussian(msg){
  res = false;
  ru = 'абвгдеёжзиклмопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
  arr = ru.split('');
  for (let i = 0; i < arr.length; i += 1) {
    if (msg.indexOf(arr[i]) != -1) {
      res = true;
      break;
    }
  }
  return res;
};

module.exports = {App, detectRussian};
