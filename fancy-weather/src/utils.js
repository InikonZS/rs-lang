
const monthRu = 'январь февраль март апрель май июнь июль август сентябрь октябрь ноябрь декабрь'.split(' ');
const monthBy = 'студзень люты сакавiк красавiк травень чэрвень лiпень верасень кастрычнiк лiстапад снежань'.split(' ');
const monthEn = 'january febriary march april may june july august september october november december'.split(' ');

const weekRu = 'воскресенье понедельник вторник среда четверг пятница суббота'.split(' ');
const weekBy = 'нядзеля панядзелак ауторак серада чацвер пятнiца субота'.split(' ');
const weekEn = 'sunday monday tuesday wednesday thursday friday saturday'.split(' ');

const shortRu = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
const shortBy = ['Няд', 'Пан', 'Аут', 'Сер', 'Чац', 'Пят', 'Суб'];
const shortEn = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const times = {
  month:[monthEn, monthRu, monthBy],
  week:[weekEn, weekRu, weekBy],
  shortWeek:[shortEn, shortRu, shortBy],
}

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
  getUnsplashRequestURL,
  times
}