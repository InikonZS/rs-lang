const Base = require('./base.js');
const Button = require('./button.js');
const Card = require('./card.js');

class Game{
  constructor(parentNode, seqBase){
    this.base = seqBase.getRandomized();
    this.seqScore = [];
    this.mistakeCount = 0;
    this.incorrectWords = new Base();
    this.correctWords = new Base();
    this.base.getRandomized().words.forEach((it)=>{
    let that = this;
      new Card(parentNode, it, function (){
        if (that.step(it)) {this.hide()};
      });  
    });
   
    
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
        console.log('ok');
        res = true;
      } else {
        this.incorrectWords.pushUnuq(cur);
        this.mistakeCount++;
        cur.statDown++;
        this.seqScore.push(false);
        console.log('no');
      }
      
      if (this.base.words.length == 0){
        this.finish();
      }
    }
    return res;
  }

  finish(){
    console.log('fin');
    let res = {};
    res.cancel = !!this.base.words.length;
    return res;
    
  }
}

module.exports = Game;