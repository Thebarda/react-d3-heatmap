import React from "react";
import ReactDOM from "react-dom";
import { HeatMapDate } from './index'
//Here is the playground
//You can test your code here
const startDate = new Date()
const endDate = new Date()
endDate.setFullYear(startDate.getFullYear() - 1)
ReactDOM.render(
    <HeatMapDate
        startDate={startDate}
        endDate={endDate}
        data={[]}
        colors={[]}
    />
    , document.getElementById("index"));