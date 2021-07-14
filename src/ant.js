const { GarminStick2, CadenceScanner, BicyclePowerScanner } = require('ant-plus');
const Ant = require('ant-plus');

function connectAnt(emitHeartRate, emitPower) {
	const stick = new GarminStick2(3);

	// const cadenceScanner = new CadenceScanner(stick);

	const powerScanner = new BicyclePowerScanner(stick);

	const heartScanner = new Ant.HeartRateScanner(stick);

	// these events just fire a bunch of times, not sure if it's really necessary to listen out for them
	// heartScanner.on('attached', () => {
	// 	console.log(`Heart rate scanner attached, channel: ${heartScanner.channel}, deviceID: ${heartScanner.deviceID}`); // I think device ID is meaningless for the scanner
	// });

	// cadenceScanner.on('attached', () => {
	// 	console.log(`Cadence scanner attached, channel: ${cadenceScanner.channel}, deviceID: ${cadenceScanner.deviceID}`);
	// });

	// powerScanner.on('attached', () => {
	// 	console.log(`Power scanner attached, channel: ${powerScanner.channel}, deviceID: ${powerScanner.deviceID}`);
	// });

	let lastReading = null;

	heartScanner.on('hbData', function (data) {
		const time = Date.now();
		const interval = Math.round(time - lastReading);
		lastReading = time;

		console.log(`Heart data received, heart rate: ${data.ComputedHeartRate}, interval: ${interval}`);

		// emitHeartRate(sensor.deviceID, data);
		emitHeartRate(data.ComputedHeartRate);
	});

	// cadenceScanner.on('speedData', function (data) {
	// 	console.log(`Speed data received, deviceID: ${cadenceScanner.deviceID}, json: ${JSON.stringify(data)}`);
	// });

	powerScanner.on('powerData', function (data) {
		// console.log(`Power data received, deviceID: ${data.DeviceID}, power: ${data.Power}`);

		emitPower(data.Power);
	});
	
	stick.on('startup', function () {
		//  sensor.attach(0, 0);
		console.log('Startup event received, scanning...');
		heartScanner.scan();
		// cadenceScanner.scan();
		powerScanner.scan();
	});

	console.log('Opening stick...');
	if (!stick.open()) {
		console.log('Stick not found!');
	}
}

module.exports = {connectAnt};