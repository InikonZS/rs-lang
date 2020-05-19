
const mapboxKey = 'pk.eyJ1IjoiaW5pa29uIiwiYSI6ImNrYThobXJqcDA5cmUyc2w1Nmo3ajV0c3kifQ.gkhGAklEGjAwhTFtKLgOXg';
const mapboxScriptURL = 'https://api.mapbox.com/mapbox-gl-js/v1.10.0/mapbox-gl.js';
const mapboxStyleURL = 'https://api.mapbox.com/mapbox-gl-js/v1.10.0/mapbox-gl.css';

function getIpinfoRequestURL(){
  const ipinfoKey = 'd80acd30ba3df2';
  return `https://ipinfo.io/json?token=${ipinfoKey}`;
}

function getOpencagedataReverseRequestURL(lng, lat){
  const opencagedataKey = '78611a37dbe74246b4cc3489972ab21d';
  return `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${opencagedataKey}&pretty=1&no_annotations=1`;
}

function getOpencagedataRequestURL(query){
  const opencagedataKey = '78611a37dbe74246b4cc3489972ab21d';
  return `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${opencagedataKey}&pretty=1&no_annotations=1`;
}

function getClimacellRequestURL(lat, lon){
  const climacellKey = 'IvNdx9vQrp1JRwxfY3Jc5ruX3y9ismZZ';
  const climacellPath = `https://api.climacell.co/v3/weather/forecast/daily`;
  return `${climacellPath}?lat=${lat}&lon=${lon}&unit_system=si&start_time=now&fields=feels_like%2Ctemp%2Chumidity%2Cwind_speed%2Cweather_code&apikey=${climacellKey}`;
}

function getUnsplashRequestURL(query){
  const unsplashKey = '_HA_wYH3_zbLXCe4NiDYyO0fHUe0vOMx7BYJpRR7ZWs';
  const unsplashPath = 'https://api.unsplash.com/photos/random';
  return `${unsplashPath}?orientation=landscape&per_page=1&query=${query}&client_id=${unsplashKey}`;
}

module.exports = {
  mapboxKey,
  mapboxScriptURL,
  mapboxStyleURL,
  getClimacellRequestURL,
  getIpinfoRequestURL,
  getOpencagedataRequestURL,
  getOpencagedataReverseRequestURL,
  getUnsplashRequestURL
}