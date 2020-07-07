const prompt = require('prompt-sync')({sigint: true});
var Particle = require('particle-api-js');
var particle = new Particle();
var particleDeviceId = 'e00fce684b2d2acbe7f14e93';
var functionName = 'setDEL';
var accessToken = 'f3b7395cffd67173bbbc6ef5822f0881fad638da';

function cloudDel(delState) {
    var fnPr = particle.callFunction({ deviceId: particleDeviceId, name: functionName, argument: delState, auth: accessToken});
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

  if (promptResult === 'on') {
    cloudDel(promptResult);
    
  } else if(promptResult === 'off') {
    cloudDel(promptResult);
  } else if (promptResult === 'exit'){
    console.log('Ending program');
    exitProgram = true;
  } else {
      console.log('Wrong input');
      ask();
  }
}

ask();