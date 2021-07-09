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

function powerToHsb(power) {
	const minPower = 0;
	const maxPower = 1000;

	const minHue = 250;
	const maxHue = 0;

	const heartRateNormalised = (power - minPower) / (maxPower - minPower);
	const heartRateClamped = Math.max(0, Math.min(1, heartRateNormalised));

	const hue = heartRateClamped * (maxHue - minHue) + minHue;

	return [hue, 100, 100];

}

function start() {
	connectAnt(receiveHeartRate, receivePower);

	function receiveHeartRate(heartRate) {
		const hsb = heartRateToHsb(heartRate);

		console.log(`Heart rate received: ${chalk.hsv(...hsb)(heartRate)}`);

		setLight(1, hsb);
	}

	function receivePower(power) {
		const hsb = powerToHsb(power);

		console.log(`Power received: ${chalk.hsv(...hsb)(power)}`);

		// setLight(2, hsb);
	}

	// function receivePower(power) {

	// }
}

start();