import React, { Component } from "react"
import PropTypes from 'prop-types'
import d3 from 'd3'

export default class HeatMapDate extends Component {

    static propTypes = {
        startDate: PropTypes.instanceOf(Date).isRequired,
        endDate: PropTypes.instanceOf(Date).isRequired,
        data: PropTypes.instanceOf(Array).isRequired,
        colors: PropTypes.instanceOf(Array).isRequired,
        width: PropTypes.number,
        marginLeft: PropTypes.number,
        marginBottom: PropTypes.number,
        displayLegend: PropTypes.bool,
    }

    static defaultProps = {
        marginLeft: 5,
        marginBottom: 5,
        displayLegend: true,
        width: 7,
    }

    constructor(props) {
        super(props)
    }

    render() {
        const {
            startDate,
            endDate,
            data,
            colors,
            width,
            marginLeft,
            marginBottom,
            displayLegend
        } = this.props
        //const svg = d3.select('.heatMapDateClass')
        const tmpBufferDate = new Date(startDate)
        tmpBufferDate.setDate(tmpBufferDate.getDate() - startDate.getDay())
        const bufferDate = new Date(tmpBufferDate)
        const nbDayDiff = (startDate.getTime() - endDate.getTime()) / 1000 / 60 / 60 / 24
        for (let i = 0; i < nbDayDiff; i++) {
            
        }
        return (
            <div>
                <svg className="heatMapDateClass"></svg>
            </div>
        )
    }
}