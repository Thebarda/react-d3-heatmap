# react-d3-heatmap

![Build](https://travis-ci.org/Thebarda/react-d3-heatmap.svg?branch=master)

A simple React heat map to visualize your data between two dates using d3.js

This heat map will display squares inside SVG. A square represent a day.

Now, it supports Typescript 🎉

# Demo

<a href="https://wnk771y0m7.codesandbox.io" target="_blank">Here is a preview</a>
Or
<a href="https://codesandbox.io/s/wnk771y0m7" target="_blank">View with the whole code</a>

# Installation

    npm i react-d3-heatmap

or

    yarn add react-d3-heatmap

# Usage

react-d3-heatmap is very easy to use. 

Here is a basic usage :
```javascript
<HeatMapDate
    startDate={startDate}
    endDate={endDate}
    data={data}
    colors={colors}
    displayLegend
/>
```

# Documentation

You can change these props :

| Prop | Definition | Type | Is required ? | Default |
|------|-------------|------|---------------|---------|
|data|Your data to visualize. <br /> It must be an array of objects that contain a date and a number|`Array[{date: Date, count: Number}]`|`true`|
|startDate|Your heat map will begin at this date| `Date`|`true`|
|endDate|Your heat map will end at this date|`Date`|`true`|
|colors|Let's colorize this heat map <br /> It must be an array of objects that a number and a color like `"#232323"`|`Array[{count: Number, color: String, text: string (optional)}]`|`true`|
|defaultColor|A string that contain a default color|`String`|`false`|`"#cdcdcd"`
|textDefaultColor|A tooltip's text displayed in legend for default color|`String`|`false`|`"0"`
|rectWidth|Set width and height for each square|`Number`|`false`|`10`
|marginRight|Space between two squares on x axis|`Number`|`false`|`4`
|marginBottom|Space between two squares on y axis|`Number`|`false`|`4`
|displayLegend|Display or not a legend|`Boolean`|`false`|`true`
|backgroundColor|Custom background color (ex: `"#232323"`)|`String`|`false`|`"#fff"`
|textColor|Custom text color (ex: `"#00ff00"`)|`String`|`false`|`"#000"`
|radius|Apply a radius on each square|`Number`|`false`|`0`
|classnames|Apply your own CSS class|`String`|`false`|`""`
|displayYear|Display on each month (ex: `17/Avr`)|`Boolean`|`false`|`false`
|onClick|Execute a callback function when clicking on a square. Params: `(data, index)`|`Function`|`false`|`{}`
|onMouseEnter|Execute a callback function when mouse entering in a square. Params: `(data, index)`|`Function`|`false`|`{}`
|onMouseLeave|Execute a callback function when mouse leaving a square. Params: `(data, index)`|`Function`|`false`|`{}`
|shouldStartMonday|Usually heatmap starts on Sunday but you can start it on Monday|`Boolean`|`false`|`false`
|monthSpace|Change space between month blocks|`Number`|`false`|`0`
|rangeDisplayData|Display data between two dates. Tip: You can create an array of one or two dates <br > Example: `[new Date("2018-10-15T17:41:27"), new Date("2019-02-21T23:01:50")]`, `[new Date("2019-02-21T23:01:50")]`, `[null, new Date("2019-02-21T23:01:50")]` |`Array[Date]`|`false`|`[]`
|fadeAnimation|Control fade in animation|`Object{animate: Boolean, duration: Number (in second)}`|`false`|`{ animate: true, duration: 0.4 }`

# Author

Tom Darneix
# License

MIT
