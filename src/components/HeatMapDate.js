import React, { Component } from "react"
import PropTypes from "prop-types"
import * as d3 from "d3"
import d3Tip from 'd3-tip'

export default class HeatMapDate extends Component {
	static propTypes = {
		startDate: PropTypes.instanceOf(Date).isRequired,
		endDate: PropTypes.instanceOf(Date).isRequired,
		data: PropTypes.instanceOf(Array).isRequired, // Map<Date, number>
		colors: PropTypes.instanceOf(Map).isRequired,
		defaultColor: PropTypes.string,
		rectWidth: PropTypes.number,
		marginLeft: PropTypes.number,
		marginBottom: PropTypes.number,
		displayLegend: PropTypes.bool,
	}

	static defaultProps = {
		marginLeft: 4,
		marginBottom: 4,
		displayLegend: true,
		rectWidth: 10,
		defaultColor: "#cdcdcd",
	}

	constructor(props) {
		super(props)
	}
	
	state = {
		svgElem: undefined
	}

	render() {
		const {
			startDate,
			endDate,
			data,
			colors,
			defaultColor,
			rectWidth,
			marginLeft,
			marginBottom,
			displayLegend,
		} = this.props
		const monthsName = ['Jan', 'Feb', 'Mar', 'Avr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		const dataset = []

		const svg = d3.select(this.state.svgElem)
		const tmpBufferDate = new Date(startDate)
		tmpBufferDate.setDate(tmpBufferDate.getDate() - startDate.getDay())
		const bufferDate = new Date(tmpBufferDate)
		bufferDate.setHours(0, 0, 0, 0)
		const nbDayDiff = (endDate.getTime() - bufferDate.getTime()) / 1000 / 60 / 60 / 24
		for (let i = 0; i < nbDayDiff; i++) {
			const objMatch = data.find(obj => {
				const dateTmp = new Date(obj.date)
				dateTmp.setHours(0, 0, 0, 0)
				bufferDate.setHours(0, 0, 0, 0)
				return dateTmp.getTime() === bufferDate.getTime()
			})
			let finalColor = "#FFFFFF"
			let maxCount = null
			if (objMatch === undefined && bufferDate.getTime() >= startDate.getTime()) {
				finalColor = defaultColor
			} else if (bufferDate.getTime() >= startDate.getTime()) {
				finalColor = colors.get(objMatch.count)
				if (finalColor === undefined) {
					colors.forEach((color, count) => {
						if (!maxCount || maxCount < count) maxCount = count
					})
					finalColor = colors.get(maxCount)
				}
			}
			const today = new Date(bufferDate.getTime())
			dataset.push({ date: today, count: objMatch ? objMatch.count : maxCount || 0, color: finalColor, i })

			/* svg.append("rect")
				.attr("width", rectWidth)
				.attr("height", rectWidth)
				.attr("class", 'dayRect')
				.attr("x", () => {
					return Math.floor(i / 7) * (rectWidth + marginLeft)
				})
				.attr("y", () => {
					return (i % 7) * (rectWidth + marginBottom) + 20
				})
				.attr("fill", finalColor)
				.on("mouseenter", () => {
					console.log(new Date(bufferDate), objMatch ? objMatch.count : 0)
				}) */
			if (bufferDate.getDate() === 1) {
				svg.append("text")
				.text(monthsName[bufferDate.getMonth()])
				.attr('x', () => {
					return Math.floor(i / 7) * (rectWidth + marginLeft)
				})
				.attr('y', 12)
			}
			bufferDate.setDate(bufferDate.getDate() + 1)
		}

		if (dataset.length > 0) {
			const tip = d3Tip()
				.attr('class', 'd3-tip')
				.offset([-8, 0])
				.html(d => {
					if (d.color !== "#FFFFFF") {
						return d.date.getFullYear() + "/" + (d.date.getMonth()+1) + "/" + d.date.getDate() + " : " + d.count
					} else return null
				})
			svg.call(tip)
			svg.selectAll("rect")
				.data(dataset)
				.enter()
				.append("rect")
				.attr("width", rectWidth)
				.attr("height", rectWidth)
				.attr("class", 'dayRect')
				.attr("x", (d) => {
					return Math.floor(d.i / 7) * (rectWidth + marginLeft)
				})
				.attr("y", (d) => {
					return (d.i % 7) * (rectWidth + marginBottom) + 20
				})
				.attr("fill", d => d.color)
				.on('mouseover', function(d) { if (d.color !== "#FFFFFF") tip.show(d, this); })
				.on('mouseout', tip.hide)
		}
		return (
			<div>
				<svg ref={elem => {if (!this.state.svgElem) this.setState({ svgElem: elem })}} width="1400" height="700"/>
			</div>
		)
	}
}
