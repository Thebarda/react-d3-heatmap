/**
 * Generate data test
 * @param {Date} dateStart :
 * @param {Date} dateEnd
 * @param {Date} nb : Numbers of data generated
 * @returns An Array of data(Object{date: Date, count: Number}). The length of array is equal to nb params
 */
export function setData(dateStart, dateEnd, nb) {
	const data = []
	const dates = []
	for (let i = 0; i < nb; i++) {
		let date = randomDate(dateStart, dateEnd)
		while (dates.includes(dates)) {
			date = randomDate(dateStart, dateEnd)
		}
		dates.push(date)
		const count = Math.floor(Math.random() * 14)
		data.push({ date: new Date(date), count })
	}
	return data
}

/**
 * Generate a random date between two dates
 * @param {Date} start
 * @param {Date} end
 * @returns a random date
 */
function randomDate(start, end) {
	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}
