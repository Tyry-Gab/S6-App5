/* App5 S6 
 * Fait par: -Thierry Constantin (cont3301)
 *           -Gabriel Lessard    (lesg2605)
 */

var MQTT = require('mqtt');
const converter = require('json-2-csv');
const fs = require('fs');

const roomsFolder = 'serveur/rooms/';

var MQTTOptions = {
    clientId: "clientId-archive",
    username:"Tyry-Gab",
    password:"password",
    clean:true
  }  
  
var MQTTClient = MQTT.connect("mqtt://broker.mqttdashboard.com", MQTTOptions);

MQTTClient.subscribe("badge-left");
MQTTClient.subscribe("badge-entered");

MQTTClient.on('message', function(topic, message, packet) {
    var json = JSON.parse(message);
    console.log(json);

    var room = json.room;
    delete json.room;
    var roomFileName = roomsFolder + room + '.csv';

    converter.json2csv(json, (err, csv) => {
        if (err) {
            throw err;
        }

        try {
        if (fs.existsSync(roomFileName)) {
            // break the textblock into an array of lines
            var lines = csv.split('\n');
            // remove one line, starting at the first position
            lines.splice(0,1);
            // join the array back into a single string
            var newtext = lines.join('\n');

            newtext = '\n' + newtext;

            //var parsedCSV = "\r\n";                
            //parsedCSV += parse(dataList, {header: false});
            fs.appendFile(roomFileName, newtext, {flag: 'a'}, (err) => {
                if (err) throw new Error('Couldn\'t append the data to a file');
                console.log('Data was appended to file: ' + roomFileName);
            });
        }
        else {
            //var parsedCSV = parse(dataList, opts);
            fs.writeFile(roomFileName, csv, (err) => {
                if (err) throw new Error('Couldn\'t write the data to a file');
                console.log('File was created and data was appended to file: ' + roomFileName);
            });
        }
    } catch(err) {
        console.error(err)
    }
    });
}); 