function speechInit(app, onResult, onError){
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
      let values=[];
      let lastResult = event.results[event.results.length-1];
      for (let i=0; i<lastResult.length; i++){
        values.push(lastResult[i].transcript.toLowerCase().trim());
      }
      let value = lastResult[lastResult.length-1].transcript.toLowerCase().trim();
      onResult(value, values);
    }
  );
  // Mozilla continuois problem solution
  recognition.addEventListener('end' , (event) => {
    if (app.isGameStarted) {
      recognition.start();  
    }
  });

  if (app.isGameStarted) {
    recognition.start();  
  }
  return recognition;
}


function sendGetRequest(URL, onLoad, onError){
  let httpRequest = new XMLHttpRequest();
    
    httpRequest.onload = function() {
      if (onLoad){
        onLoad(JSON.parse(httpRequest.response));
      }
    };
    
    httpRequest.onerror = function() {
      if (onError){
        onError();
      }
    };
    
    httpRequest.open('GET', URL);
    httpRequest.send();  
}

const defaultRejectMessage = 'not found';

const translateApiCode =  `trnsl.1.1.20200322T155651Z.de98a60e6a99185e.089aea4237b51c6db082c966f27a7895cd1e8b44`;
const translateApiURL = `https://translate.yandex.net/api/v1.5/tr.json/translate`;
const getTranslateRequestURL = function (word) {
  let url = `${translateApiURL}?key=${translateApiCode}&text=${word}&lang=en-ru`;
  return url;
}

const mediaDataURL = 'https://raw.githubusercontent.com/irinainina/rslang-data/master/data/';
const getMediaURL = function (imagePath){
  let s = (imagePath.split('/'))[1];
  let url = mediaDataURL + s;
  return url;
}

const Utils = {
  sendGetRequest,
  defaultRejectMessage,
  translateApiCode,
  translateApiURL,
  getTranslateRequestURL,
  mediaDataURL,
  getMediaURL,
  speechInit
}

module.exports = Utils;