const prompt = require('prompt-sync')({sigint: true});
var Particle = require('particle-api-js');
var particle = new Particle();
var particleDeviceId = 'e00fce68043174ec2c0c805e';
var functionName = 'setDEL';
var accessToken = '497689e3a6afb1af1762adff419e2a495741b927';

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