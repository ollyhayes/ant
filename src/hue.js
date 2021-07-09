const fetch = require('node-fetch');

const bridgeIp = '192.168.0.41';
const username = 'XtogR86jSxPRqTzqT5zHupNUJU6BYzwGHHQl72AZ';

let inProgress = false;

async function setLight(lightId, hsl) {
	if (inProgress)
		return;

	inProgress = true;
	const hsbPhillips = {
		hue: Math.round((hsl[0] / 360) * 65535),
		sat: hsl[1] * 2.54,
		bri: hsl[2] * 2.54
	};

	const response = await fetch(
		`http://${bridgeIp}/api/${username}/lights/${lightId}/state`,
		{
			method: 'PUT',
			body: JSON.stringify({on: true, ...hsbPhillips}),
			headers: { 'Content-Type': 'application/json' },
		});

	console.log('Result: ', await response.json());

	inProgress = false;
}

module.exports = {setLight};