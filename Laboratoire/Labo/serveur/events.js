var Particle = require('particle-api-js');
var MQTT = require('mqtt');
var particle = new Particle();

var DEVICE_NAME="e00fce68043174ec2c0c805e"
var TOKEN="497689e3a6afb1af1762adff419e2a495741b927"

var MQTTOptions = {
  clientId: "clientId-cqnYsKIar3",
  username:"Tyry-Gab",
  password:"password",
  clean:true
}


var MQTTClient = MQTT.connect("mqtt://broker.mqttdashboard.com", MQTTOptions);
MQTTClient.on("connect",function(){	
  particle.getEventStream({ deviceId: DEVICE_NAME, auth: TOKEN }).then(function(stream) {
    stream.on('event', function(data) {
      console.log("Event: ", data);
      MQTTClient.publish("Argon-Event", data.data);
    });
  });
})

