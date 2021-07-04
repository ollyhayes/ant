const fetch = require('node-fetch');

const bridgeIp = '192.168.0.15';
const username = 'z113OjEddHlIbUrcagx7LL49ePgPgm3bB92aWE5H';

async function setLight(lightId, hsl) {
	const hsbPhillips = {
		hue: (hsl[0] / 360) * 65535,
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
}

module.exports = {setLight};