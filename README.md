# react-d3-heatmap

A simple React heat map to visualize your data between two dates using d3.js

This heat map will display squares inside SVG. A square represent a day.

# Demo

[Here is a preview](https://codesandbox.io/s/wnk771y0m7?view=preview)
Or
[View with the whole code](https://codesandbox.io/s/wnk771y0m7)

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
|colors|Let's colorize this heat map <br /> It must be an array of objects that a number and a color like `"#2323232"`|`Array[{count: Number, color: String, text: string (optional)}]`|`true`|
|defaultColor|A string that contain a default color|`String`|`false`|`"#cdcdcd"`
|textDefaultColor|A tooltip's text displayed in legend for default color|`String`|`false`|`"0"`
|rectWidth|Set width and height for each square|`Number`|`false`|`10`
|marginRight|Space between two squares on x axis|`Number`|`false`|`4`
|marginBottom|Space between two squares on y axis|`Number`|`false`|`4`
|displayLegend|Display or not a legend|`Boolean`|`false`|`true`
|transition|Add a fade in transition. Must be greater then 0 | `Number`|`false`|`-1`
|backgroundColor|Custom background color (ex: `"#2323232"`)|`String`|`false`|`"#fff"`
|textColor|Custom text color (ex: `"#00ff00"`)|`String`|`false`|`"#000"`
|radius|Apply a radius on each square|`Number`|`false`|`0`
|classnames|Apply your own CSS class|`String`|`false`|`""`
|displayYear|Display on each month (ex: `17/Avr`)|`Boolean`|`false`|`false`
|onClick|Execute a callback function when clicking on a square. Params: `(data, index)`|`Function`|`false`|`{}`
|onMouseEnter|Execute a callback function when mouse entering in a square. Params: `(data, index)`|`Function`|`false`|`{}`
|onMouseLeave|Execute a callback function when mouse leaving a square. Params: `(data, index)`|`Function`|`false`|`{}`

# Author

Tom Darneix
# License

MIT
