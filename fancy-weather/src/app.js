const Control = require('./control.component.js');
const Button = require('./button.component.js');
const Search = require('./search.component.js');
const Clock = require('./clock.component.js');
const Menu = require('./menu.component.js');
const Mapbox = require('./mapbox.component.js');
const WeatherCard = require('./weather-card.component.js');

const Utils = require('./utils.js');
const SpeechModule = require('./speech.utils.js');

class App {
  constructor(
    menuNode,
    searchNode,
    weatherNode,
    mapNode,
    footerNode,
    backNode,
  ) {
    this.menu = new Menu(menuNode);
    this.menu.onChange = (options) => {
      this.refresh(this.backBuffer.weatherData, options);
    };

    this.search = new Search(searchNode);
    this.search.onSubmit = (req) => {
      getCoordinates(req)
        .then((data) => {
          procLocationData(data, this.backBuffer);
          return getWeather(this.backBuffer.lng, this.backBuffer.lat);
        })
        .then((data) => {
          console.log(data);
          this.refresh(data, this.menu.state);
        })
        .catch((reason) => {
          console.log(reason);
        });
    };

    this.speech = SpeechModule.speechInit((value, values) => {
      this.search.searchEdit.node.value = value;
    });

    if (this.speech) {
      this.search.onMic = () => {
        this.speech.start();
      };
    }
    // /SpeechModule.voiceText('works');

    this.map = new Mapbox(mapNode, Utils.mapboxScriptURL, Utils.mapboxStyleURL, Utils.mapboxKey);
    this.weather = new WeatherCard(weatherNode);
    this.backGroundInit(backNode);

    this.backBuffer = {};
    getUserPositionByNav()
      .then(
        (pos) => {
          const lng = pos.longitude;
          const lat = pos.latitude;
          this.backBuffer.lng = lng;
          this.backBuffer.lat = lat;
          this.backBuffer.location = 'Some Place';
          getLocation(lng, lat).then((res) => {
            console.log(res);
            if (res && res.results && res.results[0]) {
              //this.backBuffer.location = res.results[0].formatted;
              this.backBuffer.location = (data.results[0].components.suburb||res.results[0].components.city||res.results[0].components.county)+', '+res.results[0].components.country;
            }
          },
          (message) => {
            console.log('cant locate city');
          });
          return getWeather(this.backBuffer.lng, this.backBuffer.lat);
        },
        (message) => {
          console.log('cant locate by nav');
          return getUserPositionByIP().then(
            (data) => {
              console.log('try locate by ip');
              const location = (data.city || data.region || data.country);
              return getCoordinates(location);
            },
            (message) => {
              console.log('cant locate by ip');
            },
          ).then(
            (data) => {
              console.log(data);
              procLocationData(data, this.backBuffer);
              return getWeather(this.backBuffer.lng, this.backBuffer.lat);
            },
            (message) => {
              console.log(message);
            },
          );
        },
      )
      .then((data) => {
        console.log(data);
        if (data[0]) {
          this.backBuffer.weatherData = data;
          this.refresh(data, this.menu.state);
        } else {
          console.log('weather servise unavailable');
        }
      },
      (message) => {
        console.log(message);
      });
  }

  refresh(weatherData, options) {
    this.map.setOptions(options);
    this.map.setPosition(this.backBuffer.lng, this.backBuffer.lat);
    this.weather.refresh(weatherData, this.backBuffer, options);
    getImage('nature').then((res) => {
      // console.log(res);
      this.changeBackImage(res.urls.regular);
    });
  }

  backGroundInit(backNode) {
    this.lastSrc;
    this.imgWrapperA = new Control(backNode, 'div', 'background');
    this.imgWrapperB = new Control(backNode, 'div', 'background');
    this.activeImg = this.imgWrapperA;
    this.inactiveImg = this.imgWrapperB;
    this.changeBackImage('assets/xaker.jpg');
  }

  changeBackImage(imageURL) {
    const im = new Image();
    im.onload = () => {
      // this.inactiveImg.node.style = 'transition-duration:1000ms; opacity:0%;';
      if (this.activeImg == this.imgWrapperA) {
        this.activeImg = this.imgWrapperB;
        this.inactiveImg = this.imgWrapperA;
      } else {
        this.activeImg = this.imgWrapperA;
        this.inactiveImg = this.imgWrapperB;
      }
      this.activeImg.node.style = `
        background-image: linear-gradient(rgba(8, 15, 26, 0.59) 0%, rgba(17, 17, 46, 0.46) 100%), 
        url("${im.src}"); 
        transition-duration:1000ms; opacity:100%;
      `;
      this.inactiveImg.node.style = `
        background-image: linear-gradient(rgba(8, 15, 26, 0.59) 0%, rgba(17, 17, 46, 0.46) 100%), 
        url("${this.lastSrc}"); transition-duration:1000ms; opacity:0%;
      `;
      this.lastSrc = im.src;
    };
    im.src = imageURL;
    if (!this.lastSrc) {
      this.lastSrc = imageURL;
    }
  }
}

function procLocationData(data, backBuffer) {
  if (data && data.results && data.results[0]) {
    const { lng } = data.results[0].geometry;
    const { lat } = data.results[0].geometry;
    //const location = data.results[0].formatted;
    console.log(data);
    const location = (data.results[0].components.suburb||data.results[0].components.city||data.results[0].components.county)+', '+data.results[0].components.country;
    backBuffer.lng = lng;
    backBuffer.lat = lat;
    backBuffer.location = location;
  } else {
    backBuffer.lng = 27.3945597;
    backBuffer.lat = 53.8891702;
    backBuffer.location = 'Minsk';
  }
}

function getUserPositionByNav() {
  const promise = new Promise(((resolve, reject) => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    const success = (pos) => {
      console.log(pos);
      const crd = pos.coords;
      resolve(crd);
    };
    const error = (err) => {
      console.log(err);
      reject(`ERROR(${err.code}): ${err.message}`);
    };
    navigator.geolocation.getCurrentPosition(success, error, options);
  }));
  return promise;
}

function getImage(request) {
  return fetch(Utils.getUnsplashRequestURL(request))
    .then((response) => response.json());
}

function getUserPositionByIP() {
  return fetch(Utils.getIpinfoRequestURL())
    .then((response) => response.json());
}

function getCoordinates(request) {
  return fetch(Utils.getOpencagedataRequestURL(request)).then((response) => response.json());
}

function getLocation(lon, lat) {
  return fetch(Utils.getOpencagedataReverseRequestURL(lon, lat)).then((response) => response.json());
}

function getWeather(lon, lat) {
  return fetch(Utils.getClimacellRequestURL(lat, lon))
    .then((response) => response.json());
}

module.exports = App;
