/* eslint-disable */
import React, { Component } from 'react';
import HeatMapDate from 'react-d3-heatmap'

class App extends Component {

  setData(dateStart, dateEnd, nb) {
    const data = []
    const dates = []
    for (let i = 0; i < nb; i++) {
          let date = this.randomDate(dateStart, dateEnd)
          while (dates.includes(dates)) {
              date = this.randomDate(dateStart, dateEnd)
          }
          dates.push(date)
          const count = Math.floor(Math.random() * 14)
          data.push({date: new Date(date), count })
      }
      return data
  }

  randomDate(start, end) {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  }

  render() {
    const endDate = new Date()
    const startDate = new Date()
    startDate.setFullYear(startDate.getFullYear()-1)
    const data = this.setData(startDate, endDate, 231)
    const colors = []
    colors.push({ count: 2, color: "#66ff33" })
    colors.push({ count: 3, color: "#99ff33" })
    colors.push({ count: 4, color: "#ccff33" })
    colors.push({ count: 6, color: "#ffcc00" })
    colors.push({ count: 7, color: '#ff9933' })
    colors.push({ count: 9, color: "#ff0000" })
    return (
      <div>
        <HeatMapDate
          startDate={startDate}
          endDate={endDate}
          data={data}
          colors={colors}
          rectWidth={15}
          displayLegend
        />
      </div>
    );
  }
}

export default App;
