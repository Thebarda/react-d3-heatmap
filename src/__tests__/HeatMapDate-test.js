import React from "react"
import Enzyme, { shallow, mount, render } from "enzyme"
import HeatMapDate from "../components/HeatMapDate"
import { setData } from "../utils"
import Adapter from "enzyme-adapter-react-16"

function setUp(yearStart, monthStart, dayStart, yearEnd, monthEnd, dayEnd, nb) {
	const startDate = new Date(yearStart, monthStart - 1, dayStart + 1)
	const endDate = new Date(yearEnd, monthEnd - 1, dayEnd + 1)
	const data = setData(startDate, endDate, nb)
	const colors = []
	colors.push({ count: 2, color: "#66ff33" })
	colors.push({ count: 3, color: "#99ff33" })
	colors.push({ count: 4, color: "#ccff33" })
	colors.push({ count: 6, color: "#ffcc00" })
	colors.push({ count: 7, color: "#ff9933" })
	colors.push({ count: 9, color: "#ff0000" })
	Enzyme.configure({ adapter: new Adapter() })
	return { data, startDate, endDate, colors }
}

test("it should render without throwing error", () => {
	const { data, startDate, endDate } = setUp(2017, 1, 2, 2018, 1, 2, 231)
	const wrapper = shallow(<HeatMapDate startDate={startDate} endDate={endDate} data={data} colors={[]} />)
	expect(wrapper).toMatchSnapshot()
})

test("it should throw error because there is no data required prop", () => {
	const { data, startDate, endDate } = setUp(2017, 1, 2, 2018, 1, 2, 231)
	let error = null
	try {
		const wrapper = shallow(<HeatMapDate startDate={startDate} endDate={endDate} colors={[]} />)
	} catch (e) {
		error = e
	}
	expect(error).toBeInstanceOf(Error)
})

test("it should throw error because there is no startDate required prop", () => {
	const { data, startDate, endDate } = setUp(2017, 1, 2, 2018, 1, 2, 231)
	let error = null
	try {
		const wrapper = shallow(<HeatMapDate endDate={endDate} data={data} colors={[]} />)
	} catch (e) {
		error = e
	}
	expect(error).toBeInstanceOf(Error)
})

test("it should throw error because there is no endDate required prop", () => {
	const { data, startDate, endDate } = setUp(2017, 1, 2, 2018, 1, 2, 231)
	let error = null
	try {
		const wrapper = shallow(<HeatMapDate startDate={startDate} data={data} colors={[]} />)
	} catch (e) {
		error = e
	}
	expect(error).toBeInstanceOf(Error)
})

test("it should throw error because there is no colors required prop", () => {
	const { data, startDate, endDate } = setUp(2017, 1, 2, 2018, 1, 2, 231)
	let error = null
	try {
		const wrapper = shallow(<HeatMapDate startDate={startDate} endDate={endDate} data={data} />)
	} catch (e) {
		error = e
	}
	expect(error).toBeInstanceOf(Error)
})

test("it should render without throwing error with colors", () => {
	const { data, startDate, endDate, colors } = setUp(2017, 1, 2, 2018, 1, 2, 231)
	const wrapper = shallow(<HeatMapDate startDate={startDate} endDate={endDate} data={data} colors={colors} />)
	expect(wrapper).toMatchSnapshot()
})

test("it should render without throwing error with custom marginRight prop", () => {
	const { data, startDate, endDate, colors } = setUp(2017, 1, 2, 2018, 1, 2, 231)
	const wrapper = shallow(
		<HeatMapDate startDate={startDate} endDate={endDate} data={data} colors={colors} marginRight={12} />
	)
	expect(wrapper).toMatchSnapshot()
})

test("it should render without throwing error with custom marginBottom prop", () => {
	const { data, startDate, endDate, colors } = setUp(2017, 1, 2, 2018, 1, 2, 231)
	const wrapper = shallow(
		<HeatMapDate startDate={startDate} endDate={endDate} data={data} colors={colors} marginBottom={12} />
	)
	expect(wrapper).toMatchSnapshot()
})

test("it should render without throwing error with custom defaultColor prop", () => {
	const { data, startDate, endDate, colors } = setUp(2017, 1, 2, 2018, 1, 2, 231)
	const wrapper = shallow(
		<HeatMapDate startDate={startDate} endDate={endDate} data={data} colors={colors} defaulColor={"#00ff00"} />
	)
	expect(wrapper).toMatchSnapshot()
})

test("it should render without throwing error with custom rectWidth prop", () => {
	const { data, startDate, endDate, colors } = setUp(2017, 1, 2, 2018, 1, 2, 231)
	const wrapper = shallow(
		<HeatMapDate startDate={startDate} endDate={endDate} data={data} colors={colors} rectWidth={17} />
	)
	expect(wrapper).toMatchSnapshot()
})

test("it should render without throwing error with custom transition prop", () => {
	const { data, startDate, endDate, colors } = setUp(2017, 1, 2, 2018, 1, 2, 231)
	const wrapper = shallow(
		<HeatMapDate startDate={startDate} endDate={endDate} data={data} colors={colors} transition={1000} />
	)
	expect(wrapper).toMatchSnapshot()
})

test("it should render without throwing error with display legend", () => {
	const { data, startDate, endDate, colors } = setUp(2017, 1, 2, 2018, 1, 2, 231)
	const wrapper = shallow(
		<HeatMapDate startDate={startDate} endDate={endDate} data={data} colors={colors} displayLegend={false} />
	)
	expect(wrapper).toMatchSnapshot()
})

test("it should render without throwing error with all props", () => {
	const { data, startDate, endDate, colors } = setUp(2017, 1, 2, 2018, 1, 2, 231)
	const wrapper = shallow(
		<HeatMapDate
			startDate={startDate}
			endDate={endDate}
			data={data}
			colors={colors}
			marginRight={15}
			marginBottom={12}
			rectWidth={15}
			displayLegend={false}
			transition={1000}
			defaultColor={"#00dd00"}
		/>
	)
	expect(wrapper).toMatchSnapshot()
})

test("it should render without throwing error one week", () => {
	const { data, startDate, endDate, colors } = setUp(2017, 9, 16, 2018, 9, 23, 231)
	const wrapper = shallow(<HeatMapDate startDate={startDate} endDate={endDate} data={data} colors={colors} />)
	expect(wrapper).toMatchSnapshot()
})
