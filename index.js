const Ant = require('ant-plus');

const stick = new Ant.GarminStick3();

const sensor = new Ant.HeartRateScanner(stick);

sensor.on('attached', () => {
	console.log(`Heart rate sensor attached, channel: ${sensor.channel}, deviceID: ${sensor.deviceID}`);
});

sensor.on('hbData', function (data) {
	console.log(`Data received, deviceID: ${sensor.deviceID}, heart rate: ${data.computedHeartRate}`);
});
 
stick.on('startup', function () {
   //  sensor.attach(0, 0);
	console.log('Startup event received, scanning...');
	sensor.scan();
});

console.log('Opening stick...');
if (!stick.open()) {
   console.log('Stick not found!');
}