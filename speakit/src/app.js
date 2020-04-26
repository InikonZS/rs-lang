const Control = require('./control.component.js');
const Button = require('./button.component.js');
const Card = require('./card.component.js');
const Ext = require('./ext.component.js');
const Record = require('./record.component.js');
const Table = require('./table.component.js');
const Utils = require('./utils.js');

class App{
  constructor(dashBoardNode, extNode, levelsNode, scoreNode, controlsNode, appScreenNode, statisticScreenNode, startScreenNode, nextButtonNode ){
    const app=this;
    this.dashBoardNode=dashBoardNode;
    this.extNode=extNode;
    this.levelsNode=levelsNode;
    this.scoreNode=scoreNode;
    this.controlsNode=controlsNode;
    this.statisticScreenNode=statisticScreenNode;
    this.appScreenNode=appScreenNode;
    this.startScreenNode=startScreenNode;
    this.nextButtonNode=nextButtonNode;
    this.isGameStarted = false;
    this.gameCounter = 0;

    loadSystemSound(this, dashBoardNode);

    this.ext = new Ext(extNode);
    
    this.speechOutputWrapper = new Control(extNode, 'div', 'said_wrapper');
    this.microIcon = new Control(this.speechOutputWrapper.node, 'div', 'icon micro basic_button');
    this.speechOutput = new Control(this.speechOutputWrapper.node,'div', 'extcard_item', ' - ');

    this.recognition = Utils.speechInit(app,
      (value, values)=>{
        let said = value;
        let ok = false;
        let okCard;
        this.cards.forEach((it)=>{
          let cur = it.cardData.word.trim().toLowerCase();
          let ind = values.indexOf(cur);
          if (ind!=-1){
            said = cur;
            if (!it.isMarked){
              said = cur;
              ok=true;
              okCard = it;
            }
          } 
        });

        if (ok){
          okCard.mark();
          okCard.click();
          new Control(app.scoreNode, 'div', 'star_item star_item_ok');
          this.correct.node.play();
          this.gameCounter++;
          statWrite(okCard);
          if (this.gameCounter==this.cards.length){
            this.startPlayButton.untoggle();
            this.startPlayButton.click();
            this.success.node.play();
            let nextLevelButton = this.levelButtons[this.currentLevelButtonIndex+1];
            if (nextLevelButton){
              nextLevelButton.click();
            }
          }
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
        app.refreshCards(app.currentLevelButtonIndex, 12);
        app.levelButtons[app.currentLevelButtonIndex].toggle();
        app.startPlayButton.untoggle();
        app.startPlayButton.click();
      });
      this.levelButtons.push(el);
    }
    

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
    
    
    this.nextButton = new Button(nextButtonNode, 'basic_button', 'Get Started', false, function(){
      app.startScreen.animate(false, 'transform: translateX(-100%)');
      app.statisticScreen.animate(false, 'transform: translateX(100%)');
      app.appScreen.animate(false, 'transform: translateX(0px)');  
    })

    this.resultsButton = new Button(this.controlsNode, 'basic_button', 'Results', false, function(){
      statRender(app, app.statisticScreenNode);
      app.startScreen.animate(false, 'transform: translateX(-100%)');
      app.statisticScreen.animate(false, 'transform: translateX(0px)');
      app.appScreen.animate(false, 'transform: translateX(-100%)');
      
    });
    
    this.focusAppPage =  function(){
      app.startScreen.animate(false, 'transform: translateX(-100%)');
      app.statisticScreen.animate(false, 'transform: translateX(100%)');
      app.appScreen.animate(false, 'transform: translateX(0px)');  
    }

    this.statisticScreen = new Control (this.statisticScreenNode, 'div', 'page', '', false, true);

    this.appScreen = new Control (this.appScreenNode, 'div', 'page', '', false, true);
    this.startScreen = new Control(startScreenNode, 'div', 'start_page', '', false, true);
    this.startScreen.node.style='transform: translateX(0%)';
    this.appScreen.node.style='transform: translateX(100%)';
    this.statisticScreen.node.style='transform: translateX(100%)';


    this.levelButtons[0].click();
    this.levelButtons[0].toggle();
  }
  
  gameStart(){
    if (!this.isGameStarted){
      this.isGameStarted = true;
      this.recognition.start(); 
      app.scoreNode.innerHTML=""; 
      this.gameCounter = 0;
    }
  }

  gameStop(){
    if (this.isGameStarted){
      this.isGameStarted = false;
      this.recognition.stop(); 
      gameStatWrite(this);
      app.scoreNode.innerHTML="";  
    }
  }

  refreshCards(group, count=20){
    this.cards=[];
    this.dashBoardNode.innerHTML='';
    let page = Math.trunc(Math.random()*30);
    getServerDataJSON(page,group,(res)=>{
      if (res && Array.isArray(res)){
        res.forEach((it, i)=>{
          if (i<count){
            let card = new Card(this.dashBoardNode, it, function(){
              app.cards.forEach((jt)=>{jt.unselect();})
              this.select();
              app.ext.refresh(it);
            });  
            this.cards.push(card);
          }
        })
        if (this.cards[0]){
          this.cards[0].click();
        }
      }
    });
  }
}

function loadSystemSound(app, parentNode){
    app.failure = new Control(parentNode, 'audio', '', '');
    app.failure.node.src = 'assets/snd/' + 'failure.mp3';

    app.error = new Control(parentNode, 'audio', '', '');
    app.error.node.src = 'assets/snd/' + 'error.mp3';

    app.correct = new Control(parentNode, 'audio', '', '');
    app.correct.node.src = 'assets/snd/' + 'correct.mp3';

    app.success = new Control(parentNode, 'audio', '', '');
    app.success.node.src = 'assets/snd/' + 'success.mp3';
}

function getServerDataJSON(page, group, onLoad, onError){
    let url = `https://afternoon-falls-25894.herokuapp.com/words?group=${group}&page=${page}`;
    Utils.sendGetRequest(url, onLoad, onError);
}

function findWord(statArray, word){
  for (let i=0; i<statArray.length; i++){
    if (statArray[i].word == word){
      return i;
    }
  }
  return -1;
}


function gameStatRead(){
  let statString = window.localStorage.getItem('gameStat');
  let stat;
  if (statString!==null){
    stat = JSON.parse(statString);
  } else {
    stat = [];
  }
  return stat;
}

function gameStatWrite(app){
  let stat = gameStatRead();
  let rec = {};
  let date = new Date(Date.now());
  rec.index = stat.length;
  rec.date = date.toLocaleString();
  rec.correctCount=app.gameCounter;
  rec.incorrectCount=12 - app.gameCounter;
  rec.finished = rec.incorrectCount ? 'no':'yes';
  stat.push(rec);
  statString = JSON.stringify(stat);
  window.localStorage.setItem('gameStat', statString);
}



function addWordToStat(statArray, word){
  let rec = {};
  rec.word = word;
  let recIndex = findWord(statArray, word);
  if (recIndex == -1){
    rec.count = 1;
    statArray.push(rec);
  } else {
    +statArray[recIndex].count++;
  }
}

function statRead(){
  let statString = window.localStorage.getItem('wordStat');
  let stat;
  if (statString!==null){
    stat = JSON.parse(statString);
  } else {
    stat = [];
  }
  return stat;
}

function statWrite(card){
  let stat = statRead();
  addWordToStat(stat, card.cardData.word);
  statString = JSON.stringify(stat);
  window.localStorage.setItem('wordStat', statString);
}

function statRender(app, parentNode){
  parentNode.innerHTML='';
  let controlStat = new Control (parentNode, 'div', 'controls_wrapper');
  let statReturnButton = new Button (controlStat.node, 'basic_button','back to Game', false, function(){
    app.focusAppPage();  
  });
  let statResetButton = new Button (controlStat.node, 'basic_button','reset', false, function(){
    window.localStorage.clear();
    statRender(app, parentNode);
  });
  new Control (parentNode, 'div', 'medium_font', 'Current Game: ');
  if (app.isGameStarted){
    let currentStat = new Control (parentNode, 'div', 'main_font', '');
    if (app.gameCounter){
      new Control (parentNode, 'div', 'main_font', 'Correct speaked:');
    }
    let correctWrapper = new Control (parentNode, 'div', 'dash_wrapper', '');
    app.cards.forEach((it)=>{
      if (it){
        if (it.isMarked){
          new Card(correctWrapper.node, it.cardData);
        }
      }  
    });
    if (app.cards.length-app.gameCounter){
      new Control (parentNode, 'div', 'main_font', 'Still not speaked:');
    }
    let incorrectWrapper = new Control (parentNode, 'div', 'dash_wrapper', '');
    app.cards.forEach((it)=>{
      if (it){
        if (!it.isMarked){
          new Card(incorrectWrapper.node, it.cardData);
        }
      }  
    });
    currentStat.node.textContent = `Correct: ${app.gameCounter}. Still not speaked: ${app.cards.length-app.gameCounter}`;
  } else {
    new Control (parentNode, 'div', 'main_font', 'not started');
  }
  

  let gameStatData = gameStatRead();
  new Control (parentNode, 'div', 'medium_font', 'Last Game Statistics: ');
  let sumGameStat = new Control (parentNode, 'div', 'main_font', '');
  if (gameStatData.length){
    new Table(parentNode,'',gameStatData, ['№', 'data', '+', '-', 'win']);
  }
  let winCount=0;
  gameStatData.forEach((it)=>{
    if (it.win=='yes'){
      winCount++;
    }
  });
  sumGameStat.node.textContent = `Played games: ${gameStatData.length}. Win games: ${winCount}`;

  new Control (parentNode, 'div', 'medium_font', 'Word Statistics: ');
  let sumStat = new Control (parentNode, 'div', 'main_font', '');
  let recList = statRead();
  let sumCount=0;
  recList.forEach((it)=>{
    if (it){
    //  new Record(parentNode, it);
      sumCount+=(+it.count);
    }  
  });
  if (recList.length){
    new Table(parentNode,'',recList,['word', 'score']);
  }
  sumStat.node.textContent = `Word known: ${recList.length}. Correct speaked: ${sumCount} times`
}



module.exports = App;