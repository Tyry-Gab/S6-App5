CLIENT_ID=s6-app5-1560
CLIENT_SECRET=b1debe855e3b169fffbee53b7e8ad352485a66d4


TOKEN=`curl -u ${CLIENT_ID}:${CLIENT_SECRET} -d grant_type=client_credentials \
https://api.particle.io/oauth/token | python3 -c "import sys, json; print(json.load(sys.stdin)['access_token'])"`

DEVICE_NAME=e00fce68043174ec2c0c805e
VARIABLE_NAME=counter

curl "https://api.particle.io/v1/devices/${DEVICE_NAME}/events?access_token=${TOKEN}"