const Control = require('./control.component.js');
const Button = require('./button.component.js');

class WeatherCard extends Control{
  constructor (parentNode){
    super(parentNode, 'div');
    this.codeControl = new Control(parentNode, 'div');
    this.temperatureControl = new Control(parentNode, 'div');
    this.feelsControl = new Control(parentNode, 'div');
    this.windControl = new Control(parentNode, 'div');
    this.humidityControl = new Control(parentNode, 'div');
  }

  refresh(data){
    console.log(data);
    this.codeControl.node.textContent = data.weather_code.value;
    this.temperatureControl.node.textContent = data.temp[0].min.value; 
    this.feelsControl.node.textContent = data.feels_like[0].min.value; 
    this.windControl.node.textContent = data.wind_speed[0].min.value; 
    this.humidityControl.node.textContent = data.humidity[0].min.value; 
  }
}

module.exports = WeatherCard;