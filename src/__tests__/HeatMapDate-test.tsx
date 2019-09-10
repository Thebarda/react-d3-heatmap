import * as React from "react"
import * as Enzyme from "enzyme"
import { Point } from "HeatMap"
import HeatMapDate from "../components/HeatMapDate"
import { setData, Color } from "../utils"
import Adapter from "enzyme-adapter-react-16"

Enzyme.configure({ adapter: new Adapter() })

interface SetUp {
	data: Array<Point>
	color: Array<Color>
	startDate: Date
	endDate: Date
}

function setUp(yearStart, monthStart, dayStart, yearEnd, monthEnd, dayEnd, nb): SetUp {
	const startDate = new Date(yearStart, monthStart - 1, dayStart + 1)
	const endDate = new Date(yearEnd, monthEnd - 1, dayEnd + 1)
	const data = setData(startDate, endDate, nb)
	const colors: Array<Color> = []
	colors.push({ count: 2, color: "#66ff33" })
	colors.push({ count: 3, color: "#99ff33" })
	colors.push({ count: 4, color: "#ccff33" })
	colors.push({ count: 6, color: "#ffcc00" })
	colors.push({ count: 7, color: "#ff9933" })
	colors.push({ count: 9, color: "#ff0000" })
	return { data, startDate, endDate, colors }
}

it("it should render without throwing error", () => {
	const { data, startDate, endDate } = setUp(2017, 1, 2, 2018, 1, 2, 231)
	const wrapper = Enzyme.shallow(<HeatMapDate startDate={startDate} endDate={endDate} data={data} colors={[]} />)
	expect(wrapper).toMatchSnapshot()
})

it("it should render without throwing error with colors", () => {
	const { data, startDate, endDate, colors } = setUp(2017, 1, 2, 2018, 1, 2, 231)
	const wrapper = Enzyme.shallow(<HeatMapDate startDate={startDate} endDate={endDate} data={data} colors={colors} />)
	expect(wrapper).toMatchSnapshot()
})

it("it should render without throwing error with custom marginRight prop", () => {
	const { data, startDate, endDate, colors } = setUp(2017, 1, 2, 2018, 1, 2, 231)
	const wrapper = Enzyme.shallow(
		<HeatMapDate startDate={startDate} endDate={endDate} data={data} colors={colors} marginRight={12} />
	)
	expect(wrapper).toMatchSnapshot()
})

it("it should render without throwing error with custom marginBottom prop", () => {
	const { data, startDate, endDate, colors } = setUp(2017, 1, 2, 2018, 1, 2, 231)
	const wrapper = Enzyme.shallow(
		<HeatMapDate startDate={startDate} endDate={endDate} data={data} colors={colors} marginBottom={12} />
	)
	expect(wrapper).toMatchSnapshot()
})

it("it should render without throwing error with custom defaultColor prop", () => {
	const { data, startDate, endDate, colors } = setUp(2017, 1, 2, 2018, 1, 2, 231)
	const wrapper = Enzyme.shallow(
		<HeatMapDate startDate={startDate} endDate={endDate} data={data} colors={colors} defaultColor={"#00ff00"} />
	)
	expect(wrapper).toMatchSnapshot()
})

it("it should render without throwing error with custom rectWidth prop", () => {
	const { data, startDate, endDate, colors } = setUp(2017, 1, 2, 2018, 1, 2, 231)
	const wrapper = Enzyme.shallow(
		<HeatMapDate startDate={startDate} endDate={endDate} data={data} colors={colors} rectWidth={17} />
	)
	expect(wrapper).toMatchSnapshot()
})

it("it should render without throwing error with display legend", () => {
	const { data, startDate, endDate, colors } = setUp(2017, 1, 2, 2018, 1, 2, 231)
	const wrapper = Enzyme.shallow(
		<HeatMapDate startDate={startDate} endDate={endDate} data={data} colors={colors} displayLegend={false} />
	)
	expect(wrapper).toMatchSnapshot()
})

it("it should render without throwing error with all props", () => {
	const { data, startDate, endDate, colors } = setUp(2017, 1, 2, 2018, 1, 2, 231)
	const wrapper = Enzyme.shallow(
		<HeatMapDate
			startDate={startDate}
			endDate={endDate}
			data={data}
			colors={colors}
			marginRight={15}
			marginBottom={12}
			rectWidth={15}
			displayLegend={false}
			defaultColor={"#00dd00"}
		/>
	)
	expect(wrapper).toMatchSnapshot()
})

it("it should render without throwing error one week", () => {
	const { data, startDate, endDate, colors } = setUp(2017, 9, 16, 2018, 9, 23, 231)
	const wrapper = Enzyme.shallow(<HeatMapDate startDate={startDate} endDate={endDate} data={data} colors={colors} />)
	expect(wrapper).toMatchSnapshot()
})

it("it should render without throwing error two months", () => {
	const { data, startDate, endDate, colors } = setUp(2017, 7, 16, 2018, 9, 16, 231)
	const wrapper = Enzyme.shallow(<HeatMapDate startDate={startDate} endDate={endDate} data={data} colors={colors} />)
	expect(wrapper).toMatchSnapshot()
})

it("it should render without throwing error with custom background and text color", () => {
	const { data, startDate, endDate, colors } = setUp(2017, 1, 2, 2018, 1, 2, 231)
	const wrapper = Enzyme.shallow(
		<HeatMapDate
			startDate={startDate}
			endDate={endDate}
			data={data}
			colors={colors}
			marginRight={15}
			marginBottom={12}
			rectWidth={15}
			displayLegend={false}
			defaultColor={"#00dd00"}
			textColor={"#e2e2de"}
			backgroundColor={"#78df87"}
		/>
	)
	expect(wrapper).toMatchSnapshot()
})
