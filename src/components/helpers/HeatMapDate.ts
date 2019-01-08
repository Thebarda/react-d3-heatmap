import { IPoint, IColor } from "../../utils"

export const generateD3Dataset = (
	nbDayDiff: number,
	svg: any,
	daysName: string[],
	rectWidth: number,
	marginBottom: number,
	textColor: string,
	data: IPoint[],
	bufferDate: Date,
	backgroundColor: string,
	startDateYesterday: Date,
	defaultColor: string,
	colors: IColor[]
) => {
	const dataset = []
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
		let finalColor: any = backgroundColor
		let maxCount = null
		// If there is no match we set the default color
		if (objMatch === undefined && bufferDate.getTime() >= startDateYesterday.getTime()) {
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
