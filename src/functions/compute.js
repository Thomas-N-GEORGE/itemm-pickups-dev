/**
 * Fonction d'exemple, ne prend pas en compte les paramètres d'entrée.
 * @param inputValues
 * @return {{wav: string, frequencies: *[]}}
 */
function compute(inputValues) {

	const nch = 1;
	const sps = 44100;
	const bps = 1;
	const dur = 5;

	let size = dur * nch * sps * bps;

	let put = (n, l = 4) =>
		[( n << 24 ), ( n << 16 ), ( n << 8 ), n]
			.filter((x, i) => i < l)
			.map(x => String.fromCharCode(x >>> 24)).join("");

	let p = (...a) => a.map(b => put(...[b].flat())).join("");

	let data = `RIFF${put(44 + size)}WAVEfmt ${p(16, [1, 2], [nch, 2], sps, nch * bps * sps, [nch * bps, 2], [bps * 8, 2])}data${put(size)}`
	let frequencies = [];

	let prev = 0;
	let current = 0;

	for (let i = 0; i < dur * sps; i++) {

		let f = Math.min(Math.max(getSampleAt(i / sps), 0), 1);
		data += put(Math.floor(f * ( 2 ** ( bps * 8 ) - 1 )), bps);

		if(i === prev + 300) {
			frequencies[current] = f;
			current++;
			prev = i;
		}
	}

	return {
		wav: "data:Audio/WAV;base64," + btoa(data),
		frequencies: frequencies
	};
}

function getSampleAt(t) {
	return 0.5 + Math.sin(15 * t) / ( 1 + t * t );
}


export {
	compute,
}