const chalk = require('chalk');
const config = require('./config');
const { connectAnt } = config.simulate
	? require('./ant-simulator')
	: require('./ant');
const { setLight } = require('./hue');

function heartRateToHsb(heartRate) {
	const minHeartRate = 50;
	const maxHeartRate = 180;

	const minHue = 250;
	const maxHue = 0;

	const heartRateNormalised = (heartRate - minHeartRate) / (maxHeartRate - minHeartRate);
	const heartRateClamped = Math.max(0, Math.min(1, heartRateNormalised));

	const hue = heartRateClamped * (maxHue - minHue) + minHue;

	return [hue, 100, 100];
}

function start() {
	connectAnt(receiveHeartRate);

	function receiveHeartRate(heartRateState) {
		const hsb = heartRateToHsb(heartRateState.computedHeartRate);

		console.log(`Heart rate received: ${chalk.hsv(...hsb)(heartRateState.computedHeartRate)}`);

		// setLight(0, hsb);
	}

	// function receivePower(power) {

	// }
}

start();