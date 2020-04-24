const Control = require('./control.component.js');
const Button = require('./button.component.js');
const Card = require('./card.component.js');
const Ext = require('./ext.component.js');
const Utils = require('./utils.js');

class App{
  constructor(dashBoardNode, extNode, levelsNode, scoreNode, controlsNode){
    const app=this;
    this.dashBoardNode=dashBoardNode;
    this.extNode=extNode;
    this.levelsNode=levelsNode;
    this.scoreNode=scoreNode;
    this.controlsNode=controlsNode;
    this.isGameStarted = false;

    let parentNode = dashBoardNode;
    this.failure = new Control(parentNode, 'audio', '', '');
    this.failure.node.src = 'assets/snd/' + 'failure.mp3';

    this.error = new Control(parentNode, 'audio', '', '');
    this.error.node.src = 'assets/snd/' + 'error.mp3';

    this.correct = new Control(parentNode, 'audio', '', '');
    this.correct.node.src = 'assets/snd/' + 'correct.mp3';

    this.success = new Control(parentNode, 'audio', '', '');
    this.success.node.src = 'assets/snd/' + 'success.mp3';

    this.ext = new Ext(extNode);
    
    this.speechOutputWrapper = new Control(extNode, 'div', 'extcard_wrapper');
    this.speechOutput = new Control(this.speechOutputWrapper.node,'div', 'extcard_item', ' - ');

    this.recognition = Utils.speechInit(app,
      (value, values)=>{
        let said = value;
        let ok = false;
        let okCard;
        //console.log(values.join(' '))
        this.cards.forEach((it)=>{
          let cur = it.cardData.word.trim();
          //console.log(cur);
          let ind = values.indexOf(cur);
          if (ind!=-1){
            if (!it.isMarked){
              said = cur;
              ok=true;
              okCard = it;
            }
          } 
        });

        if (ok){
          okCard.mark();
          new Control(app.scoreNode, 'div', 'star_item star_item_ok');
          this.correct.node.play();
        } else {
          //new Control(app.scoreNode, 'div', 'star_item star_item_err');
          //this.error.node.play();
        }
        this.speechOutput.node.textContent='You said: ' + said;
        //console.log(value);
      },
      (message)=>{
        this.speechOutput.node.textContent=message;
        //console.log(message);
      }
    );

    this.levelButtons=[];
    this.currentLevelButtonIndex=-1;
    for (let i=0; i<6; i++){
      let el = new Button(levelsNode, 'basic_button', (i+1).toString(), true, function(){
        app.levelButtons.forEach((it)=>{
          if (this!=it) {
            it.untoggle();
          }
        });
        app.currentLevelButtonIndex=i;
        app.refreshCards(app.currentLevelButtonIndex);
        app.levelButtons[app.currentLevelButtonIndex].toggle();
      });
      this.levelButtons.push(el);
    }
    this.levelButtons[0].click();
    this.levelButtons[0].toggle();

    const startCaption = 'Start Game';
    const stopCaption = 'Stop Game';
    this.startPlayButton = new Button(this.controlsNode, 'basic_button', startCaption, true, function(){
      if (!this.isToggled){
        this.node.textContent=startCaption;
        app.gameStop();
        app.cards.forEach((it)=>{it.setTrainMode()});
      } else {
        this.node.textContent=stopCaption;
        app.gameStart();
        app.cards.forEach((it)=>{it.setPlayMode()});
      }
    });

    this.resultsButton = new Button(this.controlsNode, 'basic_button', 'Results', true, function(){

    });
  }
  
  gameStart(){
    if (!this.isGameStarted){
      this.isGameStarted = true;
      this.recognition.start(); 
      app.scoreNode.innerHTML=""; 
    }
  }

  gameStop(){
    if (this.isGameStarted){
      this.isGameStarted = false;
      this.recognition.stop(); 
      app.scoreNode.innerHTML="";  
    }
  }

  refreshCards(group){
    this.cards=[];
    this.dashBoardNode.innerHTML='';
    let page = Math.trunc(Math.random()*30);
    getServerDataJSON(page,group,(res)=>{
      if (res && Array.isArray(res)){
        res.forEach((it)=>{
          let card = new Card(this.dashBoardNode, it, ()=>{
            this.ext.refresh(it);
          });  
          this.cards.push(card);
        })
        this.ext.refresh(res[0]);
      }
    });
  }
}


function getServerDataJSON(page, group, onLoad, onError){
    let url = `https://afternoon-falls-25894.herokuapp.com/words?group=${group}&page=${page}`;
    Utils.sendGetRequest(url, onLoad, onError);
}



module.exports = App;