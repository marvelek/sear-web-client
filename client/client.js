const socket = io();

// var topics = {
//     configRequest: 'sear/config/request',
//     configResponse: 'sear/config/request',
//     statusRequest: 'sear/status/request',
//     statusResponse: 'sear/status/response'
//   }

var topics = {
    configRequest: 'sear/config/request',
    configResponse: 'sear/config/response',
    statusRequest: 'sear/status/request',
    statusResponse: 'sear/status/response'
  }

socket.on(topics.statusResponse, function (msg) {
    const parsedMessage = parseArduStatus(msg)
    console.log(parsedMessage)

    document.getElementById('lightsOnTime').value = parsedMessage.lightsOnTime;
    document.getElementById('lightsOffTime').value = parsedMessage.lightsOffTime;
    document.getElementById('ventilationOnTime').value = parsedMessage.ventilationOnTime;
    document.getElementById('ventilationOffTime').value = parsedMessage.ventilationOffTime;
	changeBarValue(document.getElementById('tempBar'),parsedMessage.temperature,'°C'); //Panel Temperatura
	changeBarValue(document.getElementById('soilHumBar'),parsedMessage.soilHumidity,'%'); //Panel Humedad Suelo
	document.getElementById('soilHumBar').value = parsedMessage.soilHumidity;
	changeBarValue(document.getElementById('humBar'),parsedMessage.humidity,'%'); // Panel Humedad Aire
    document.getElementById('humBar').value = parsedMessage.humidity;
    
    showStatus('light',parsedMessage.light); 
    showStatus('ventilation',parsedMessage.ventilation);//Panel Ventilacion

});

 parseArduStatus = (status) => {
     console.log(status)
    var hour = (new Date()).getHours();
    var lightOn = false;
    if (hour >= status.configuration.lightsOnTime && hour < status.configuration.lightsOffTime) {
      lightOn = true;
    }
    var ventilationOn = false;
    if (hour >= status.configuration.ventilationOnTime && hour < status.configuration.ventilationOffTime) {
      ventilationOn = true;
    }
  
    return {
      light: lightOn,
      ventilation: ventilationOn,
      temperature: status.status.temperature,
      humidity: status.status.humidity,
      soilHumidity: status.status.soilHumidity,
      lightsOnTime: status.configuration.lightsOnTime,
      lightsOffTime: status.configuration.lightsOffTime,
      ventilationOnTime: status.configuration.ventilationOnTime,
      ventilationOffTime: status.configuration.ventilationOffTime
    }
  }
  