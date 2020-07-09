/* App5 S6 
 * Fait par: -Thierry Constantin (cont3301)
 *           -Gabriel Lessard    (lesg2605)
 */

var Particle = require('particle-api-js');
var MQTT = require('mqtt');
var csv = require('csv-parser')
var fs = require('fs');
const { Console } = require('console');
var particle = new Particle();
var employees = [];

const relaiConfigFolder = 'serveur/relai_config/';

var MQTTOptions = {
  clientId: "clientId-relais",
  username:"Tyry-Gab",
  password:"password",
  clean:true
}

function saveCurrentEmployees() {
  fs.createReadStream(relaiConfigFolder + 'employees.csv').pipe(csv()).on('data', (row) => {
    employees.push(row);
  })
}

saveCurrentEmployees();

var MQTTClient = MQTT.connect("mqtt://broker.mqttdashboard.com", MQTTOptions);
createStreams(relaiConfigFolder + 'devices.csv');

function createStreams(filename) {
  fs.createReadStream(filename).pipe(csv()).on('data', (row) => {
    particle.getEventStream({ deviceId: row.device, auth: row.token }).then(function(stream) {
      stream.on('event', function(data) {
        // Save to database/CSV data and time of event
        // Send to MQTT broker data and time of event
        var employeeName = getEmployee(JSON.parse(data.data));
        var json = {
          "employee" : employeeName,
          "room" : row.room,
          "time" : data.published_at,
          "action" : data.name
        };
        console.log(json);
        MQTTClient.publish(data.name, JSON.stringify(json));
      });
    });
  })
}

function getEmployee(eventData) {
  var employeeName = "Unregistered_Employee";
  employees.forEach(employee => {
    if((employee.major == eventData.major) && (employee.minor == eventData.minor)) {
      employeeName = employee.name;
    }
  });
  return employeeName;
}