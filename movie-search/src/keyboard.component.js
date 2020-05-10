const rows = [
  'Backquote Digit1 Digit2 Digit3 Digit4 Digit5 Digit6 Digit7 Digit8 Digit9 Digit0 Minus Equal Backspace Home',
  'Tab KeyQ KeyW KeyE KeyR KeyT KeyY KeyU KeyI KeyO KeyP BracketLeft BracketRight Backslash PageUp',
  'CapsLock KeyA KeyS KeyD KeyF KeyG KeyH KeyJ KeyK KeyL Semicolon Quote Enter PageDown',
  'ShiftLeft KeyZ KeyX KeyC KeyV KeyB KeyN KeyM Comma Period Slash ShiftRight ArrowUp End',
  'App ControlLeft OSLeft AltLeft Space AltRight ContextMenu ControlRight ArrowLeft ArrowDown ArrowRight',
];
const chars = ([
  '` 1 2 3 4 5 6 7 8 9 0 - = Backspace Home',
  'Tab Q W E R T Y U I O P [ ] \\ PgUp',
  'CapsLock A S D F G H J K L ; \' Enter PgDn',
  'Shift Z X C V B N M , . / Shift Up End',
  'App Ctrl OS Alt Space Alt Menu Ctrl <- Down ->',
]).map((it) => it.split(' '));

const chars_en_down = '`1234567890-=qwertyuiop[]\\asdfghjkl;\'zxcvbnm,./';
const chars_en_up = '`1234567890-=QWERTYUIOP[]\\ASDFGHJKL;\'ZXCVBNM,./';
const chars_en_sh = '~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:"ZXCVBNM<>?';

const chars_ru_down = '`1234567890-=йцукенгшщзхъ\\фывапролджэячсмитьбю.';
const chars_ru_up = '`1234567890-=ЙЦУКЕНГШЩЗХЪ\\ФЫВАПРОЛДЖЭЯЧСМИТЬБЮ.';
const chars_ru_sh = '~!"№;%:?*()_+ЙЦУКЕНГШЩЗХЪ/ФЫВАПРОЛДЖЭЯЧСМИТЬБЮ,';

const down = 'down';
const up = 'up';
const sh = 'sh';

let cur = down;

const lang = [{
  down: chars_en_down,
  up: chars_en_up,
  sh: chars_en_sh,
},
{
  down: chars_ru_down,
  up: chars_ru_up,
  sh: chars_ru_sh,
}];

function changeKeyCharset(parentNode, st, ch) {
  const elem = parentNode.querySelector(`#${st}`);
  elem.innerText = ch;
  elem.dt = ch;
}

function change(ch, keyboard) {
  rows.forEach((it, i) => {
    it.split(' ').forEach((jt, j) => {
      let chr = chars[i][j];
      if (chr.length == 1) {
        chr = ch[chars_en_up.indexOf(chr)];
      }
      changeKeyCharset(keyboard, jt, chr);
    });
  });
}

function change_(mode, keyboard) {
  cur = mode;
  change(lang[currentLang][mode], keyboard);
}

// / Copyright label for github search. Written by Inikon. Code="11-00-11-21-FA-CC-DD".
// /

// / Text Area Utils

function insertString(textAreaDOMElement, insertionString) {
  const el = textAreaDOMElement;
  const	ins = insertionString;

  let res;
  //	el.focus();
  const st = el.value;
  const ss = el.selectionStart;
  const se = el.selectionEnd;
  res = st.substring(0, ss) + ins + st.substring(se);
  el.value = res;
  el.selectionStart = ss + 1;
  el.selectionEnd = ss + 1;
  return res;
}

function backSpaceString(el) {
  let res;
  const st = el.value;
  const ss = el.selectionStart;
  const se = el.selectionEnd;
  if (ss == se) {
    res = st.substring(0, ss - 1) + st.substring(se);
    el.value = res;
    el.selectionStart = ss - 1; el.selectionEnd = ss - 1;
  } else {
    res = st.substring(0, ss) + st.substring(se);
    el.value = res;
    el.selectionStart = ss;
    el.selectionEnd = ss;
  }
  return res;
}

function moveCursor(el, sh) {
  if (shiftState) {
    if (el.selectionStart + sh >= 0) {
      el.selectionStart += sh;
      el.selectionEnd = el.selectionStart;
    }
  } else if (el.selectionStart <= el.selectionEnd) {
    if (el.selectionEnd + sh >= 0) {
      el.selectionEnd += sh;
    }
  }
//	el.blur();
}

// // create DOM functons

function makeButton(parentNode, st, ch) {
  const elem = document.createElement('div');
  elem.className = 'key-button';
  elem.addEventListener('mousedown', buttonOnDown);
  elem.addEventListener('mouseup', buttonOnUp);
  elem.addEventListener('mouseleave', buttonOnLeave);
  elem.id = st;
  elem.onselectstart = () => false;
  elem.innerText = ch;
  elem.dt = ch;
  parentNode.appendChild(elem);
  return elem;
}

function makeRow(parentNode, st) {
  const elem = document.createElement('div');
  elem.className = 'key-row';
  elem.id = st;
  parentNode.appendChild(elem);
  return elem;
}

function makeKeyboard(parentNode) {
  const elem = document.createElement('div');
  elem.className = 'key-board';
  parentNode.appendChild(elem);
  return elem;
}

function makeElement(parentNode, tagName, className) {
  const elem = document.createElement(tagName);
  elem.className = className;
  parentNode.appendChild(elem);
  return elem;
}


function keyOnDown(event) {
  const targ = document.querySelector(`#${event.code}`);
  if (targ.dt && targ.dt.length == 1) {
    insertString(el, targ.dt);
  } else {
    keyDoDown(event.code, false, keyboard);
  }
  if (targ) {
    targ.className = 'key-button key-button-active';
  }
}

function keyOnUp(event) {
  // console.log(event);
  // el.innerText+=event.keyCode;
  const targ = document.querySelector(`#${event.code}`);
  if (targ) {
    targ.className = 'key-button';
  }
  keyDoUp(event.code, false, keyboard);
}

function stateButtonProc(event) {
  if (event.target.dt == 'Alt') {
    altState
      ? event.target.className = 'key-button'
      : event.target.className = 'key-button key-button-active';
  }
  if (event.target.dt == 'Shift') {
    shiftState
      ? event.target.className = 'key-button'
      : event.target.className = 'key-button key-button-active';
  }
  if (event.target.dt == 'Ctrl') {
    controlState
      ? event.target.className = 'key-button'
      : event.target.className = 'key-button key-button-active';
  }
}

function buttonOnDown(event) {
  // el.focus();
  event.preventDefault();
  if (event.target.dt.length == 1) {
    insertString(el, event.target.dt);
  } else {
    keyDoDown(event.target.id, true, keyboard);
  }
  stateButtonProc(event);
  event.target.className = 'key-button key-button-active';

  el.focus();
  // return false;
}
function buttonOnUp(event) {
  // el.focus();
  keyDoUp(event.target.id, true, keyboard);
  event.target.className = 'key-button';
  stateButtonProc(event);
}

function buttonOnLeave(event) {
  event.target.className = 'key-button';
  stateButtonProc(event);
  // return false;
}

function keyDoUp(code, virtual, keyboard) {
  // let sls=el.selectionStart;
  switch (code) {
    case 'ShiftLeft':
      if (!altState) {
        currentLang = (currentLang + 1) % 2;
        localStorage.setItem('lang', currentLang);
        change_(cur, keyboard);
        shiftState = true;
        if (virtual) { break; }
      }
      if (virtual) {
        (shiftState == false) ? change_(down, keyboard) : change_(sh, keyboard);
        shiftState = !shiftState;
      } else {
        shiftState = true;
        change_(down, keyboard);
      }
      break;

    case 'AltLeft':
      if (!shiftState) {
        currentLang = (currentLang + 1) % 2;
        localStorage.setItem('lang', currentLang);
        change_(cur, keyboard);
        altState = true;
        if (virtual) { break; }
      }

      if (virtual) {
        altState = !altState;
      } else {
        altState = true;
      }
      break;

    case 'ControlLeft':
      if (virtual) {
        controlState = !controlState;
      } else {
        controlState = true;
      }
      break;

    case 'CapsLock':
      capsLockState = (capsLockState + 1) % 2;
      (capsLockState == 0) ? change_(down, keyboard) : change_(up, keyboard);
      break;

    case 'App':
      currentLang = (currentLang + 1) % 2;
      localStorage.setItem('lang', currentLang);
      change_(cur, keyboard);
      break;

    default:
  }
  el.focus();
}
function keyDoDown(code, virtual, keyboard) {
  switch (code) {
    case 'Backspace': backSpaceString(el); break;
    case 'ShiftLeft':
      if (!virtual) {
        shiftState = false;
        change_(sh, keyboard);
      }
      break;
    case 'AltLeft':
      if (!virtual) {
        altState = false;
      }
      break;
    case 'ControlLeft':
      if (!virtual) {
        controlState = false;
      }
      break;
    case 'Enter':
      if (onEnter) {
        onEnter();
      } else {
        insertString(el, '\n');
      }
      break;
    case 'Space': insertString(el, ' '); break;
    case 'Tab': insertString(el, '\t'); break;
    case 'ArrowLeft': moveCursor(el, -1); break;
    case 'ArrowRight': moveCursor(el, 1); break;
    default:
  }
  el.focus();
}


function getCurrentLang() {
  let langValue = localStorage.getItem('lang');
  if (langValue === null) {
    localStorage.setItem('lang', 0);
    langValue = 0;
  }
  return langValue;
}

// / Application Start Point =>

var shiftState = true;
var altState = true;
var controlState = true;
var capsLockState = 0;
var currentLang = +getCurrentLang();

let mainWindow;
let el;

let keyboard;
let hint;

let onEnter;


class Keyboard	{
  constructor(parentNode, outputNode, showHint, onEnter_) {
    this.node = parentNode;
    this.isDisabled = false;
    onEnter = onEnter_;
    mainWindow = parentNode;
    console.log(mainWindow);
    if (!outputNode) {
      el = makeElement(mainWindow, 'textarea', 'output');
    }	else {
      el = outputNode;
    }

    keyboard = makeKeyboard(mainWindow);
    this.keyboard = keyboard;
    if (showHint) {
      hint = makeElement(mainWindow, 'div', 'hint');
      hint.textContent = 'Use left Alt + Shift or left Shift + Alt or virtual App button for change language.';
    }
    document.addEventListener('keydown', (e) => {
      if (!this.isDisabled) {
        keyOnDown(e);
      }
    });
    document.addEventListener('keyup', (e) => {
      if (!this.isDisabled) {
        keyOnUp(e);
      }
    });
    rows.forEach((it, i) => {
      const row = makeRow(keyboard, `row${i}`);
      it.split(' ').forEach((jt, j) => {
        makeButton(row, jt, chars[i][j]);
      });
    });

    change_(cur, keyboard);
  }

  hide() {
    this.isDisabled = true;
    this.keyboard.style = 'display:none';
    el.onkeydown = undefined;
  }

  show() {
    this.isDisabled = false;
    this.keyboard.style = '';
    el.onkeydown = () => false;
  }
}


module.exports = Keyboard;
