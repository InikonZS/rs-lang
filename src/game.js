const Base = require('./base.js');
const Button = require('./button.js');
const Control = require('./control.js');
const Card = require('./card.js');

class Game{
  constructor(app, parentNode, seqBase){
    this.base = seqBase.getRandomized();

    this.finishBack = new Button(parentNode, 'dash_modal', '', function(){
      app.menu.main.click();
      app.menu.burg.click();
      this.hide();
    });
    this.finishBack.hide();
    this.finishWindow = new Control(this.finishBack.node, 'div', 'dash_modal_window', '',);

    this.gameContolNode = app.gameContol;
    this.gameContolNode.innerHTML='';
    this.repeatButton = new Button(this.gameContolNode, 'menu_button', 'repeat word',()=>{
      this.sounds[this.base.words.length-1].node.play();  
    });
    this.gameScoreNode = app.gameScore;
    this.gameScoreNode.innerHTML='';

    this.failure = new Control(parentNode, 'audio','','');
    this.failure.node.src='assets/audio/'+'failure.mp3';

    this.error = new Control(parentNode, 'audio','','');
    this.error.node.src='assets/audio/'+'error.mp3';

    this.correct = new Control(parentNode, 'audio','','');
    this.correct.node.src='assets/audio/'+'correct.mp3';

    this.success = new Control(parentNode, 'audio','','');
    this.success.node.src='assets/audio/'+'success.mp3';

    this.sounds = [];
    this.base.words.forEach((it)=>{
      let aud = new Control(parentNode, 'audio','','');
      aud.node.src='assets/'+it.audioSrc;
      this.sounds.push(aud);
    });
    
    this.seqScore = [];
    this.mistakeCount = 0;
    this.incorrectWords = new Base();
    this.correctWords = new Base();
    this.base.getRandomized().words.forEach((it)=>{
      let that = this;
      let el = new Card(parentNode, it, function (){
        if (that.step(it)) {this.disable()};
      }).setPlayMode(); 
    });

    this.sounds[this.base.words.length-1].node.play();
  }

  step(wordRecord){
    let res = false;
    let cur = this.base.words[this.base.words.length-1];
    if (cur && !this.correctWords.contains(cur)){
      if (cur.hash == wordRecord.hash){
        this.correctWords.pushUnuq(cur);
        this.base.words.pop();
        cur.statUp++;
        this.seqScore.push(true);
       // console.log('ok');
        res = true;
        new Control(this.gameScoreNode, 'div', 'star_item star_item_ok');
        this.correct.node.onended = ()=>{
          if (this.base.words.length){
            this.sounds[this.base.words.length-1].node.play();
          }
        }
        this.correct.node.play();
      } else {
        this.incorrectWords.pushUnuq(cur);
        this.mistakeCount++;
        cur.statDown++;
        this.seqScore.push(false);
        //console.log('no');
        new Control(this.gameScoreNode, 'div', 'star_item star_item_err');
        this.error.node.play();

      }
      
      if (this.base.words.length == 0){
        this.finish();
      } else {
        //this.sounds[this.base.words.length-1].node.play();
      }
    }
    return res;
  }

  finish(){
    console.log('fin');
    if (this.mistakeCount){
      let wordList = this.incorrectWords.words.map((it)=>it.word).join(', ');
      this.finishWindow.node.textContent = `You have ${this.mistakeCount} errors in words: ${wordList}`;
      this.failure.node.play();
    } else {
      this.finishWindow.node.textContent = "You are win";
      this.success.node.play();
    }
    this.gameContolNode.innerHTML='';
    this.gameScoreNode.innerHTML='';
    this.finishBack.show();

    let res = {};
    res.cancel = !!this.base.words.length;
    return res;
    
  }
}

module.exports = Game;