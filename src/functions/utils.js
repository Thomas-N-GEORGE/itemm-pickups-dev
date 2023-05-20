const lerp = (x, y, a) => x * (1 - a) + y * a;
const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const invlerp = (x, y, a) => clamp((a - x) / (y - x));
const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));


/**
 * convertRange
 * Converti un tableau de données en un tableau de données compris entre les valeurs min et max
 *
 * @param {number[]} 	data
 * @param {number} 		min
 * @param {number} 		max
 * @return {number[]}
 */
export function convertRange(data, min, max) {
	let prevMax = Math.max(...data);
	let prevMin = Math.min(...data);
	return data.map(n => range(prevMin, prevMax, min, max, n));
}