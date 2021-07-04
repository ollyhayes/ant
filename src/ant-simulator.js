function connectAnt(emitHeartRate) {
	let currentHeartRate = 40;

	setInterval(() => {
		currentHeartRate += 10;

		if (currentHeartRate > 200)
			currentHeartRate = 0;

		emitHeartRate({computedHeartRate: currentHeartRate});
	}, 1000);
}

module.exports = {connectAnt};