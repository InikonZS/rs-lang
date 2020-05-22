function speechInit(onResult, onError) {
  const MySpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition;
  if (!MySpeechRecognition) {
    onError('not found SpeechRecognition');
    return false;
  }

  const recognition = new MySpeechRecognition();
  recognition.lang = 'en-US';
  // recognition.continuous=true;
  recognition.maxAlternatives = 95;

  recognition.addEventListener('result', (event) => {
    const values = [];
    const lastResult = event.results[event.results.length - 1];
    for (let i = 0; i < lastResult.length; i++) {
      values.push(lastResult[i].transcript.toLowerCase().trim());
    }
    const value = lastResult[lastResult.length - 1].transcript.toLowerCase().trim();
    onResult(value, values);
  });
  // Mozilla continuois problem solution
  recognition.addEventListener('end', (event) => {

    /*   if (app.isGameStarted) {
      recognition.start();
    } */
  });

  // if (app.isGameStarted) {
  //   recognition.start();
  // }
  return recognition;
}

function voiceText(text) {
  const ss = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(ss);
}

module.exports = {
  speechInit,
  voiceText,
};
