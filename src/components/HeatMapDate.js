import React, { Component } from "react"
import PropTypes from "prop-types"
import * as d3 from "d3"

export default class HeatMapDate extends Component {
	static propTypes = {
		startDate: PropTypes.instanceOf(Date).isRequired,
		endDate: PropTypes.instanceOf(Date).isRequired,
		data: PropTypes.instanceOf(Map).isRequired, // Map<Date, number>
		colors: PropTypes.instanceOf(Array).isRequired,
		defaultColor: PropTypes.string,
		rectWidth: PropTypes.number,
		marginLeft: PropTypes.number,
		marginBottom: PropTypes.number,
		displayLegend: PropTypes.bool,
	}

	static defaultProps = {
		marginLeft: 2,
		marginBottom: 2,
		displayLegend: true,
		rectWidth: 7,
		defaultColor: "#cdcdcd",
	}

	constructor(props) {
		super(props)
    }
    
    componentDidMount() {
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
        const svg = d3.selectAll(".heatMapDateClass")
		const tmpBufferDate = new Date(startDate)
		tmpBufferDate.setDate(tmpBufferDate.getDate() - startDate.getDay())
		const bufferDate = new Date(tmpBufferDate)
		const nbDayDiff = (endDate.getTime() - bufferDate.getTime()) / 1000 / 60 / 60 / 24
		for (let i = 0; i < nbDayDiff + 1; i++) {
			const count = data.get(bufferDate)
			let finalColor = "#FFFFFF"
			if (count === undefined && bufferDate.getTime() < startDate.getTime()) {
				finalColor = defaultColor
			} else if (bufferDate.getTime() >= startDate.getTime()) {
				finalColor = colors.find(c => c.count === count)
            }
            console.log(finalColor)
			svg.append("rect")
				.attr("width", rectWidth)
				.attr("height", rectWidth)
				.attr("x", () => {
					return Math.floor(i / 7) * (rectWidth + marginLeft)
				})
				.attr("y", () => {
					return (i % 7) * (rectWidth + marginBottom)
				})
				.attr("fill", finalColor)
			bufferDate.setDate(bufferDate.getDate() + 1)
        }
    }

	render() {
		return (
			<div>
				<svg className="heatMapDateClass" width="1400" height="700"/>
			</div>
		)
	}
}
