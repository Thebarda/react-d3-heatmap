import * as React from "react"
import * as ReactDOM from "react-dom"
import HeatMapDate from "./index"
import { Color, Point } from "HeatMap"
import { setData } from "./utils"
import "./styles/app.css"
//Here is the playground
//You can test your code here

const endDate = new Date()
const startDate = new Date()
startDate.setFullYear(startDate.getFullYear() - 1)
const data = setData(startDate, endDate, 231)
const colors: Color[] = []
colors.push({ count: 2, color: "#66ff33" })
colors.push({ count: 3, color: "#99ff33" })
colors.push({ count: 4, color: "#ccff33" })
colors.push({ count: 6, color: "#ffcc00" })
colors.push({ count: 7, color: "#ff9933" })
colors.push({ count: 9, color: "#ff0000" })

const startDate2 = new Date(2018, 11, 25)
const endDate2 = new Date(2019, 0, 3)
const data2 = setData(startDate2, endDate2, 9)
const colors2: Color[] = []
colors2.push({ count: 2, color: "#66ff33", text: "2-3" })
colors2.push({ count: 4, color: "#ccff33", text: "4-5" })
colors2.push({ count: 6, color: "#ffcc00", text: "6-7" })
colors2.push({ count: 8, color: "#ff9933" })
colors2.push({ count: 9, color: "#ff0000", text: "9 and more" })

interface Props {}
interface State {
	colors: Color[]
	data: Point[]
	data2: Point[]
	endDate: Date
	endDate2: Date
	startDate: Date
	startDate2: Date
	startDateDisplayData: Date
	endDateDisplayData: Date
}

/**
 * This is the component playground that you have to use during your development
 */
class App extends React.Component<State> {
	private interval: NodeJS.Timer
	constructor(props: Props) {
		super(props)
		this.state = {
			colors,
			data,
			endDate,
			endDate2,
			startDate,
			startDate2,
			data2,
			startDateDisplayData: new Date("2018-10-15T17:41:27"),
			endDateDisplayData: new Date("2019-02-21T23:01:50"),
		}
		this.interval = setInterval(() => {
			this.setState({ data: setData(this.state.startDate, this.state.endDate, 231) })
		}, 3000)
	}

	componentWillUnmount(): void {
		if (this.interval) clearInterval(this.interval)
	}

	render(): HTMLDivElement {
		const {
			startDate,
			startDate2,
			endDate,
			endDate2,
			data,
			data2,
			colors,
			startDateDisplayData,
			endDateDisplayData,
		} = this.state
		return (
			<div>
				<HeatMapDate
					startDate={startDate}
					endDate={endDate}
					data={data}
					colors={colors}
					rectWidth={14}
					classnames={"border"}
					displayYear
					monthSpace={6}
					rangeDisplayData={[endDateDisplayData, startDateDisplayData]}
					fadeAnimation={{ animate: true, duration: 1 }}
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
					radius={4}
					monthSpace={14}
					classnames={"border"}
					fadeAnimation={{ animate: false }}
					onClick={(d: Color, i: number): void => {
						console.log("click", d, i)
					}}
					onMouseEnter={(d: Color, i: number): void => {
						console.log("enter", d, i)
					}}
					onMouseLeave={(d: Color, i: number): void => {
						console.log("leave", d, i)
					}}
				/>
				<br />
				<HeatMapDate
					startDate={startDate2}
					endDate={endDate2}
					data={data2}
					colors={colors2}
					rectWidth={14}
					monthSpace={15}
					textDefaultColor={"0-1"}
					radius={4}
					classnames={"border"}
					shouldStartMonday
					displayYear
					fadeAnimation={{ animate: true, duration: 5 }}
				/>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById("index"))
