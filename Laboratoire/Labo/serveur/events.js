var Particle = require('particle-api-js');
var particle = new Particle();

var CLIENT_ID="s6-app5-1560"
var CLIENT_SECRET="b1debe855e3b169fffbee53b7e8ad352485a66d4"
var DEVICE_NAME="e00fce68043174ec2c0c805e"

var TOKEN="497689e3a6afb1af1762adff419e2a495741b927"


particle.getEventStream({ deviceId: DEVICE_NAME, auth: TOKEN }).then(function(stream) {
  stream.on('event', function(data) {
    console.log("Event: ", data);
  });
});