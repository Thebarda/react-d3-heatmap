import React from "react"
import ReactDOM from "react-dom"
import HeatMapDate from "./index"
import { setData } from './utils'
//Here is the playground
//You can test your code here
const endDate = new Date()
const startDate = new Date()
startDate.setDate(startDate.getDate()-1)
const data = setData(startDate, endDate, 231)

ReactDOM.render(
	<HeatMapDate startDate={startDate} endDate={endDate} data={data} colors={[]} />,
	document.getElementById("index")
)
