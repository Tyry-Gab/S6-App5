var Particle = require('particle-api-js');
var MQTT = require('mqtt');
var csv = require('csv-parser')
const parse = require('csv-parse/lib/sync')
var fs = require('fs');
const { Console } = require('console');
var particle = new Particle();
var employees = [];
const csvParser = require('csv-parser');


var MQTTOptions = {
  clientId: "clientId-cqnYsKIar3",
  username:"Tyry-Gab",
  password:"password",
  clean:true
}

function saveCurrentEmployees() {
  fs.createReadStream('serveur/employees.csv').pipe(csv()).on('data', (row) => {
    employees.push(row);
  })
}

saveCurrentEmployees();

var MQTTClient = MQTT.connect("mqtt://broker.mqttdashboard.com", MQTTOptions);
createStreams('serveur/devices.csv');

function createStreams(filename) {
  fs.createReadStream(filename).pipe(csv()).on('data', (row) => {
    particle.getEventStream({ deviceId: row.device, auth: row.token }).then(function(stream) {
      stream.on('event', function(data) {
        // Save to database/CSV data and time of event
        // Send to MQTT broker data and time of event
        console.log("Event: ", data);
        var employeeName = getEmployee(JSON.parse(data.data));
        console.log("Employee: ", employeeName);
        MQTTClient.publish(data.name, data.data);
      });
    });
  })
}

function getEmployee(eventData) {
  employees.forEach(employee => {
    if((employee.major == eventData.major) && (employee.minor == eventData.minor)) {
      return employee.name;
    }
  });
  return "Unregistered_Employee";
}