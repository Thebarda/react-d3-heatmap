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
        data.push({date: new Date(date), count })
    }
    return data
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}