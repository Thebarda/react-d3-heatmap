import React, { Component } from "react"
import PropTypes from "prop-types"
import * as d3 from "d3"
import d3Tip from "d3-tip"
import _ from "lodash"
import "../tooltip.css"

export default class HeatMapDate extends Component {
	static propTypes = {
		startDate: PropTypes.instanceOf(Date).isRequired,
		endDate: PropTypes.instanceOf(Date).isRequired,
		data: PropTypes.instanceOf(Array).isRequired,
		colors: PropTypes.instanceOf(Array).isRequired,
		defaultColor: PropTypes.string,
		rectWidth: PropTypes.number,
		marginRight: PropTypes.number,
		marginBottom: PropTypes.number,
		displayLegend: PropTypes.bool,
		transition: PropTypes.number,
	}

	static defaultProps = {
		marginRight: 4,
		marginBottom: 4,
		displayLegend: true,
		rectWidth: 10,
		defaultColor: "#cdcdcd",
		transition: -1,
	}

	constructor(props) {
		super(props)
	}

	state = {
		svgElem: undefined,
		svgLegend: undefined,
		firstRender: true
	}

	componentDidUpdate() {
		setTimeout(() => {
			if (this.props.transition > 0 && this.state.firstRender && this.state.svgElem && this.state.svgLegend) {
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
		} = this.props
		const { svgElem, svgLegend, firstRender } = this.state
		const monthsName = ["Jan", "Feb", "Mar", "Avr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
		const daysName = ["Sun", "Tue", "Thu", "Sat"]
		const dataset = []
		let t = null
		if (transition > 0 && firstRender) {
			t = d3.transition().duration(transition)
		}

		const svg = d3.select(svgElem)
		svg.selectAll("*").remove()
		const tmpBufferDate = new Date(startDate)
		const startDateYesterday = new Date(startDate)
		const noMonthName =
			startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear()
		startDateYesterday.setDate(startDateYesterday.getDate() - 1)
		tmpBufferDate.setDate(tmpBufferDate.getDate() - startDateYesterday.getDay())
		const bufferDate = new Date(tmpBufferDate)
		bufferDate.setHours(0, 0, 0, 0)
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
		}

		for (let i = 0; i < nbDayDiff; i++) {
			if (i == 0 || i === 2 || i === 4 || i === 6) {
				svg.append("text")
					.text(daysName[i / 2])
					.attr("y", (i % 7) * (rectWidth + marginBottom) + rectWidth / 6 + 32)
					.attr("x", 0)
			}
			const objMatch = data.find(obj => {
				const dateTmp = new Date(obj.date)
				dateTmp.setHours(0, 0, 0, 0)
				bufferDate.setHours(0, 0, 0, 0)
				return dateTmp.getTime() === bufferDate.getTime()
			})
			let finalColor = "#FFFFFF"
			let maxCount = null
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
			dataset.push({ date: today, count: objMatch ? objMatch.count : maxCount || 0, color: finalColor, i })

			if (bufferDate.getDate() === 1 && !noMonthName) {
				svg.append("text")
					.text(monthsName[bufferDate.getMonth()])
					.attr("x", () => {
						return Math.floor(i / 7) * (rectWidth + marginRight) + 32
					})
					.attr("y", 18)
					.attr("font-size", 18)
			}
			bufferDate.setDate(bufferDate.getDate() + 1)
		}

		if (dataset.length > 0) {
			const tip = d3Tip()
				.attr("class", "d3-tip")
				.offset([-8, 0])
				.html(d => {
					if (d.color !== "#FFFFFF") {
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
			const rects = svg
				.selectAll("rect")
				.data(dataset)
				.enter()
				.append("rect")
				.style("opacity", t !== null ? 0 : 1)
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
				.on("mouseover", function(d) {
					if (d.color !== "#FFFFFF") tip.show(d, this)
				})
				.on("mouseout", tip.hide)
			if (t !== null) rects.transition(t).style("opacity", "1")
		}

		if (displayLegend) {
			const svgLegend = d3.select(svgLegend)
			svgLegend.selectAll("*").remove()
			svgLegend.attr("width", (rectWidth + marginRight) * colors.size + 90 + 50).attr("height", 30)
			svgLegend
				.append("text")
				.text("Legend :")
				.attr("x", 0)
				.attr("y", 20)
				.attr("font-size", 18)

			const tip = d3Tip()
				.attr("class", "d3-tip")
				.offset([-8, 0])
				.html(d => {
					return "<div style={{ fontSize: '15' }}>" + d.count + "</div>"
				})
			svgLegend.call(tip)

			svgLegend
				.selectAll("rect")
				.data(colors)
				.enter()
				.append("rect")
				.attr("width", rectWidth)
				.attr("height", rectWidth)
				.attr("x", (d, i) => (rectWidth + marginRight) * i + 76)
				.attr("y", 15 - rectWidth / 2)
				.attr("fill", d => d.color)
				.on("mouseover", tip.show)
				.on("mouseout", tip.hide)
		} else {
			const svgLegend = d3.select(svgLegend)
			svgLegend.attr("width", 0).attr("height", 0)
		}

		return (
			<div style={{ width: "auto", height: "auto" }} id="react-d3-heatMap">
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
