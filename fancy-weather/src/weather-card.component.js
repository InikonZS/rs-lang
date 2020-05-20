const Control = require('./control.component.js');
const Button = require('./button.component.js');
const Clock = require('./clock.component.js');

const defeaultIco = 'cloudy';
const codes = {
  'freezing_rain_heavy':'sleet', 
  'freezing_rain':'sleet', 
  'freezing_rain_light':'sleet',
  'freezing_drizzle':'sleet', 
  'ice_pellets_heavy':'snow', 
  'ice_pellets':'snow', 
  'ice_pellets_light':'snow', 
  'snow_heavy':'snow', 
  'snow':'snow', 
  'snow_light':'snow', 
  'flurries':'snow', 
  'tstorm':'tornado', 
  'rain_heavy':'rain_thunder', 
  'rain':'rain', 
  'rain_light':'rain', 
  'drizzle':'overcast', 
  'fog_light':'mist', 
  'fog':'fog', 
  'cloudy':'cloudy', 
  'mostly_cloudy':'cloudy', 
  'partly_cloudy':'day_partial_cloud', 
  'mostly_clear':'day_clear', 
  'clear':'day_clear'
};

class WeatherCard extends Control{
  constructor (parentNode){
    super(parentNode, 'div', 'weather_today_wrapper');

    let header = new Control(this.node, 'div');
    this.city = new Control(header.node, 'div');
    this.clock = new Clock(header.node);
    let result = new Control(this.node, 'div', 'weather_result');
    let colomn1 = new Control(result.node, 'div', 'weather_colomn');
    this.temperatureControl = new Control(colomn1.node, 'div', 'weather_temp');
    let colomn2 = new Control(result.node, 'div', 'weather_colomn');
    this.iconControl = new Control(colomn2.node, 'img', 'weather_ico');
    this.iconControl.node.style = 'width:100px;';
    //this.codeControl = new Control(parentNode, 'div');
    this.feelsControl = new Control(colomn2.node, 'div', 'weather_line');
    this.windControl = new Control(colomn2.node, 'div', 'weather_line');
    this.humidityControl = new Control(colomn2.node, 'div', 'weather_line');
  }

  refresh(data, backBuffer){
    console.log(data);
    //this.codeControl.node.textContent = data.weather_code.value;
    this.city.node.textContent = backBuffer.location;

    this.iconControl.node.src = 'assets/weather-icons/'+(codes[data.weather_code.value]||defeaultIco) + '.svg'
    this.temperatureControl.node.textContent = Math.round(data.temp[0].min.value)+'°'; 
    this.feelsControl.node.textContent = 'feels like: '+data.feels_like[0].min.value+'°'; 
    this.windControl.node.textContent = 'wind speed: '+data.wind_speed[0].min.value+'m/s'; 
    this.humidityControl.node.textContent = 'humidity: '+data.humidity[0].min.value+'%'; 
  }
}

module.exports = WeatherCard;