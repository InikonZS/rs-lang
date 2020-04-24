const Control = require('./control.component.js');
const Button = require('./button.component.js');
const Card = require('./card.component.js');
const Ext = require('./ext.component.js');
const Utils = require('./utils.js');

class App{
  constructor(dashBoardNode, extNode){
    this.ext = new Ext(extNode);
    this.cards=[];
    getServerDataJSON(1,1,(res)=>{
      if (res && Array.isArray(res)){
        res.forEach((it)=>{
          let card = new Card(dashBoardNode, it, ()=>{
            this.ext.refresh(it);
          });  
          this.cards.push(card);
        })
        this.ext.refresh(res[0]);
      }
    });

    this.speechOutputWrapper = new Control(extNode, 'div', 'extcard_wrapper');
    this.speechOutput = new Control(this.speechOutputWrapper.node,'div', 'extcard_item', ' - ');

    this.recognition = speechInit(
      (value, values)=>{
        let said = value;
        console.log(values.join(' '))
        this.cards.forEach((it)=>{
          let cur = it.cardData.word.trim();
          console.log(cur);
          let ind = values.indexOf(cur);
          if (ind!=-1){
            said = cur;
            it.node.classList.add('card_correct');
          }
        });
        this.speechOutput.node.textContent='You said: ' + said;
        console.log(value);
      },
      (message)=>{
        this.speechOutput.node.textContent=message;
        console.log(message);
      }
    );
  }
   
}

function getServerDataJSON(page, group, onLoad, onError){
    let url = `https://afternoon-falls-25894.herokuapp.com/words?group=${group}&page=${page}`;
    Utils.sendGetRequest(url, onLoad, onError);
}

function speechInit(onResult, onError){
  const MySpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition;
  if (!MySpeechRecognition){
    onError('not found SpeechRecognition');
    return false;
  }

  let recognition = new MySpeechRecognition();
  recognition.lang = 'en-US';
  recognition.continuous=true;
  recognition.maxAlternatives = 95;

  recognition.addEventListener('result' , (event) => {
     // console.log(event.results);
      let values=[];
      let lastResult = event.results[event.results.length-1];
      for (let i=0; i<lastResult.length; i++){
        values.push(lastResult[i].transcript.toLowerCase().trim());
      }
      let value = lastResult[lastResult.length-1].transcript.toLowerCase().trim();
      onResult(value, values);
    }
  );

  recognition.addEventListener('end' , (event) => {
    recognition.start();  
  });

  recognition.start();
  return recognition;
}



module.exports = App;