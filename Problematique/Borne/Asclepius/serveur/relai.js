var Particle = require('particle-api-js');
var MQTT = require('mqtt');
var csv = require('csv-parser')
var fs = require('fs')
var particle = new Particle();


var MQTTOptions = {
  clientId: "clientId-cqnYsKIar3",
  username:"Tyry-Gab",
  password:"password",
  clean:true
}


var MQTTClient = MQTT.connect("mqtt://broker.mqttdashboard.com", MQTTOptions);
createStreams('serveur/config.csv');

function createStreams(filename) {
  fs.createReadStream(filename).pipe(csv()).on('data', (row) => {
    particle.getEventStream({ deviceId: row.device, auth: row.token }).then(function(stream) {
      stream.on('event', function(data) {
        // Save to database/CSV data and time of event
        // Send to MQTT broker data and time of event
        console.log("Event: ", data);
        MQTTClient.publish(data.name, data.data);
      });
    });
  })
}
