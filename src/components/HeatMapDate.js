import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import * as d3 from "d3"
import d3Tip from "d3-tip"

/**
 * Component that display a heatmap to visualize data through date.
 * Each rectangle is a day.
 */
export default class HeatMapDate extends PureComponent {
	/**
	 * Props type checking
	 */
	static propTypes = {
		// The 'visible' heatmap will start this date
		startDate: PropTypes.instanceOf(Date).isRequired,
		// The 'visible' heatmap will end this date
		endDate: PropTypes.instanceOf(Date).isRequired,
		// The data that fill the heatmap. Must be an Array[{data: Date, count: Number}]
		data: PropTypes.instanceOf(Array).isRequired,
		// Colors that apply a color on rectangles. Must be an Array[{count: Number, color: String}]
		colors: PropTypes.instanceOf(Array).isRequired,
		// Apply a default color for dates whose count are too low to apply a color from 'colors'
		defaultColor: PropTypes.string,
		// Define a width and height for rectangle
		rectWidth: PropTypes.number,
		// Define a margin between two rectangle on x axis
		marginRight: PropTypes.number,
		// Define a margin between two rectangle on y axis
		marginBottom: PropTypes.number,
		// Display a legend or not
		displayLegend: PropTypes.bool,
		// Apply a transition when heatmap is rendering for the first time
		transition: PropTypes.number,
		// Apply a background color
		backgroundColor: PropTypes.string,
		// Apply a text color (unavailable on tooltip)
		textColor: PropTypes.string,
		// Apply a radius on rectangle
		radius: PropTypes.number
	}

	/**
	 * Set a default value to unrequired props
	 */
	static defaultProps = {
		marginRight: 4,
		marginBottom: 4,
		displayLegend: true,
		rectWidth: 10,
		defaultColor: "#cdcdcd",
		transition: -1,
		backgroundColor: "#fff",
		textColor: "#000",
		radius: 0
	}

	constructor(props) {
		super(props)
		this.ID = Math.random()
			.toString(36)
			.replace(/[^a-z]+/g, "")
			.substr(0, 32)
		this.IDLegend = Math.random()
			.toString(36)
			.replace(/[^a-z]+/g, "")
			.substr(0, 32)
	}

	state = {
		svgElem: undefined,
		svgLegend: undefined,
		firstRender: true,
	}

	componentDidUpdate() {
		// I use a setTimeout to prevent a component update that stop the transition.
		setTimeout(() => {
			if (this.props.transition > 0 && this.state.firstRender && this.state.svgElem) {
				this.setState({ firstRender: false })
			}
		}, this.props.transition)
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
			displayLegend,
			transition,
			backgroundColor,
			textColor,
			radius
		} = this.props
		const { svgElem, svgLegend, firstRender } = this.state
		// Array of months for x axis
		const monthsName = ["Jan", "Feb", "Mar", "Avr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
		// Array of days for y axis
		const daysName = ["Sun", "Tue", "Thu", "Sat"]
		const dataset = []
		let t = null
		if (transition > 0 && firstRender) {
			t = d3.transition().duration(transition)
		}

		// This is a possible workaround about tooltips that do not want to hide when data change
		// See https://github.com/Caged/d3-tip/issues/133
		d3.select(".d3-tip." + this.ID).remove()
		d3.select(".d3-tip." + this.IDLegend).remove()

		const svg = d3.select(svgElem)
		// We remove all elemnts (rect + text) to properly update the svg
		svg.selectAll("*").remove()
		const tmpBufferDate = new Date(startDate)
		const startDateYesterday = new Date(startDate)
		// When want to display month on first column if difference between
		// startDate and endDate less than 1 month
		const noMonthName =
			(startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear()) ||
			(startDate.getMonth() == 11 && endDate.getMonth() === 0 && endDate.getFullYear() - startDate.getFullYear() === 1)
		startDateYesterday.setDate(startDateYesterday.getDate() - 1)
		// We set bufferDate to the previous Sunday of startDate.
		tmpBufferDate.setDate(tmpBufferDate.getDate() - startDateYesterday.getDay())
		const bufferDate = new Date(tmpBufferDate)
		bufferDate.setHours(0, 0, 0, 0)
		// Number of day from bufferDate to endDate
		const nbDayDiff = (endDate.getTime() - bufferDate.getTime()) / 1000 / 60 / 60 / 24
		svg.attr("width", (rectWidth + marginRight) * (nbDayDiff / 7) + 70).attr(
			"height",
			(rectWidth + marginBottom) * 7 + 50
		)

		if (noMonthName) {
			svg.append("text")
				.text(monthsName[startDate.getMonth()])
				.attr("x", () => {
					return Math.floor(0 / 7) * (rectWidth + marginRight) + 32
				})
				.attr("y", 18)
				.attr("font-size", 18)
				.attr("fill", textColor)
		}

		for (let i = 0; i < nbDayDiff; i++) {
			if (i == 0 || i === 2 || i === 4 || i === 6) {
				// Display day name as y axis
				svg.append("text")
					.text(daysName[i / 2])
					.attr("y", (i % 7) * (rectWidth + marginBottom) + rectWidth / 6 + 32)
					.attr("x", 0)
					.attr("fill", textColor)
			}
			// Find the first data that match with current bufferDate
			const objMatch = data.find(obj => {
				const dateTmp = new Date(obj.date)
				dateTmp.setHours(0, 0, 0, 0)
				bufferDate.setHours(0, 0, 0, 0)
				return dateTmp.getTime() === bufferDate.getTime()
			})
			// If bufferDate < (startDate - 1 day) we set the rectangle color like background to make that 'invisible'
			let finalColor = backgroundColor
			let maxCount = null
			// If there is no match we set the default color
			if (objMatch === undefined && bufferDate.getTime() >= startDateYesterday.getTime()) {
				finalColor = defaultColor
			} else if (bufferDate.getTime() >= startDateYesterday.getTime()) {
				finalColor = colors.filter(c => c.count <= objMatch.count)
				if (finalColor.length === 0) {
					finalColor = defaultColor
				} else {
					finalColor = finalColor[finalColor.length - 1].color
				}
			}
			const today = new Date(bufferDate.getTime())
			// Finally, we push it to an Array that will be used by d3
			dataset.push({ date: today, count: objMatch ? objMatch.count : maxCount || 0, color: finalColor, i })

			if (bufferDate.getDate() === 1 && !noMonthName) {
				// Display month name
				svg.append("text")
					.text(monthsName[bufferDate.getMonth()])
					.attr("x", () => {
						return Math.floor(i / 7) * (rectWidth + marginRight) + 32
					})
					.attr("y", 18)
					.attr("font-size", 18)
					.attr("fill", textColor)
			}
			bufferDate.setDate(bufferDate.getDate() + 1)
		}

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
			// Display all data rectangles
			const rects = svg
				.selectAll("rect")
				.data(dataset)
				.enter()
				.append("rect")
				.attr("fill-opacity", t !== null ? 0 : 1)
				.attr("width", rectWidth)
				.attr("height", rectWidth)
				.attr("class", "dayRect")
				.attr("x", d => {
					return Math.floor(d.i / 7) * (rectWidth + marginRight) + 32
				})
				.attr("y", d => {
					return (d.i % 7) * (rectWidth + marginBottom) + 24
				})
				.attr("fill", d => d.color)
				.attr('rx', radius)
				.attr('ry', radius)
				.on("mouseover", function(d) {
					if (d.color !== backgroundColor) {
						tip.show(d, this)
						d3.select(this).attr('stroke', 'black')
					}
				})
				.on("mouseout", d => {
					tip.hide(d, this)
					d3.selectAll('rect').attr('stroke', 'none')
				})

			if (t !== null) rects.transition(t).attr("fill-opacity", 1)
		}

		if (displayLegend) {
			const svgLegendD3 = d3.select(svgLegend)
			svgLegendD3.selectAll("*").remove()
			svgLegendD3.attr("width", (rectWidth + marginRight) * colors.length + 90 + 50).attr("height", 30)
			svgLegendD3
				.append("text")
				.text("Legend : ")
				.attr("x", 0)
				.attr("y", 20)
				.attr("font-size", 18)
				.attr("fill", textColor)

			const tip = d3Tip()
				.attr("class", "d3-tip " + this.IDLegend)
				.offset([-8, 0])
				.html(d => {
					return "<div style={{ fontSize: '15' }}>" + d.count + "</div>"
				})
			svgLegendD3.call(tip)

			svgLegendD3
				.selectAll("rect")
				.data(colors)
				.enter()
				.append("rect")
				.attr("width", rectWidth)
				.attr("height", rectWidth)
				.attr("x", (d, i) => (rectWidth + marginRight) * i + 76)
				.attr("y", 15 - rectWidth / 2)
				.attr('rx', radius)
				.attr('ry', radius)
				.attr("fill", d => d.color)
				.on("mouseover", function(d) {
					if (d.color !== backgroundColor) {
						tip.show(d, this)
						d3.select(this).attr('stroke', textColor)
					}
				})
				.on("mouseout", d => {
					tip.hide(d, this)
					d3.selectAll('rect').attr('stroke', 'none')
				})
		} else {
			const svgLegendD3 = d3.select(svgLegend)
			svgLegendD3.attr("width", 0).attr("height", 0)
		}

		return (
			<div
				style={{
					width: (rectWidth + marginRight) * (nbDayDiff / 7) + 70 + "px",
					height: "auto",
					backgroundColor: backgroundColor,
				}}
				id="react-d3-heatMap">
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
