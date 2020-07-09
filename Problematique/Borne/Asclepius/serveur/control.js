/* App5 S6 
 * Fait par: -Thierry Constantin (cont3301)
 *           -Gabriel Lessard    (lesg2605)
 */

const prompt = require('prompt-sync')({sigint: true});
var csv = require('csv-parser')
var fs = require('fs');
var Particle = require('particle-api-js');
var particle = new Particle();
var functionName = 'setDEL';

var rooms = [];

function main() {
  var stream = fs.createReadStream('serveur/relai_config/devices.csv').pipe(csv());
  stream.on('data', (row) => {
    rooms.push(row);
  });
  stream.on('end', () => {
    ask();
  });
}

function cloudDel(delState) {
  id = "";
  token = "";
  var args  = delState.toString().split('-');
  rooms.forEach(room => {
    if(room.room == args[0]) {
      id = room.device
      token = room.token;
    }
  });
  var fnPr = particle.callFunction({ deviceId: id, name: functionName, argument: args[1], auth: token});
  fnPr.then(function(data) {
      console.log('Function called successfully', data);
      ask();
  }, function(err) {
      console.log('An erreor occurred:', err);
      ask();
  });
  console.log('DEL set to: ' + delState);
}

function ask() {
  let promptResult = prompt('DEL state (on/off): ');
  if(promptResult == 'exit') {
    console.log('Ending program');
    exitProgram = true;
  }
  else {
    cloudDel(promptResult);
  }
}

main();