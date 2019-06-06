# 1.1.5

New Feature : 
  - fadeAnimation : Control fade in animation. 

Other :
  - Apply patches for High severities

# 1.1.4

New Feature : 
  - rangeDisplaData : Display data between two dates. 

# 1.1.3

New Feature : 
  - monthSpace : You can change space between months

Enhancement : 
  - Improve months display

Other : 
  - Refactor code

# 1.1.1

Security : 
  - Resolve vulnerability alert from `webpack-dev-server`. See vulnerability [Here](https://www.npmjs.com/advisories/725)

# 1.1.0

Enhancement:
  - Support typescript 🎉

Important : Transition has been removed

# 1.0.9

New Feature:
  - You can choose to start your heatmap Monday or Sunday. Default is Sunday

Security alert:
  - Fix a dependency alert (dep affected : merge < 1.2.1)

# 1.0.8

New Features:
  - Add a function that convert an array of dates to an array of data (`Array[{date: Date, count: Number}]`)
  - You can custom tooltip's text
  - You can also custom default color tooltip's text

Improvement:
  - Default color is displayed in legend

# 1.0.7

New Features:
  - You can custom backgroundColor, textColor, squares radius, CSS class.
  - You can choose to displayYear
  - You can execute your own function when mouse clicks, enters and/or leaves a square
  - When a square is hovered, it display a stroke on this square

Bug fix:
  - Legend tooltips should works correctly even if datas are updated

# 1.0.6

Bug fix:
  - Tooltips should works correctly even if datas are updated

# 1.0.3

Bug fix

# 1.0.1

Bug fixes:
  - Sometime tooltip does not display (due to a workaround)

# 1.0.0

New Feature:
  - You can add a transition when heat map renders for the first time
  - You can custom background and text color

Improvements:
  - Improve tests

Bug fixes

# 0.0.17-beta

bug fix: 
  - When legend is disabled, we set both width and height to 0 
  - expand svg to the right + improve month display by display month when startDate and endDate have same month and year
  - update README and remove a log print 

# 0.0.15-beta

New Feature: 
  - Heat map to visualize data between two dates
