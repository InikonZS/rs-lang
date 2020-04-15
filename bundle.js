/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Control = __webpack_require__(/*! ./control.js */ "./src/control.js");

var Button = __webpack_require__(/*! ./button.js */ "./src/button.js");

var Base = __webpack_require__(/*! ./base.js */ "./src/base.js");

var Game = __webpack_require__(/*! ./game.js */ "./src/game.js");

var Menu = __webpack_require__(/*! ./menu.js */ "./src/menu.js");

var cards = __webpack_require__(/*! ./cards.js */ "./src/cards.js");

var App = function App(parentNode, menuNode) {
  var _this = this;

  _classCallCheck(this, App);

  var that = this;
  this.mode = 0;
  var base = new Base();
  base.addFromBaseData(cards);
  this.mainContol = document.querySelector('#main-control');
  this.gameContol = document.querySelector('#game-control');
  this.gameScore = document.querySelector('#game-score');
  this.categoryName = document.querySelector('#category');
  this.categoryDesc = document.querySelector('#category-description');
  this.error = new Control(parentNode, 'audio', '', '');
  this.error.node.src = 'assets/audio/' + 'error.mp3';
  var baseOutput = new Control(parentNode, 'div', 'dash_wrapper', ''); // let menuOutput = new Control(menuNode, 'div', '', '');

  this.menu = new Menu(this, menuNode, baseOutput.node, base);

  switch (window.location.hash) {
    case '#main':
      this.menu.burg.click();
      this.menu.main.click();
      break;

    case '#random':
      this.menu.burg.click();
      this.menu.random.click();
      break;

    case '#difficult':
      this.menu.burg.click();
      this.menu.diffucult.click();
      break;

    case '#statistic':
      this.menu.burg.click();
      this.menu.statistic.click();
      break;

    default:
      this.menu.burg.click();
      this.menu.main.click();
  }

  this.startButton = new Button(this.mainContol, 'menu_button', 'Start Play', function () {
    console.log(_this.menu.currentBase);
    baseOutput.clear();
    _this.game = new Game(_this, baseOutput.node, _this.menu.currentBase);
  });
  this.modeButton = new Button(this.mainContol, 'menu_button', 'to Game mode', function () {
    this.changeState();
    that.mode = this.state;

    if (that.mode) {
      this.render('menu_button', 'to train mode');
    } else {
      this.render('menu_button', 'to Game mode');
    }

    that.menu.redraw(that.mode);
  }); // this.button = new Button(parentNode, '', 'Click here', (() => {
  //  baseOutput.clear();
  //  new Game(baseOutput.node, base.getAnyFromCategory());
  // }));
};

module.exports = App;

/***/ }),

/***/ "./src/base.js":
/*!*********************!*\
  !*** ./src/base.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Base = /*#__PURE__*/function () {
  function Base() {
    _classCallCheck(this, Base);

    this.words = [];
  }

  _createClass(Base, [{
    key: "pushUnuq",
    value: function pushUnuq(rec) {
      if (!this.contains(rec)) {
        this.words.push(rec);
      }
    }
  }, {
    key: "addFromBaseData",
    value: function addFromBaseData(baseData) {
      for (var i = 1; i < baseData.length; i++) {
        for (var j = 0; j < baseData[i].length; j++) {
          var rec = makeRecord(baseData[0][i - 1], baseData[i][j].word, baseData[i][j].translation, baseData[i][j].image, baseData[i][j].audioSrc);
          loadFromStorage(rec);
          this.words.push(rec);
        }
      }
    } // chainable

  }, {
    key: "selectCategory",
    value: function selectCategory(category) {
      var res = new Base();
      res.words = this.words.filter(function (it) {
        return it.category == category;
      });
      return res;
    }
  }, {
    key: "clone",
    value: function clone() {
      var res = new Base();
      res.words = this.words.concat([]);
      return res;
    }
  }, {
    key: "getRandomized",
    value: function getRandomized() {
      var res = new Base();
      res.words = this.words.concat([]);
      res.words.sort(function () {
        return Math.random() * 2 - 1;
      });
      return res;
    }
  }, {
    key: "getSorted",
    value: function getSorted(comparator) {
      var res = new Base();
      res.words = this.words.concat([]);
      res.words.sort(comparator);
      return res;
    }
  }, {
    key: "getFiltered",
    value: function getFiltered(comparator) {
      var res = new Base();
      res.words = this.words.concat([]);
      res.words = res.words.filter(comparator);
      return res;
    }
  }, {
    key: "getFirstN",
    value: function getFirstN(n) {
      var res = new Base();
      var m = Math.min(n, this.words.length);

      for (var i = 0; i < m; i++) {
        res.words.push(this.words[i]);
      }

      return res;
    }
  }, {
    key: "getAnyFromCategory",
    value: function getAnyFromCategory() {
      var _this = this;

      var res = new Base();
      var cat = this.getCategories();
      cat.forEach(function (it) {
        res.words.push(_this.selectCategory(it).getRandomized().getFirstN(1).words[0]);
      });
      return res;
    } // not chainable

  }, {
    key: "contains",
    value: function contains(rec) {
      var res = this.words.filter(function (it) {
        return it.hash == rec.hash;
      });
      return res.length;
    }
  }, {
    key: "getCategories",
    value: function getCategories() {
      var res = this.words.map(function (it) {
        return it.category;
      });
      res.sort();
      res = res.filter(function (it, i, arr) {
        return it != arr[i - 1] && it;
      });
      return res;
    }
  }, {
    key: "saveChanges",
    value: function saveChanges(rec) {
      saveToStorage(rec);
    }
  }]);

  return Base;
}();

function makeRecord(category, word, translation, imageSrc, audioSrc) {
  var imageSrcV = imageSrc || "./assets/images/".concat(word, ".jpg");
  var audioSrcV = audioSrc || "./assets/audio/".concat(word, ".mp3");
  var obj = {};
  obj.hash = "".concat(category, " ").concat(word, " ").concat(translation);
  obj.word = word;
  obj.category = category;
  obj.translation = translation;
  obj.imageSrc = imageSrcV;
  obj.audioSrc = audioSrcV;
  obj.statUp = 0;
  obj.statDown = 0;

  obj.getPercent = function () {
    var res = 0;

    if (obj.statDown + obj.statUp !== 0) {
      var rel = obj.statUp / (obj.statDown + obj.statUp);
      res = Math.trunc(rel * 1000) / 10;
    }

    return res;
  };

  return obj;
}

function makeStorageRecord(statUp, statDown) {
  var obj = {};
  obj.statUp = statUp;
  obj.statDown = statDown;
  return obj;
}

function saveToStorage(rec) {
  var item = JSON.stringify(makeStorageRecord(rec.statUp, rec.statDown));
  localStorage.setItem(rec.hash, item);
}

function loadFromStorage(rec) {
  var ls = localStorage.getItem(rec.hash);

  if (ls !== null) {
    var item = JSON.parse(ls);
    rec.statUp = item.statUp;
    rec.statDown = item.statDown;
  }
}

module.exports = Base;

/***/ }),

/***/ "./src/button.js":
/*!***********************!*\
  !*** ./src/button.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Control = __webpack_require__(/*! ./control.js */ "./src/control.js");

var Button = /*#__PURE__*/function (_Control) {
  _inherits(Button, _Control);

  var _super = _createSuper(Button);

  function Button(parentNode, className, textContent, click) {
    var _this;

    _classCallCheck(this, Button);

    _this = _super.call(this, parentNode, 'div', className, textContent);
    _this.state = false;
    _this.disabled = false;
    /*   if (click) {
      this.click = click;
      this.node.addEventListener('click', (e) => {
        this.click();
      });
    } */

    _this.setClick(click);

    return _this;
  }

  _createClass(Button, [{
    key: "changeState",
    value: function changeState() {
      this.state = !this.state;
    }
  }, {
    key: "setClick",
    value: function setClick(click) {
      var _this2 = this;

      if (click) {
        this.click = click;
        this.node.addEventListener('click', function (e) {
          if (!_this2.disabled) {
            _this2.click();
          }
        });
      }
    }
  }, {
    key: "disable",
    value: function disable() {
      this.disabled = true;
    }
  }]);

  return Button;
}(Control);

module.exports = Button;

/***/ }),

/***/ "./src/card.js":
/*!*********************!*\
  !*** ./src/card.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Control = __webpack_require__(/*! ./control.js */ "./src/control.js");

var Button = __webpack_require__(/*! ./button.js */ "./src/button.js");

var Card = /*#__PURE__*/function (_Button) {
  _inherits(Card, _Button);

  var _super = _createSuper(Card);

  function Card(parentNode, baseRecord, click) {
    var _this;

    _classCallCheck(this, Card);

    _this = _super.call(this, parentNode, 'dash_item', '', click);
    _this.baseRecord = baseRecord;
    var imgURL = "assets/".concat(_this.baseRecord.imageSrc);
    _this.aud = new Control(_this.node, 'audio', '', '');
    _this.aud.node.src = "assets/".concat(_this.baseRecord.audioSrc);
    _this.sideB = new Control(_this.node, 'div', 'card_side', '');
    _this.sideB.name = new Control(_this.sideB.node, 'div', 'card_name', _this.baseRecord.translation);
    var imgWrapperB = new Control(_this.sideB.node, 'div', 'card_img', '');
    imgWrapperB.node.style = 'transform: rotateY(180deg)';
    _this.sideB.img = new Control(imgWrapperB.node, 'img', '', '');
    _this.sideB.img.node.src = imgURL;
    _this.sideB.node.style = "z-index: 1; transform: perspective(500px) rotateY(".concat(180, "deg)");
    _this.sideA = new Control(_this.node, 'div', 'card_side card_side_a', '');
    _this.sideA.name = new Control(_this.sideA.node, 'div', 'card_name', _this.baseRecord.word);
    var imgWrapperA = new Control(_this.sideA.node, 'div', 'card_img', '');
    _this.sideA.img = new Control(imgWrapperA.node, 'img', '', '');
    _this.sideA.img.node.src = imgURL;
    _this.sideA.cardMenu = new Control(_this.sideA.node, 'div', 'card_menu', '');
    _this.rotateButton = new Button(_this.sideA.cardMenu.node, 'card_button', 'rotate', function (event) {
      _this.rotate(180);
    });

    _this.node.addEventListener('mouseleave', function () {
      if (!_this.disabled) {
        _this.rotate(0);
      }
    });

    _this.listenButton = new Button(_this.sideA.cardMenu.node, 'card_button', 'listen', function (event) {
      _this.aud.node.play();
    });

    _this.rotate(0);

    return _this;
  }

  _createClass(Card, [{
    key: "rotate",
    value: function rotate(deg) {
      this.sideA.node.style = "z-index: 1; transform: perspective(500px) rotateY(".concat(deg, "deg)");
      this.sideB.node.style = "z-index: 1; transform: perspective(500px) rotateY(".concat(180 + deg, "deg)");
    }
  }, {
    key: "setPlayMode",
    value: function setPlayMode() {
      this.sideB.hide();
      this.sideA.name.hide();
      this.sideA.cardMenu.hide();
    }
  }, {
    key: "setTrainMode",
    value: function setTrainMode() {
      this.sideB.show();
      this.sideA.name.show();
      this.sideA.cardMenu.show();
      this.rotate(0);
    }
  }, {
    key: "setCategoryMode",
    value: function setCategoryMode() {
      this.sideB.hide();
      this.sideA.name.node.textContent = this.baseRecord.category;
      this.sideA.cardMenu.hide();
    }
  }, {
    key: "setMode",
    value: function setMode(mode) {
      if (mode) {
        this.setPlayMode();
      } else {
        this.setTrainMode();
      }
    }
  }, {
    key: "disable",
    value: function disable() {
      _get(_getPrototypeOf(Card.prototype), "disable", this).call(this); // console.log('dis');


      this.sideA.node.style = 'opacity:50%';
    }
  }]);

  return Card;
}(Button);

module.exports = Card;

/***/ }),

/***/ "./src/cards.js":
/*!**********************!*\
  !*** ./src/cards.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

var cards = [['Action (set A)', 'Action (set B)', 'Animal (set A)', 'Animal (set B)', 'Clothes', 'Emotions', 'Coronavirus', 'Tools'], [{
  word: 'cry',
  translation: 'плакать',
  image: 'img/cry.jpg',
  audioSrc: 'audio/cry.mp3'
}, {
  word: 'dance',
  translation: 'танцевать',
  image: 'img/dance.jpg',
  audioSrc: 'audio/dance.mp3'
}, {
  word: 'dive',
  translation: 'нырять',
  image: 'img/dive.jpg',
  audioSrc: 'audio/dive.mp3'
}, {
  word: 'draw',
  translation: 'рисовать',
  image: 'img/draw.jpg',
  audioSrc: 'audio/draw.mp3'
}, {
  word: 'fish',
  translation: 'ловить рыбу',
  image: 'img/fish.jpg',
  audioSrc: 'audio/fish.mp3'
}, {
  word: 'fly',
  translation: 'летать',
  image: 'img/fly.jpg',
  audioSrc: 'audio/fly.mp3'
}, {
  word: 'hug',
  translation: 'обнимать',
  image: 'img/hug.jpg',
  audioSrc: 'audio/hug.mp3'
}, {
  word: 'jump',
  translation: 'прыгать',
  image: 'img/jump.jpg',
  audioSrc: 'audio/jump.mp3'
}], [{
  word: 'open',
  translation: 'открывать',
  image: 'img/open.jpg',
  audioSrc: 'audio/open.mp3'
}, {
  word: 'play',
  translation: 'играть',
  image: 'img/play.jpg',
  audioSrc: 'audio/play.mp3'
}, {
  word: 'point',
  translation: 'указывать',
  image: 'img/point.jpg',
  audioSrc: 'audio/point.mp3'
}, {
  word: 'ride',
  translation: 'ездить',
  image: 'img/ride.jpg',
  audioSrc: 'audio/ride.mp3'
}, {
  word: 'run',
  translation: 'бегать',
  image: 'img/run.jpg',
  audioSrc: 'audio/run.mp3'
}, {
  word: 'sing',
  translation: 'петь',
  image: 'img/sing.jpg',
  audioSrc: 'audio/sing.mp3'
}, {
  word: 'skip',
  translation: 'пропускать, прыгать',
  image: 'img/skip.jpg',
  audioSrc: 'audio/skip.mp3'
}, {
  word: 'swim',
  translation: 'плавать',
  image: 'img/swim.jpg',
  audioSrc: 'audio/swim.mp3'
}], [{
  word: 'cat',
  translation: 'кот',
  image: 'img/cat.jpg',
  audioSrc: 'audio/cat.mp3'
}, {
  word: 'chick',
  translation: 'цыплёнок',
  image: 'img/chick.jpg',
  audioSrc: 'audio/chick.mp3'
}, {
  word: 'chicken',
  translation: 'курица',
  image: 'img/chicken.jpg',
  audioSrc: 'audio/chicken.mp3'
}, {
  word: 'dog',
  translation: 'собака',
  image: 'img/dog.jpg',
  audioSrc: 'audio/dog.mp3'
}, {
  word: 'horse',
  translation: 'лошадь',
  image: 'img/horse.jpg',
  audioSrc: 'audio/horse.mp3'
}, {
  word: 'pig',
  translation: 'свинья',
  image: 'img/pig.jpg',
  audioSrc: 'audio/pig.mp3'
}, {
  word: 'rabbit',
  translation: 'кролик',
  image: 'img/rabbit.jpg',
  audioSrc: 'audio/rabbit.mp3'
}, {
  word: 'sheep',
  translation: 'овца',
  image: 'img/sheep.jpg',
  audioSrc: 'audio/sheep.mp3'
}], [{
  word: 'bird',
  translation: 'птица',
  image: 'img/bird.jpg',
  audioSrc: 'audio/bird.mp3'
}, {
  word: 'fish',
  translation: 'рыба',
  image: 'img/fish1.jpg',
  audioSrc: 'audio/fish.mp3'
}, {
  word: 'frog',
  translation: 'жаба',
  image: 'img/frog.jpg',
  audioSrc: 'audio/frog.mp3'
}, {
  word: 'giraffe',
  translation: 'жирафа',
  image: 'img/giraffe.jpg',
  audioSrc: 'audio/giraffe.mp3'
}, {
  word: 'lion',
  translation: 'лев',
  image: 'img/lion.jpg',
  audioSrc: 'audio/lion.mp3'
}, {
  word: 'mouse',
  translation: 'мышь',
  image: 'img/mouse.jpg',
  audioSrc: 'audio/mouse.mp3'
}, {
  word: 'turtle',
  translation: 'черепаха',
  image: 'img/turtle.jpg',
  audioSrc: 'audio/turtle.mp3'
}, {
  word: 'dolphin',
  translation: 'дельфин',
  image: 'img/dolphin.jpg',
  audioSrc: 'audio/dolphin.mp3'
}], [{
  word: 'skirt',
  translation: 'юбка',
  image: 'img/skirt.jpg',
  audioSrc: 'audio/skirt.mp3'
}, {
  word: 'pants',
  translation: 'брюки',
  image: 'img/pants.jpg',
  audioSrc: 'audio/pants.mp3'
}, {
  word: 'blouse',
  translation: 'блузка',
  image: 'img/blouse.jpg',
  audioSrc: 'audio/blouse.mp3'
}, {
  word: 'dress',
  translation: 'платье',
  image: 'img/dress.jpg',
  audioSrc: 'audio/dress.mp3'
}, {
  word: 'boot',
  translation: 'ботинок',
  image: 'img/boot.jpg',
  audioSrc: 'audio/boot.mp3'
}, {
  word: 'shirt',
  translation: 'рубашка',
  image: 'img/shirt.jpg',
  audioSrc: 'audio/shirt.mp3'
}, {
  word: 'coat',
  translation: 'пальто',
  image: 'img/coat.jpg',
  audioSrc: 'audio/coat.mp3'
}, {
  word: 'shoe',
  translation: 'туфли',
  image: 'img/shoe.jpg',
  audioSrc: 'audio/shoe.mp3'
}], [{
  word: 'sad',
  translation: 'грустный',
  image: 'img/sad.jpg',
  audioSrc: 'audio/sad.mp3'
}, {
  word: 'angry',
  translation: 'сердитый',
  image: 'img/angry.jpg',
  audioSrc: 'audio/angry.mp3'
}, {
  word: 'happy',
  translation: 'счастливый',
  image: 'img/happy.jpg',
  audioSrc: 'audio/happy.mp3'
}, {
  word: 'tired',
  translation: 'уставший',
  image: 'img/tired.jpg',
  audioSrc: 'audio/tired.mp3'
}, {
  word: 'surprised',
  translation: 'удивлённый',
  image: 'img/surprised.jpg',
  audioSrc: 'audio/surprised.mp3'
}, {
  word: 'scared',
  translation: 'испуганный',
  image: 'img/scared.jpg',
  audioSrc: 'audio/scared.mp3'
}, {
  word: 'smile',
  translation: 'улыбка',
  image: 'img/smile.jpg',
  audioSrc: 'audio/smile.mp3'
}, {
  word: 'laugh',
  translation: 'смех',
  image: 'img/laugh.jpg',
  audioSrc: 'audio/laugh.mp3'
}], [{
  word: 'virus',
  translation: 'вирус',
  image: 'img/virus.jpg',
  audioSrc: 'audio/virus.mp3'
}, {
  word: 'ambulance',
  translation: 'скорая помощь',
  image: 'img/ambulance.jpg',
  audioSrc: 'audio/ambulance.mp3'
}, {
  word: 'doctor',
  translation: 'врач',
  image: 'img/doctor.jpg',
  audioSrc: 'audio/doctor.mp3'
}, {
  word: 'illness',
  translation: 'болезнь',
  image: 'img/illness.jpg',
  audioSrc: 'audio/illness.mp3'
}, {
  word: 'medicine',
  translation: 'лекарство',
  image: 'img/medicine.jpg',
  audioSrc: 'audio/medicine.mp3'
}, {
  word: 'cough',
  translation: 'кашель',
  image: 'img/cough.jpg',
  audioSrc: 'audio/cough.mp3'
}, {
  word: 'quarantine',
  translation: 'карантин',
  image: 'img/quarantine.jpg',
  audioSrc: 'audio/quarantine.mp3'
}, {
  word: 'hospital',
  translation: 'больница',
  image: 'img/hospital.jpg',
  audioSrc: 'audio/hospital.mp3'
}], [{
  word: 'hammer',
  translation: 'молоток',
  image: 'img/hammer.jpg',
  audioSrc: 'audio/hammer.mp3'
}, {
  word: 'pliers',
  translation: 'пассатижи',
  image: 'img/pliers.jpg',
  audioSrc: 'audio/pliers.mp3'
}, {
  word: 'screwdriver',
  translation: 'отвертка',
  image: 'img/screwdriver.jpg',
  audioSrc: 'audio/screwdriver.mp3'
}, {
  word: 'saw',
  translation: 'пила',
  image: 'img/saw.jpg',
  audioSrc: 'audio/saw.mp3'
}, {
  word: 'clamp',
  translation: 'струбцина',
  image: 'img/clamp.jpg',
  audioSrc: 'audio/clamp.mp3'
}, {
  word: 'soldering_iron',
  translation: 'паяльник',
  image: 'img/soldering_iron.jpg',
  audioSrc: 'audio/soldering_iron.mp3'
}, {
  word: 'wrench',
  translation: 'гаечный ключ',
  image: 'img/wrench.jpg',
  audioSrc: 'audio/wrench.mp3'
}, {
  word: 'crowbar',
  translation: 'лом',
  image: 'img/crowbar.jpg',
  audioSrc: 'audio/crowbar.mp3'
}]];
module.exports = cards;

/***/ }),

/***/ "./src/control.js":
/*!************************!*\
  !*** ./src/control.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Control = /*#__PURE__*/function () {
  // Hard DOM functions
  function Control(parentNode, tagName, className, textContent) {
    _classCallCheck(this, Control);

    var classNameV = className || '';
    var textContentV = textContent || '';
    var tagNameV = tagName || 'div';
    this.node = document.createElement(tagNameV);
    this.render(classNameV, textContentV);
    parentNode.appendChild(this.node);
  }

  _createClass(Control, [{
    key: "destroy",
    value: function destroy() {
      this.node.remove();
    }
  }, {
    key: "clear",
    value: function clear() {
      this.node.innerHTML = '';
    } // style and content functions

  }, {
    key: "render",
    value: function render(className, textContent) {
      this.node.className = className;
      this.node.textContent = textContent;
    }
  }, {
    key: "setClass",
    value: function setClass(className) {
      this.node.className = className;
    }
  }, {
    key: "hide",
    value: function hide() {
      this.node.style = 'display:none';
    }
  }, {
    key: "show",
    value: function show() {
      this.node.style = '';
    } // own props functions

  }]);

  return Control;
}();

module.exports = Control;

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Base = __webpack_require__(/*! ./base.js */ "./src/base.js");

var Button = __webpack_require__(/*! ./button.js */ "./src/button.js");

var Control = __webpack_require__(/*! ./control.js */ "./src/control.js");

var Card = __webpack_require__(/*! ./card.js */ "./src/card.js");

var Game = /*#__PURE__*/function () {
  function Game(app, parentNode, seqBase) {
    var _this = this;

    _classCallCheck(this, Game);

    this.base = seqBase.getRandomized();
    this.finished = false;
    this.finishBack = new Button(parentNode, 'dash_modal', '', function () {
      app.menu.main.click();
      app.menu.burg.click();
      this.hide();
    });
    this.finishBack.hide();
    this.finishWindow = new Control(this.finishBack.node, 'div', 'dash_modal_window', '');
    this.gameContolNode = app.gameContol;
    this.gameContolNode.innerHTML = '';
    this.repeatButton = new Button(this.gameContolNode, 'menu_button', 'repeat word', function () {
      _this.sounds[_this.base.words.length - 1].node.play();
    });
    this.gameScoreNode = app.gameScore;
    this.gameScoreNode.innerHTML = ''; // this.globalError = app.error;

    this.failure = new Control(parentNode, 'audio', '', '');
    this.failure.node.src = 'assets/audio/' + 'failure.mp3';
    this.error = new Control(parentNode, 'audio', '', '');
    this.error.node.src = 'assets/audio/' + 'error.mp3';
    this.correct = new Control(parentNode, 'audio', '', '');
    this.correct.node.src = 'assets/audio/' + 'correct.mp3';
    this.success = new Control(parentNode, 'audio', '', '');
    this.success.node.src = 'assets/audio/' + 'success.mp3';
    this.sounds = [];
    this.base.words.forEach(function (it) {
      var aud = new Control(parentNode, 'audio', '', '');
      aud.node.src = "assets/".concat(it.audioSrc);

      _this.sounds.push(aud);
    });
    this.seqScore = [];
    this.mistakeCount = 0;
    this.incorrectWords = new Base();
    this.correctWords = new Base();
    this.base.getRandomized().words.forEach(function (it) {
      var that = _this;
      var el = new Card(parentNode, it, function () {
        if (that.step(it)) {
          this.disable();
        }
      }).setPlayMode();
    });
    this.sounds[this.base.words.length - 1].node.play();
  }

  _createClass(Game, [{
    key: "step",
    value: function step(wordRecord) {
      var _this2 = this;

      var res = false;
      var cur = this.base.words[this.base.words.length - 1];

      if (cur && !this.correctWords.contains(cur)) {
        if (cur.hash == wordRecord.hash) {
          this.correctWords.pushUnuq(cur);
          this.base.words.pop();
          cur.statUp++;
          this.base.saveChanges(cur);
          this.seqScore.push(true); // console.log('ok');

          res = true;
          new Control(this.gameScoreNode, 'div', 'star_item star_item_ok');

          this.correct.node.onended = function () {
            if (_this2.base.words.length) {
              _this2.sounds[_this2.base.words.length - 1].node.play();
            }
          };

          this.correct.node.play();
        } else {
          this.incorrectWords.pushUnuq(cur);
          this.mistakeCount++;
          cur.statDown++;
          this.base.saveChanges(cur);
          this.seqScore.push(false); // console.log('no');

          new Control(this.gameScoreNode, 'div', 'star_item star_item_err');
          this.error.node.play();
        }

        if (this.base.words.length == 0) {
          this.finish();
        } else {// this.sounds[this.base.words.length-1].node.play();
        }
      }

      return res;
    }
  }, {
    key: "finish",
    value: function finish() {
      console.log('fin');

      if (!this.base.words.length) {
        if (this.mistakeCount) {
          var wordList = this.incorrectWords.words.map(function (it) {
            return it.word;
          }).join(', ');
          this.finishWindow.node.textContent = "You have ".concat(this.mistakeCount, " errors in words: ").concat(wordList);
          this.failure.node.play();
        } else {
          this.finishWindow.node.textContent = 'You are win';
          this.success.node.play();
        }

        this.finishBack.show();
      } else {// this.error.node.play();
      }

      this.finished = true;
      this.gameContolNode.innerHTML = '';
      this.gameScoreNode.innerHTML = ''; // let res = {};
      // res.cancel = !!this.base.words.length;
      // return res;
    }
  }]);

  return Game;
}();

module.exports = Game;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var App = __webpack_require__(/*! ./app.js */ "./src/app.js");

var mainNode = document.querySelector('#app-main');
var menuNode = document.querySelector('#header-menu');
var app = new App(mainNode, menuNode); // module.exports();

/***/ }),

/***/ "./src/menu.js":
/*!*********************!*\
  !*** ./src/menu.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Base = __webpack_require__(/*! ./base.js */ "./src/base.js");

var Button = __webpack_require__(/*! ./button.js */ "./src/button.js");

var Control = __webpack_require__(/*! ./control.js */ "./src/control.js");

var Card = __webpack_require__(/*! ./card.js */ "./src/card.js");

var Statistic = __webpack_require__(/*! ./statistic.js */ "./src/statistic.js");

var Menu = /*#__PURE__*/function (_Button) {
  _inherits(Menu, _Button);

  var _super = _createSuper(Menu);

  function Menu(app, parentNode_, targetNode, base) {
    var _this;

    _classCallCheck(this, Menu);

    var parent = _this = _super.call(this, parentNode_, 'basic_block menu_burger');

    var parentNode = parent.node;

    var that = _assertThisInitialized(_this);

    _this.burg = new Button(parentNode_, 'burger', '', function () {
      if (this.state) {
        that.hide();
        that.dark.hide();
        this.node.style = 'transform: rotateZ(0deg);';
        this.changeState();
      } else {
        that.show();
        that.dark.show();
        this.node.style = 'transform: rotateZ(90deg);';
        this.changeState();
      }
    });
    var el = new Control(_this.burg.node, 'img', '', '');
    el.node.src = 'assets/ico/burger.png';
    _this.dark = new Button(document.querySelector('body'), 'modal', '', function () {
      that.burg.click();
    });
    _this.currentCards = [];

    var drawCards = function drawCards(targetNode, base, click) {
      _this.currentBase = base;
      targetNode.innerHTML = '';
      _this.currentCards = [];
      base.words.forEach(function (it) {
        var el = new Card(targetNode, it, click);
        el.setMode(app.mode);
        that.currentCards.push(el);
      });
    };

    var resetActive = function resetActive() {
      if (app.game && !app.game.finished) {
        app.game.finish();
        app.error.node.play();
      }

      var c = 'menu_button';

      _this.main.setClass(c);

      _this.random.setClass(c);

      _this.statistic.setClass(c);

      _this.diffucult.setClass(c);

      _this.categories.forEach(function (it) {
        it.setClass(c);
      }); // app.startButton.show();
      //app.modeButton.show();

    };

    _this.main = new Button(parentNode, 'menu_button', 'main', function () {
      resetActive();
      this.setClass('menu_button menu_button_active');
      that.currentMenuButton = this;
      window.location.hash = '';
      app.categoryName.textContent = "Main page";
      app.categoryDesc.textContent = "Select any category"; //app.startButton.hide();
      //app.modeButton.show();

      that.burg.click();
      targetNode.innerHTML = '';
      that.currentBase = base.getAnyFromCategory();
      that.currentBase.words.forEach(function (it, i) {
        var el = new Card(targetNode, it, function () {
          window.location.hash = i;
          app.categoryName.textContent = "Category: " + that.categories[i].node.textContent;
          app.categoryDesc.textContent = "Click start play button to test youself";
          resetActive();
          that.categories[i].setClass('menu_button menu_button_active');
          drawCards(targetNode, base.selectCategory(it.category));
        }).setCategoryMode(); // that.currentCards.push(el);
      });
    });
    _this.categories = [];
    base.getCategories().forEach(function (it, i) {
      var el = new Button(parentNode, 'menu_button', it, function () {
        that.currentMenuButton = this;
        window.location.hash = i;
        app.categoryName.textContent = "Category: " + that.categories[i].node.textContent;
        app.categoryDesc.textContent = "Click start play button to test youself";
        resetActive();
        this.setClass('menu_button menu_button_active');
        that.burg.click();
        drawCards(targetNode, base.selectCategory(it));
      });

      _this.categories.push(el);
    });
    _this.random = new Button(parentNode, 'menu_button', 'random', function () {
      that.currentMenuButton = this;
      window.location.hash = 'random';
      app.categoryName.textContent = "Random words";
      app.categoryDesc.textContent = "There are a few random words from all categories. Click start play button to test youself";
      resetActive();
      this.setClass('menu_button menu_button_active');
      that.burg.click();
      drawCards(targetNode, base.getRandomized().getFirstN(8));
    });
    _this.diffucult = new Button(parentNode, 'menu_button', 'difficult', function () {
      that.currentMenuButton = this;
      window.location.hash = 'difficult';
      app.categoryName.textContent = "Difficult words";
      app.categoryDesc.textContent = "There are most difficult words from last games. Click start play button to test youself";
      resetActive();
      this.setClass('menu_button menu_button_active');
      that.burg.click();
      drawCards(targetNode, base.getFiltered(function (it) {
        return it.getPercent() > 0;
      }).getSorted(function (a, b) {
        return b.getPercent() - a.getPercent();
      }).getFirstN(8)); // targetNode.innerHTML="";
      // base.getRandomized().getFirstN(2).words.forEach((jt)=>{
      //  new Card(targetNode, jt)
      // });
    });
    _this.statistic = new Button(parentNode, 'menu_button', 'statistic', function () {
      // that.currentMenuButton = this;
      window.location.hash = 'statistic';
      app.categoryName.textContent = "Statistics";
      app.categoryDesc.textContent = "Click table header to sort";
      resetActive(); //app.startButton.hide();
      //app.modeButton.hide();

      this.setClass('menu_button menu_button_active');
      that.burg.click();
      targetNode.innerHTML = '';
      new Statistic(targetNode, base); //  base.words.forEach((jt)=>{
      //    new Card(targetNode, jt)
      //  });
    });
    return _this;
  }

  _createClass(Menu, [{
    key: "redraw",
    value: function redraw(mode) {
      this.currentCards.forEach(function (it) {
        it.setMode(mode);
      });
    }
  }]);

  return Menu;
}(Button);

module.exports = Menu;

/***/ }),

/***/ "./src/statistic.js":
/*!**************************!*\
  !*** ./src/statistic.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Control = __webpack_require__(/*! ./control.js */ "./src/control.js");

var Button = __webpack_require__(/*! ./button.js */ "./src/button.js");

var Base = __webpack_require__(/*! ./base.js */ "./src/base.js");

var Statistic = /*#__PURE__*/function (_Control) {
  _inherits(Statistic, _Control);

  var _super = _createSuper(Statistic);

  function Statistic(parentNode, base) {
    var _this;

    _classCallCheck(this, Statistic);

    _this = _super.call(this, parentNode, 'table');
    _this.rows = [];

    var that = _assertThisInitialized(_this);

    _this.base = base.clone();

    var makeSorted = function makeSorted(comparator) {
      var baseWords = that.base.words.sort(comparator);
      var tr = new Control(that.node, 'tr');
      var bf;
      bf = new Control(tr.node, 'td');
      tr.category = new Button(bf.node, '', 'category', function () {
        that.drawSorted(function (a, b) {
          return a.category > b.category;
        });
      });
      bf = new Control(tr.node, 'td');
      tr.word = new Button(bf.node, '', 'word', function () {
        that.drawSorted(function (a, b) {
          return a.word > b.word;
        });
      });
      bf = new Control(tr.node, 'td');
      tr.translation = new Button(bf.node, '', 'translation', function () {
        that.drawSorted(function (a, b) {
          return a.translation > b.translation;
        });
      });
      bf = new Control(tr.node, 'td');
      tr.statUp = new Button(bf.node, '', 'statUp', function () {
        that.drawSorted(function (a, b) {
          return b.statUp - a.statUp;
        });
      });
      bf = new Control(tr.node, 'td');
      tr.statDown = new Button(bf.node, '', 'statDown', function () {
        that.drawSorted(function (a, b) {
          return b.statDown - a.statDown;
        });
      });
      bf = new Control(tr.node, 'td');
      tr.percent = new Button(bf.node, '', 'percent', function () {
        that.drawSorted(function (a, b) {
          return b.getPercent() - a.getPercent();
        });
      });
      baseWords.forEach(function (it) {
        var tr = new Control(that.node, 'tr');
        tr.category = new Control(tr.node, 'td', '', it.category);
        tr.word = new Control(tr.node, 'td', '', it.word);
        tr.translation = new Control(tr.node, 'td', '', it.translation);
        tr.statUp = new Control(tr.node, 'td', '', it.statUp.toString());
        tr.statDown = new Control(tr.node, 'td', '', it.statDown.toString());
        tr.percent = new Control(tr.node, 'td', '', it.getPercent().toString());
        that.rows.push(tr);
      });
    };

    makeSorted(function (a, b) {
      return b.statDown - a.statDown;
    });
    return _this;
  }

  _createClass(Statistic, [{
    key: "drawSorted",
    value: function drawSorted(comparator) {
      var baseWords = this.base.words.sort(comparator);
      this.rows.forEach(function (it, i) {
        // let tr = new Control(this.node, 'tr');
        it.category.render('', baseWords[i].category);
        it.word.render('', baseWords[i].word);
        it.translation.render('', baseWords[i].translation);
        it.statUp.render('', baseWords[i].statUp);
        it.statDown.render('', baseWords[i].statDown);
        it.percent.render('', baseWords[i].getPercent());
      });
    }
  }]);

  return Statistic;
}(Control);

module.exports = Statistic;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map