import React from "react"
import ReactDOM from "react-dom"
import { HeatMapDate } from "./index"
//Here is the playground
//You can test your code here
const endDate = new Date()
const startDate = new Date()
startDate.setFullYear(endDate.getFullYear() - 1)
ReactDOM.render(
	<HeatMapDate startDate={startDate} endDate={endDate} data={[]} colors={[]} />,
	document.getElementById("index")
)

const setDate = (dateStart, dateEnd, nb) => {
	for (let i = 0; i < nb; i++) {}
}
