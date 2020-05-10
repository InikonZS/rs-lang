function sendGetRequest(URL, onLoad, onError) {
  const httpRequest = new XMLHttpRequest();

  httpRequest.onload = function () {
    if (onLoad) {
      onLoad(JSON.parse(httpRequest.response));
    }
  };

  httpRequest.onerror = function () {
    if (onError) {
      onError(httpRequest.responseText);
      return false;
    }
  };
  httpRequest.open('GET', URL);
  httpRequest.send();
}

function sendBlobRequest(URL, mimeType, onLoad, onError) {
  const httpRequest = new XMLHttpRequest();
  httpRequest.responseType = 'arraybuffer';
  httpRequest.onload = function () {
    if (onLoad) {
      const blob = new Blob([httpRequest.response], { type: mimeType });
      onLoad(blob);
    }
  };

  httpRequest.onerror = function () {
    if (onError) {
      onError(httpRequest.responseText);
    }
  };
  httpRequest.open('GET', URL);
  httpRequest.send();
}

const defaultRejectMessage = 'not found';

const translateApiCode = 'trnsl.1.1.20200322T155651Z.de98a60e6a99185e.089aea4237b51c6db082c966f27a7895cd1e8b44';
const translateApiURL = 'https://translate.yandex.net/api/v1.5/tr.json/translate';
const getTranslateRequestURL = function (word) {
  const url = `${translateApiURL}?key=${translateApiCode}&text=${word}&lang=ru-en`;
  return url;
};

const mediaDataApiCode = '48b3a0e4';
const getMediaURL = function (search, page, type) {
  let url;
  if (type && type != 'all') {
    url = `https://www.omdbapi.com/?s=${search}&type=${type}&page=${page}&apikey=${mediaDataApiCode}`;
  } else {
    url = `https://www.omdbapi.com/?s=${search}&page=${page}&apikey=${mediaDataApiCode}`;
  }
  return url;
};

const getMediaInfoURL = function (infoCode) {
  const url = `https://www.omdbapi.com/?i=${infoCode}&apikey=${mediaDataApiCode}`;
  return url;
};

const Utils = {
  sendGetRequest,
  sendBlobRequest,
  defaultRejectMessage,
  translateApiCode,
  translateApiURL,
  getTranslateRequestURL,
  getMediaURL,
  getMediaInfoURL,
};

module.exports = Utils;
