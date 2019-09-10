import { Point, Color } from "HeatMap"

export const noDisplayColor = "#aaaaaa22"

export const generateD3Dataset: Array = (
	nbDayDiff: number,
	svg: SVGSVGElement,
	daysName: string[],
	rectWidth: number,
	marginBottom: number,
	textColor: string,
	data: Point[],
	bufferDate: Date,
	backgroundColor: string,
	startDateYesterday: Date,
	defaultColor: string,
	colors: Color[],
	rangeDisplayData: Array<Date>
) => {
	const dataset = []
	let startDateDisplayData = rangeDisplayData && rangeDisplayData[0] ? new Date(rangeDisplayData[0]) : null
	if (startDateDisplayData) startDateDisplayData.setHours(0, 0, 0, 0)
	let endDateDisplayData = rangeDisplayData && rangeDisplayData[1] ? new Date(rangeDisplayData[1]) : null
	if (endDateDisplayData) endDateDisplayData.setHours(0, 0, 0, 0)
	if (endDateDisplayData && startDateDisplayData && startDateDisplayData.getTime() > endDateDisplayData.getTime()) {
		const tmpDate = new Date(startDateDisplayData)
		startDateDisplayData = new Date(endDateDisplayData)
		endDateDisplayData = new Date(tmpDate)
	}

	for (let i = 0; i < nbDayDiff; i++) {
		if (i == 0 || i === 2 || i === 4 || i === 6) {
			// Display day name as y axis
			svg.append("text")
				.text(daysName[i / 2])
				.attr("y", (i % 7) * (rectWidth + marginBottom) + rectWidth / 6 + 32)
				.attr("x", 0)
				.attr("font-size", rectWidth + 3)
				.attr("fill", textColor)
		}
		// Find the first data that match with current bufferDate
		const objMatch = data.find(obj => {
			const dateTmp = new Date(obj.date)
			dateTmp.setHours(0, 0, 0, 0)
			bufferDate.setHours(0, 0, 0, 0)
			return dateTmp.getTime() === bufferDate.getTime()
		})
		// If bufferDate < (startDate - 1 day) we set the square color like background to make that 'invisible'
		let finalColor: string = backgroundColor
		const maxCount = null

		if (
			(startDateDisplayData && startDateDisplayData.getTime() > bufferDate.getTime()) ||
			(endDateDisplayData && endDateDisplayData.getTime() < bufferDate.getTime())
		) {
			finalColor = noDisplayColor
		}
		// If there is no match we set the default color
		else if (objMatch === undefined && bufferDate.getTime() >= startDateYesterday.getTime()) {
			finalColor = defaultColor
		} else if (bufferDate.getTime() >= startDateYesterday.getTime()) {
			finalColor = colors.filter(c => c.count <= objMatch.count)
			if (finalColor.length === 0) {
				finalColor = defaultColor
			} else {
				finalColor = finalColor[finalColor.length - 1].color
			}
		}
		const today = new Date(bufferDate.getTime())
		// Finally, we push it to an Array that will be used by d3
		dataset.push({ date: today, count: objMatch ? objMatch.count : maxCount || 0, color: finalColor, i })
		bufferDate.setDate(bufferDate.getDate() + 1)
	}
	return dataset
}
