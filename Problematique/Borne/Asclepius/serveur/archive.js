var MQTT = require('mqtt');
var csv = require('csv-parser')


var MQTTOptions = {
    clientId: "clientId-cqnYsKIar3",
    username:"Tyry-Gab",
    password:"password",
    clean:true
  }
  
  
  var MQTTClient = MQTT.connect("mqtt://broker.mqttdashboard.com", MQTTOptions);

MQTTClient.subscribe("Salle_de_Ping_Pong/badge-left", function() {
    MQTTClient.on('message', function(topic, message, packet) {
        console.log("Received '" + message + "' on '" + topic + "'");
    });
});
MQTTClient.subscribe("Salle_de_Ping_Pong/badge-entered", function() {
    MQTTClient.on('message', function(topic, message, packet) {
        console.log("Received '" + message + "' on '" + topic + "'");
    });
});

MQTTClient.subscribe("ta_mere", function() {
    MQTTClient.on('message', function(topic, message, packet) {
        console.log("Received '" + message + "' on '" + topic + "'");
    });
});


  