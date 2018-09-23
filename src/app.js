import React from "react"
import ReactDOM from "react-dom"
import HeatMapDate from "./index"
import { setData } from "./utils"
//Here is the playground
//You can test your code here
const endDate = new Date()
const startDate = new Date()
startDate.setFullYear(startDate.getFullYear() - 1)
const data = setData(startDate, endDate, 231)
const colors = []
colors.push({ count: 2, color: "#66ff33" })
colors.push({ count: 3, color: "#99ff33" })
colors.push({ count: 4, color: "#ccff33" })
colors.push({ count: 6, color: "#ffcc00" })
colors.push({ count: 7, color: "#ff9933" })
colors.push({ count: 9, color: "#ff0000" })

const startDate2 = new Date(2018, 8, 2)
const endDate2 = new Date(2018, 8, 15)
const data2 = setData(startDate2, endDate2, 9)

ReactDOM.render(
	<HeatMapDate startDate={startDate} endDate={endDate} data={data} colors={colors} rectWidth={15} displayLegend />,
	document.getElementById("index")
)
