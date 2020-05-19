const Control = require('./control.component.js');
const Mapbox = require('./mapbox.component.js');

const Utils = require('./utils.js');

class App {
  constructor(parentNode) {
    this.map = new Mapbox(document.body, Utils.mapboxScriptURL, Utils.mapboxStyleURL, Utils.mapboxKey);

    //Geolocation
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    
    function success(pos) {
      var crd = pos.coords;
    
      console.log('Ваше текущее метоположение:');
      console.log(`Широта: ${crd.latitude}`);
      console.log(`Долгота: ${crd.longitude}`);
      console.log(`Плюс-минус ${crd.accuracy} метров.`);
    };
    
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };
    
    navigator.geolocation.getCurrentPosition(success, error, options);


    //clime
    fetch(Utils.getClimacellRequestURL(12, 20))
      .then((response)=>{
        return response.json();
      })
      .then((data)=>{
        console.log(data);
        return data;
      })
      .catch((reason)=>{
        console.log(reason);
      }
    );

    ///ip
    fetch(Utils.getIpinfoRequestURL(12, 20))
      .then((response)=>{
        return response.json();
      })
      .then((data)=>{
        console.log(data);
        return data;
      })
      .catch((reason)=>{
        console.log(reason);
      }
    );
    
    //cage
    fetch(Utils.getOpencagedataRequestURL('Минск'))
      .then((response)=>{
        return response.json();
      })
      .then((data)=>{
        console.log(data);
        return data;
      })
      .catch((reason)=>{
        console.log(reason);
      }
    );
  }
}

module.exports = App;
