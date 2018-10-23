import React from "react"
import ReactDOM from "react-dom"
import HeatMapDate from "./index"
import { setData } from "./utils"
import "./styles/app.css"
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

const startDate2 = new Date(2018, 11, 25)
const endDate2 = new Date(2019, 0, 3)
const data2 = setData(startDate2, endDate2, 9)
const colors2 = []
colors2.push({ count: 2, color: "#66ff33", text: "2-3" })
colors2.push({ count: 4, color: "#ccff33", text: "4-5" })
colors2.push({ count: 6, color: "#ffcc00", text: "6-7" })
colors2.push({ count: 8, color: "#ff9933" })
colors2.push({ count: 9, color: "#ff0000", text: "9 and more" })
/**
 * This is the component playground that you have to use during your development
 */
class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			colors,
			data,
			endDate,
			endDate2,
			startDate,
			startDate2,
			data2,
		}
		this.interval = setInterval(() => {
			this.setState({ data: setData(this.state.startDate, this.state.endDate, 231) })
		}, 3000)
	}

	componentWillUnmount() {
		if (this.interval) clearInterval(this.interval)
	}

	render() {
		const { startDate, startDate2, endDate, endDate2, data, data2, colors } = this.state
		return (
			<div>
				<HeatMapDate
					startDate={startDate}
					endDate={endDate}
					data={data}
					colors={colors}
					marginRight={15}
					marginBottom={12}
					rectWidth={15}
					transition={1000}
					radius={8}
					classnames={"border"}
					displayYear
				/>
				<br />
				<HeatMapDate
					startDate={startDate2}
					endDate={endDate2}
					data={data2}
					colors={colors}
					marginRight={15}
					marginBottom={12}
					rectWidth={15}
					transition={1000}
					radius={4}
					classnames={"border"}
					onClick={(d, i) => {
						console.log("click", d, i)
					}}
					onMouseEnter={(d, i) => {
						console.log("enter", d, i)
					}}
					onMouseLeave={(d, i) => {
						console.log("leave", d, i)
					}}
				/>
				<br />
				<HeatMapDate
					startDate={startDate2}
					endDate={endDate2}
					data={data2}
					colors={colors2}
					marginRight={15}
					marginBottom={12}
					rectWidth={15}
					transition={1000}
					radius={4}
					classnames={"border"}
				/>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById("index"))
