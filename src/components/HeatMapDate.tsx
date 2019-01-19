import * as React from "react"
import * as d3 from "d3"
import { IPoint, IColor } from "../utils"
import { generateD3Dataset } from "./helpers/HeatMapDate"
import d3Tip from "d3-tip"

interface Props {
	// The 'visible' heatmap will start this date
	startDate: Date
	// The 'visible' heatmap will end this date
	endDate: Date
	// The data that fill the heatmap. Must be an Array[{data: Date, count: Number}]
	data: Array<IPoint>
	// Colors that apply a color on squares. Must be an Array[{count: Number, color: String}]
	colors: Array<IColor>
	// Apply a default color for dates whose count are too low to apply a color from 'colors'
	defaultColor?: string
	// Custom text for default color in tooltip legend
	textDefaultColor?: string
	// Define a width and height for square
	rectWidth?: number
	// Define a margin between two squares on x axis
	marginRight?: number
	// Define a margin between two squares on y axis
	marginBottom?: number
	// Display a legend or not
	displayLegend?: boolean
	// Apply a background color
	backgroundColor?: string
	// Apply a text color (unavailable on tooltip)
	textColor?: string
	// Apply a radius on square
	radius?: number
	// Class attributes
	classnames?: string
	// Display year near each month
	displayYear?: boolean
	// Handle onClick in container callback
	onClick?: Function
	// Handle onMouseEnter on each square callback
	onMouseEnter?: Function
	// Handle onMouseLeave on each square callback
	onMouseLeave?: Function
	// Change week-day to start (Sunday or Monday)
	shouldStartMonday?: boolean
	// Change month space
	monthSpace?: number
}

interface State {
	svgElem: SVGSVGElement
	svgLegend: SVGSVGElement
	firstRender: Boolean
}

/**
 * Component that display a heatmap to visualize data through date.
 * Each square is a day.
 */
export default class HeatMapDate extends React.PureComponent<Props, State> {
	private ID: String
	private IDLegend: String
	/**
	 * Set a default value to unrequired props
	 */
	static defaultProps = {
		marginRight: 4,
		marginBottom: 4,
		displayLegend: true,
		rectWidth: 10,
		defaultColor: "#cdcdcd",
		backgroundColor: "#fff",
		textColor: "#000",
		radius: 0,
		classnames: "",
		onClick: () => {},
		onMouseLeave: () => {},
		onMouseEnter: () => {},
		shouldStartMonday: false,
		monthSpace: 0,
	}

	constructor(props: Props) {
		super(props)
		if (props.rectWidth && props.rectWidth < 0) throw new Error("rectWidth must be greater than zero")
		if (props.marginBottom && props.marginBottom < 0) throw new Error("marginBottom must be greater than zero")
		if (props.marginRight && props.marginRight < 0) throw new Error("marginRight must be greater than zero")
		if (props.monthSpace && props.monthSpace < 0) throw new Error("monthSpace must be greater than zero")
		if (props.radius && props.radius < 0) throw new Error("radius must be greater than zero")
		this.ID = Math.random()
			.toString(36)
			.replace(/[^a-z]+/g, "")
			.substr(0, 32)
		this.IDLegend = Math.random()
			.toString(36)
			.replace(/[^a-z]+/g, "")
			.substr(0, 32)
		this.state = {
			svgElem: undefined,
			svgLegend: undefined,
			firstRender: true,
		}
	}

	private cleanHeatMap(svg: any) {
		d3.select(".d3-tip." + this.ID).remove()
		d3.select(".d3-tip." + this.IDLegend).remove()
		// We remove all elements (rect + text) to properly update the svg
		svg.selectAll("*").remove()
	}

	private renderLegend(svgLegend: SVGSVGElement, legendWidth: number) {
		const {
			colors,
			defaultColor,
			rectWidth,
			marginRight,
			displayLegend,
			backgroundColor,
			textColor,
			radius,
			textDefaultColor,
		} = this.props
		if (displayLegend) {
			const svgLegendD3 = d3.select(svgLegend)
			svgLegendD3.selectAll("*").remove()
			svgLegendD3.attr("width", legendWidth).attr("height", 30)
			svgLegendD3
				.append("text")
				.text("Legend :")
				.attr("x", 0)
				.attr("y", 20)
				.attr("font-size", rectWidth + 3)
				.attr("fill", textColor)
			const tip = d3Tip()
				.attr("class", "d3-tip " + this.IDLegend)
				.offset([-8, 0])
				.html(d => {
					const displ = d.text ? d.text : d.count.toString()
					return "<div style={{ fontSize: '15' }}>" + displ + "</div>"
				})
			svgLegendD3.call(tip)
			const legendColors: Array<IColor> = [
				{
					color: defaultColor,
					count: 0,
					text: textDefaultColor ? textDefaultColor : "0",
				},
			]
			colors.map(c => {
				legendColors.push(c)
			})
			svgLegendD3
				.selectAll("rect")
				.data(legendColors)
				.enter()
				.append("rect")
				.attr("width", rectWidth)
				.attr("height", rectWidth)
				.attr("x", (d, i) => (rectWidth + marginRight) * i + rectWidth * 6)
				.attr("y", 15 - rectWidth / 2)
				.attr("rx", radius)
				.attr("ry", radius)
				.attr("fill", d => d.color)
				.on("mouseover", function(d) {
					if (d.color !== backgroundColor) {
						tip.show(d, this)
						d3.select(this).attr("stroke", textColor)
					}
				})
				.on("mouseout", d => {
					tip.hide(d, this)
					d3.selectAll("rect").attr("stroke", "none")
				})
		} else {
			const svgLegendD3 = d3.select(svgLegend)
			svgLegendD3.attr("width", 0).attr("height", 0)
		}
	}

	private renderHeatMap(dataset: any[], svg: any, noMonthName: boolean) {
		const {
			startDate,
			rectWidth,
			marginBottom,
			backgroundColor,
			textColor,
			radius,
			displayYear,
			onClick,
			onMouseEnter,
			onMouseLeave,
			monthSpace,
			marginRight,
		} = this.props
		// Array of months for x axis
		const monthsName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
		if (dataset.length > 0) {
			// I added an ID the tooltip because it's a workaround to prevent the tooltip won't hide when the component is updating
			const tip = d3Tip()
				.attr("class", "d3-tip " + this.ID)
				.offset([-8, 0])
				.html(d => {
					if (d.color !== backgroundColor) {
						return (
							"<div style={{ fontSize: '15' }}>" +
							d.date.getFullYear() +
							"/" +
							(d.date.getMonth() + 1) +
							"/" +
							d.date.getDate() +
							" : " +
							d.count +
							"</div>"
						)
					} else return null
				})
			svg.call(tip)
			// Display all data squares
			let monthOffset = 0
			svg.selectAll("rect")
				.data(dataset)
				.enter()
				.append("rect")
				.attr("fill-opacity", 1)
				.attr("width", rectWidth)
				.attr("height", rectWidth)
				.attr("class", "dayRect")
				.attr("x", d => {
					const prefixYear = displayYear ? rectWidth : 0
					const currentDate = new Date(d.date)
					if (currentDate.getDate() === 1 && d.color !== backgroundColor) {
						monthOffset++
					}
					if (
						(currentDate.getDate() === 1 && d.color !== backgroundColor) ||
						(currentDate.getTime() === new Date(startDate).setHours(0, 0, 0, 0) &&
							new Date(startDate).getDate() < 14)
					) {
						const prefix = displayYear
							? new Date(currentDate)
									.getFullYear()
									.toString()
									.substring(2, 4) + "/"
							: ""
						// Display month name
						svg.append("text")
							.text(prefix + monthsName[currentDate.getMonth()])
							.attr("x", () => {
								return (
									Math.floor(d.i / 7) * (rectWidth + marginRight) +
									40 +
									monthOffset * monthSpace -
									prefixYear
								)
							})
							.attr("y", 18)
							.attr("font-size", rectWidth + 3)
							.attr("fill", textColor)
					}
					return Math.floor(d.i / 7) * (rectWidth + marginRight) + 40 + monthOffset * monthSpace
				})
				.attr("y", d => {
					return (d.i % 7) * (rectWidth + marginBottom) + 24
				})
				.attr("fill", d => d.color)
				.attr("rx", radius)
				.attr("ry", radius)
				.on("mouseover", function(d, i) {
					if (d.color !== backgroundColor) {
						tip.show(d, this)
						d3.select(this).attr("stroke", "black")
					}
					onMouseEnter(d, i)
				})
				.on("mouseout", (d, i) => {
					tip.hide(d, this)
					d3.selectAll("rect").attr("stroke", "none")
					onMouseLeave(d, i)
				})
				.on("click", (d, i) => {
					onClick(d, i)
				})
		}
	}

	render() {
		const {
			startDate,
			endDate,
			data,
			colors,
			defaultColor,
			rectWidth,
			marginRight,
			marginBottom,
			backgroundColor,
			textColor,
			classnames,
			shouldStartMonday,
			monthSpace,
		} = this.props
		const { svgElem, svgLegend, firstRender } = this.state
		// Array of days for y axis
		const daysName = !shouldStartMonday ? ["Sun", "Tue", "Thu", "Sat"] : ["Mon", "Wed", "Fri", "Sun"]

		const svg = d3.select(svgElem)

		// This is a possible workaround about tooltips that do not want to hide when data changes
		// See https://github.com/Caged/d3-tip/issues/133
		this.cleanHeatMap(svg)
		const tmpBufferDate = new Date(startDate)
		const startDateYesterday = new Date(startDate)
		// When want to display month on first column if difference between
		// startDate and endDate less than 1 month
		const noMonthName =
			(startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear()) ||
			(startDate.getMonth() == 11 &&
				endDate.getMonth() === 0 &&
				endDate.getFullYear() - startDate.getFullYear() === 1)
		startDateYesterday.setDate(startDateYesterday.getDate() - 1)
		// We set bufferDate to the previous Sunday (or Monday following 'shouldStartMonday' prop) of startDate.
		tmpBufferDate.setDate(tmpBufferDate.getDate() - startDateYesterday.getDay())
		if (!shouldStartMonday) {
			tmpBufferDate.setDate(tmpBufferDate.getDate() - 1)
		}
		// buffer that begin from previous Sunday (or Monday) of startDate then browse every day to endDate
		const bufferDate = new Date(tmpBufferDate)
		bufferDate.setHours(0, 0, 0, 0)
		// Number of day from bufferDate to endDate
		const nbDayDiff = (endDate.getTime() - bufferDate.getTime()) / 1000 / 60 / 60 / 24
		const nbMonthsDiff = (endDate.getTime() - bufferDate.getTime()) / 1000 / 60 / 60 / 24 / 30
		const legendWidth = (rectWidth + marginRight) * colors.length + 90 + 50
		const svgWidth = (rectWidth + marginRight) * (nbDayDiff / 7) + nbMonthsDiff * monthSpace + 70
		// Set width and height of SVG element
		svg.attr("width", legendWidth > svgWidth ? legendWidth : svgWidth).attr(
			"height",
			(rectWidth + marginBottom) * 7 + 50
		)

		const dataset = generateD3Dataset(
			nbDayDiff,
			svg,
			daysName,
			rectWidth,
			marginBottom,
			textColor,
			data,
			bufferDate,
			backgroundColor,
			startDateYesterday,
			defaultColor,
			colors
		)

		this.renderLegend(svgLegend, legendWidth)

		this.renderHeatMap(dataset, svg, noMonthName)

		return (
			<div
				className={classnames}
				style={{
					width: legendWidth > svgWidth ? legendWidth : svgWidth + "px",
					height: "auto",
					backgroundColor: backgroundColor,
				}}
				id={"react-d3-heatMap-" + this.ID}>
				<svg
					style={{ display: "block" }}
					ref={elem => {
						if (!this.state.svgElem) this.setState({ svgElem: elem })
					}}
				/>
				<svg
					ref={elem => {
						if (!this.state.svgLegend) this.setState({ svgLegend: elem })
					}}
				/>
			</div>
		)
	}
}
