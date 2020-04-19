const Base = require('./base.js');
const Button = require('./button.js');
const ButtonEx = require('./buttonEx.js');
const Control = require('./control.js');
const Card = require('./card.js');

class Game {
  constructor(app, parentNode, seqBase) {
    this.base = seqBase.getRandomized();
    if (seqBase.words.length != 0) {
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

      app.startButton.hide();
      this.repeatButton = new ButtonEx(this.gameContolNode, 'start_button', 'repeat word', false, () => {
        this.sounds[this.base.words.length - 1].node.play();
      });
      this.gameScoreNode = app.gameScore;
      this.gameScoreNode.innerHTML = '';

      // this.globalError = app.error;

      this.failure = new Control(parentNode, 'audio', '', '');
      this.failure.node.src = 'assets/snd/' + 'failure.mp3';

      this.error = new Control(parentNode, 'audio', '', '');
      this.error.node.src = 'assets/snd/' + 'error.mp3';

      this.correct = new Control(parentNode, 'audio', '', '');
      this.correct.node.src = 'assets/snd/' + 'correct.mp3';

      this.success = new Control(parentNode, 'audio', '', '');
      this.success.node.src = 'assets/snd/' + 'success.mp3';

      let winImgWrapper = new Control(this.finishWindow.node, 'win_wrapper', '', '');
      this.winImg = new Control(winImgWrapper.node, 'img', 'ico_big', '');
      this.winImg.node.src = 'assets/ico/' + 'win.webp';
      this.winImg.hide();
      this.loseImg = new Control(winImgWrapper.node, 'img', 'ico_big', '');
      this.loseImg.node.src = 'assets/ico/' + 'lose.webp';
      this.loseImg.hide();
      this.winMsg = new Control(this.finishWindow.node, 'div', '', '');

      this.sounds = [];
      this.base.words.forEach((it) => {
        const aud = new Control(parentNode, 'audio', '', '');
        aud.node.src = `assets/${it.audioSrc}`;
        this.sounds.push(aud);
      });

      this.seqScore = [];
      this.mistakeCount = 0;
      this.incorrectWords = new Base();
      this.correctWords = new Base();
      this.base.getRandomized().words.forEach((it) => {
        const that = this;
        const el = new Card(parentNode, it, function () {
          if (that.step(it)) { this.disable(); }
        }).setPlayMode();
      });

      this.sounds[this.base.words.length - 1].node.play();
    } else {
      parentNode.textContent = 'Cannot start game, category is empty. Try to select another category';
      this.finished = true;
    }
  }

  step(wordRecord) {
    let res = false;
    const cur = this.base.words[this.base.words.length - 1];
    if (cur && !this.correctWords.contains(cur)) {
      if (cur.hash == wordRecord.hash) {
        this.correctWords.pushUnuq(cur);
        this.base.words.pop();
        cur.statUp++;
        this.base.saveChanges(cur);
        this.seqScore.push(true);
        // console.log('ok');
        res = true;
        new Control(this.gameScoreNode, 'div', 'star_item star_item_ok');
        this.correct.node.onended = () => {
          if (this.base.words.length) {
            this.sounds[this.base.words.length - 1].node.play();
          }
        };
        this.correct.node.play();
      } else {
        this.incorrectWords.pushUnuq(cur);
        this.mistakeCount++;
        cur.statDown++;
        this.base.saveChanges(cur);
        this.seqScore.push(false);
        // console.log('no');
        new Control(this.gameScoreNode, 'div', 'star_item star_item_err');
        this.error.node.play();
      }

      if (this.base.words.length == 0) {
        this.finish();
      } else {
        // this.sounds[this.base.words.length-1].node.play();
      }
    }
    return res;
  }

  finish() {
    console.log('fin');
    if (!this.base.words.length) {
      if (this.mistakeCount) {
        const wordList = this.incorrectWords.words.map((it) => it.word).join(', ');
        this.winMsg.node.textContent = `You have ${this.mistakeCount} errors in words: ${wordList}`;
        this.loseImg.show();
        this.failure.node.play();
      } else {
        this.winMsg.node.textContent = 'You are win';
        this.winImg.show();
        this.success.node.play();
      }
      this.finishBack.show();
    } else {
      // this.error.node.play();
    }
    this.finished = true;
    this.gameContolNode.innerHTML = '';
    this.gameScoreNode.innerHTML = '';


    // let res = {};
    // res.cancel = !!this.base.words.length;
    // return res;
  }
}

module.exports = Game;
