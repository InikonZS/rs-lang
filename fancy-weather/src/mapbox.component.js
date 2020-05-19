const Control = require('./control.component.js');

class Mapbox{
  constructor(parentNode, scriptURL, styleURL, serviceKey){
    this.map;
    this.marker;
    this.mapContainer = new Control(parentNode, 'div');
    this.mapContainer.node.id = 'map-render-container';
    this.mapContainer.node.style = 'height:300px';

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
  }
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