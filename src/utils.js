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

/**
 * Convert an array of date to a n array of Object{ date: Date, count: Number}
 * @param {Array[Date]} dates
 * @returns an array of Object{ date: Date, count: Number}
 */
export function convertDateArrToObjectArr(dates) {
	const result = []
	dates.map(date => {
		const dateTmp = new Date(date).setHours(0, 0, 0, 0)
		if (!isNaN(dateTmp) && typeof dateTmp === "number") {
			const index = result.findIndex(d => {
				const dateToMatch = new Date(d.date).setHours(0, 0, 0, 0)
				return dateToMatch === dateTmp
			})
			if (index !== -1) {
				result[index].count += 1
			} else {
				result.push({ date: new Date(dateTmp), count: 1 })
			}
		}
	})
	return result
}
