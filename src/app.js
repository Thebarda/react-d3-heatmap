import React from "react"
import ReactDOM from "react-dom"
import { HeatMapDate } from "./index"
//Here is the playground
//You can test your code here
const endDate = new Date()
const startDate = new Date()
startDate.setFullYear(endDate.getFullYear() - 1)
const data = setData(startDate, endDate, 231)
console.log(data)
ReactDOM.render(
	<HeatMapDate startDate={startDate} endDate={endDate} data={data} colors={[]} />,
	document.getElementById("index")
)

function setData(dateStart, dateEnd, nb) {
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
