const Control = require('./control.component.js');

const lons = ['Longitude', 'Долгота', 'Даужыня'];
const lats = ['Latitude', 'Широта', 'Шырыня'];

class Mapbox extends Control{
  constructor(parentNode, scriptURL, styleURL, serviceKey){
    super(parentNode, 'div', 'map_wrapper');
    this.lonPref=lons[0];
    this.latsPref=lats[0];
    this.map;
    this.marker;
    this.mapContainer = new Control(this.node, 'div', 'map_container');
    this.mapContainer.node.id = 'map-render-container';

    this.lonControl = new Control(this.node,'div');
    this.latControl = new Control(this.node,'div');

    let onExternalLoad = ()=>{
      let lon = 12;
      let lat = 20;

      mapboxgl.accessToken = serviceKey;
      let map = new mapboxgl.Map({
        container: this.mapContainer.node.id,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lon, lat],
        zoom: 8
      });
  
      let marker = new mapboxgl.Marker()
        .setLngLat([lon, lat])
        .addTo(map);
      
      this.map = map;
      this.marker = marker;
    }
    this.onExternalLoad = onExternalLoad;

    let onExternalError=()=>{

    }
    this.onExternalError = onExternalError;
 

    makeExternalLink(parentNode, styleURL, ()=>{
      makeExternalScript(parentNode, scriptURL, ()=>{
        this.onExternalLoad();
      },
      ()=>{
        this.onExternalError();
      });  
    },
    ()=>{
      this.onExternalError();
    });
  }

  setPosition(lon, lat){
    this.map.setCenter([lon, lat]);
    this.marker.setLngLat([lon, lat]);
    this.lonControl.node.textContent = this.lonPref+': '+formatDeg(lon);
    this.latControl.node.textContent = this.latPref+': '+formatDeg(lat);
  }

  setOptions(options){
    this.lonPref = lons[options.langIndex]||'Longitude';
    this.latPref = lats[options.langIndex]||'Latitude';
  }
}

function formatDeg(val){
  let deg = Math.trunc (val);
  let min = Math.trunc((val-deg)*60);
  let sec = Math.trunc((val*60-deg*60-min)*6000);
  return `${deg}° ${min}' ${sec}''`;
}

function makeExternalLink(parentNode, linkURL, onLoad, onError){
  let elem = new Control(parentNode, 'link');
    elem.node.onload = ()=>{
      onLoad();
    }
    elem.node.onerror = ()=>{
      onError();
    }
    elem.node.rel = 'stylesheet';
    elem.node.type = 'text/css';
    parentNode.appendChild( elem.node );
    elem.node.href = linkURL;
  return elem;
}

function makeExternalScript(parentNode, scriptURL, onLoad, onError){
  let elem = new Control(parentNode, 'script');
    elem.node.onload = ()=>{
      console.log(elem.node);
      onLoad();
    }
    elem.node.onerror = ()=>{
      onError();
    }
    elem.node.type = 'text/javascript';
    elem.node.async = true;
    parentNode.appendChild( elem.node );
    elem.node.src = scriptURL;
  return elem;
}

module.exports = Mapbox;