import React from "react"
import ReactDOM from "react-dom"
import HeatMapDate from "./index"
import { setData } from './utils'
//Here is the playground
//You can test your code here
const endDate = new Date()
const startDate = new Date()
startDate.setFullYear(startDate.getFullYear()-1)
const data = setData(startDate, endDate, 231)
const colors = new Map()
colors.set(1, "#33cc33")
colors.set(2, "#66ff33")
colors.set(3, "#99ff33")
colors.set(4, "#ccff33")
colors.set(5, "#ffff00")
colors.set(6, "#ffcc00")
colors.set(7, '#ff9933')
colors.set(8, "#ff6600")
colors.set(9, "#ff0000")

ReactDOM.render(
	<HeatMapDate
		startDate={startDate}
		endDate={endDate}
		data={data}
		colors={colors}
		rectWidth={15}
		displayLegend
	/>,
	document.getElementById("index")
)
