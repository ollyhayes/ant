const { GarminStick2, CadenceScanner } = require('ant-plus');
const Ant = require('ant-plus');

function connectAnt(emitHeartRate) {
	const stick = new GarminStick2(3);

	const cadenceScanner = new CadenceScanner(stick);

	const heartScanner = new Ant.HeartRateScanner(stick);

	heartScanner.on('attached', () => {
		console.log(`Heart rate scanner attached, channel: ${heartScanner.channel}, deviceID: ${heartScanner.deviceID}`);
	});

	cadenceScanner.on('attached', () => {
		console.log(`Cadence scanner attached, channel: ${heartScanner.channel}, deviceID: ${heartScanner.deviceID}`);
	});

	heartScanner.on('hbData', function (data) {
		console.log(`Data received, deviceID: ${heartScanner.deviceID}, heart rate: ${data.computedHeartRate}`);

		// emitHeartRate(sensor.deviceID, data);
		emitHeartRate(data);
	});

	cadenceScanner.on('speedData', function (data) {
		console.log(`Data received, deviceID: ${cadenceScanner.deviceID}, heart rate: ${JSON.stringify(data)}`);
	});
	
	stick.on('startup', function () {
		//  sensor.attach(0, 0);
		console.log('Startup event received, scanning...');
		heartScanner.scan();
		cadenceScanner.scan();
	});

	console.log('Opening stick...');
	if (!stick.open()) {
		console.log('Stick not found!');
	}
}

module.exports = {connectAnt};