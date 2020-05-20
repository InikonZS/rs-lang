const Control = require('./control.component.js');
const Button = require('./button.component.js');
const Search = require('./search.component.js');
const Clock = require('./clock.component.js');
const Menu = require('./menu.component.js');
const Mapbox = require('./mapbox.component.js');
const WeatherCard = require('./weather-card.component.js');

const Utils = require('./utils.js');

class App {
  constructor(
    menuNode,
    searchNode,
    weatherNode,
    mapNode,
    footerNode,
    backNode) {

    this.menu = new Menu(menuNode);
    this.menu.onChange = (options)=>{
      this.refresh(this.backBuffer.weatherData, options);
    }

    this.search = new Search(searchNode);
    this.search.onSubmit = (req)=>{
      getCoordinates(req)
        .then((data)=>{
          procLocationData(data, this.backBuffer);
          return getWeather(this.backBuffer.lng, this.backBuffer.lat); 
        })
        .then((data)=>{
          console.log(data);
          this.refresh(data[0], this.menu.options);
        })
        .catch((reason)=>{
          console.log(reason);
        }
      );  
    }

    this.map = new Mapbox(mapNode, Utils.mapboxScriptURL, Utils.mapboxStyleURL, Utils.mapboxKey);
    
    this.weather = new WeatherCard(weatherNode);

    this.imgWrapperA = new Control(backNode, 'div', 'background');
    this.imgWrapperA.node.style = `
      background-image: linear-gradient(rgba(8, 15, 26, 0.59) 0%, rgba(17, 17, 46, 0.46) 100%), 
      url("assets/xaker.jpg")
    `;
    this.imgWrapperB = new Control(backNode, 'div', 'background');
    this.imgWrapperB.node.style = `
      background-image: linear-gradient(rgba(8, 15, 26, 0.59) 0%, rgba(17, 17, 46, 0.46) 100%), 
      url("assets/xaker.jpg")
    `;
    this.activeImg = this.imgWrapperA;
    this.inactiveImg = this.imgWrapperB;
    //this.image = new Control(this.imgWrapper.node, 'img');
    //this.image.node.src = 'assets/xaker.jpg';
    /*this.image.node.style = `
          transition-duration:1000ms;
          opacity:30%;
        `;*/
    this.lastSrc='assets/xaker.jpg';
    this.backBuffer = {}
    getUserPositionByNav()
      .then(
        (pos)=>{
          let lng = pos.longitude;
          let lat = pos.latitude;
          this.backBuffer.lng = lng;
          this.backBuffer.lat = lat;
          this.backBuffer.location = 'Some Place'
          getLocation(lng, lat).then((res)=>{
            if (res && res.results && res.results[0]){
              this.backBuffer.location = res.results[0].formatted;
            }
          },
          (message)=>{
            console.log('cant locate city');
          });
          return getWeather(this.backBuffer.lng, this.backBuffer.lat);
        },
        (message)=>{
          console.log('cant locate by nav');
          return getUserPositionByIP().then(
            (data)=>{
              console.log('try locate by ip');
              let location = (data.city||data.region||data.country);
              return getCoordinates(location);
            },
            (message)=>{
              console.log('cant locate by ip');
            }
          ).then(
            (data)=>{
              procLocationData(data, this.backBuffer);
              return getWeather(this.backBuffer.lng, this.backBuffer.lat);  
            },
            (message)=>{
              console.log(message);
            }
          );
      })
      .then((data)=>{
        console.log(data);
        if (data[0]){
          this.backBuffer.weatherData = data[0];
          this.refresh(data[0], this.menu.options);  
        } else {
          console.log('weather servise unavailable');
        }
      },
      (message)=>{
        console.log(message);
      }
    );

  }

  refresh(weatherData, options){
    
    this.map.setPosition(this.backBuffer.lng, this.backBuffer.lat);
    this.weather.refresh(weatherData, this.backBuffer);
    getImage('nature').then((res)=>{
      console.log(res);
      let im = new Image();
      im.onload = () =>{
        this.inactiveImg.node.style = 'transition-duration:1000ms; opacity:0%;';
        if (this.activeImg == this.imgWrapperA){
        this.activeImg = this.imgWrapperB;
        this.inactiveImg = this.imgWrapperA;
        
        } else {
          this.activeImg = this.imgWrapperA;
          this.inactiveImg = this.imgWrapperB;
        }
        this.activeImg.node.style = `background-image: linear-gradient(rgba(8, 15, 26, 0.59) 0%, rgba(17, 17, 46, 0.46) 100%), 
        url("${im.src}"); transition-duration:1000ms; opacity:100%;`;
        this.inactiveImg.node.style = `background-image: linear-gradient(rgba(8, 15, 26, 0.59) 0%, rgba(17, 17, 46, 0.46) 100%), 
        url("${this.lastSrc}"); transition-duration:1000ms; opacity:0%;`;
        this.lastSrc = im.src;
      }
      im.src = res.urls.regular;
      
      
    })
    //this.image.node
  }
}

function procLocationData(data, backBuffer){
  if (data && data.results && data.results[0]){
    let lng = data.results[0].geometry.lng;
    let lat = data.results[0].geometry.lat;
    let location = data.results[0].formatted;
    backBuffer.lng = lng;
    backBuffer.lat = lat;
    backBuffer.location = location;
  } else {
    backBuffer.lng = 27.3945597;
    backBuffer.lat = 53.8891702;
    backBuffer.location = 'Minsk';  
  }  
}

function getUserPositionByNav(){
  let promise = new Promise(function(resolve, reject){
    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };  
    let success = (pos)=>{
      console.log(pos);
      var crd = pos.coords;
      resolve(crd);
    };
    let error = (err)=>{
      console.log(err);
      reject(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  }); 
  return promise;
}

function getImage(request){
  return fetch(Utils.getUnsplashRequestURL(request))
    .then((response)=>{
      return response.json();
  })  
}
  
function getUserPositionByIP(){
  return fetch(Utils.getIpinfoRequestURL())
    .then((response)=>{
      return response.json();
  })  
}

function getCoordinates(request){
  return fetch(Utils.getOpencagedataRequestURL(request)).then((response)=>{
      return response.json();
  });
}

function getLocation(lon, lat){
  return fetch(Utils.getOpencagedataReverseRequestURL(lon, lat)).then((response)=>{
      return response.json();
  });
}

function getWeather(lon, lat){
  return fetch(Utils.getClimacellRequestURL(lat, lon))
    .then((response)=>{
      return response.json();
  })
}

module.exports = App;
