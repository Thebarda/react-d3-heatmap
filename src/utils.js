export function setData(dateStart, dateEnd, nb) {
    const data = new Map()
    const dates = []
	for (let i = 0; i < nb; i++) {
        let date = Math.floor(Math.random() * dateEnd.getTime()) + dateStart.getTime()
        while (dates.includes(dates)) {
            date = Math.floor(Math.random() * dateEnd.getTime()) + dateStart.getTime()
        }
        dates.push(date)
        const count = Math.floor(Math.random() * 14)
        data.set(new Date(date), count)
    }
    return data
}