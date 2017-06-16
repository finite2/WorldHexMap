
var dataPath = 'hexData/WorldHexData_multi.json';
var data;
var variable;
var map, scaleMin, scaleMax, colourScale, cols;

var width = 1500;
var height;
var angle = 60;
var edgeLength = 8;

var svgID = '#svgFrame'

var xmin,xmax,ymin,ymax;
var xrng,yrng;
var svg, legendsvg;
var tip;
var dataType = 'pop';
var mapType = 'hexes_one';
var unStatus = false;

// load data
var petitionData = {};
function init() {
 loadJSON(function(response) {
  // Parse JSON string into object
    petitionData = JSON.parse(response);
 }, dataPath);
}

// init();

var selections = {}

/*********************************************************************************************************************************/
selections.pop = function() {
  variable = 'pop_jul2017'
  
  cols = ['#FFFFFF','#FFFF00','#CCA500','#00AA00','#6666FF','#FF0000'];
  
  scaleMin = Math.min.apply(Math, data.map(function(o){if(o[variable] !== null & o[variable] > 500){return o[variable];} else {return 1000000}}));
  scaleMax = Math.max.apply(Math, data.map(function(o){if(o[variable] !== null){return o[variable];} else {return 1000000}}));
  
  colourScale = d3.scaleLog()
  .domain(hexmap.interpolateSpace(scaleMin,scaleMax,cols.length, true))
  .range(cols);
  
  tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<div class='tip'><strong>Country:</strong> <span style='color:red'>" + d.Country + "</span></div><div class='tip'><strong>Population: </strong><span style='color:green'>" + d3.format('.3s')(d[variable]) + "</span></div>";
  })

  svg.call(tip)
  
  sinEdgeLength = Math.sin(angle) * edgeLength;
  cosEdgeLength = Math.cos(angle) * edgeLength;
  
  map = hexmap.map(data)
    .fill(function (country) {
        return colourScale(country[variable]);
      })
    .origin({x: xOrigin, y: yOrigin})
    .stroke('#CCCCCC')
    .edgeLength(edgeLength)
    .angle(angle)
    .dir('ver')
    .addTip(true)
    .mapType(mapType);
  
  tiles = map(svg);
  
  legend = legends.ctsColour().colourScale(colourScale).scaleMin(scaleMin).scaleMax(scaleMax).log(true).title('Population');
  legend(legendSvg);
  
  hexmap.title(svg, 'Population July 2016')
}

/*********************************************************************************************************************************/
selections.size = function() {
  variable = 'CountrySizeKM'
  
  cols = ['#FFFFFF','#FFFF00','#CCA500','#00AA00','#6666FF','#FF0000'];
  
  scaleMin = 1;
  scaleMax = Math.max.apply(Math, data.map(function(o){if(o[variable] !== null){return o[variable];} else {return 1000}}));
  
  colourScale = d3.scaleLog()
  .domain(hexmap.interpolateSpace(scaleMin,scaleMax,cols.length, true))
  .range(cols);
  
  tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<div class='tip'><strong>Country:</strong> <span style='color:red'>" + d.Country + "</span></div><div class='tip'><strong>Size: </strong><span style='color:green'>" + d3.format('.3s')(d[variable]) + "</span> km</div>";
  })

  svg.call(tip)

  sinEdgeLength = Math.sin(angle) * edgeLength;
  cosEdgeLength = Math.cos(angle) * edgeLength;
  
  map = hexmap.map(data)
    .fill(function (country) {
        return colourScale(country[variable]);
      })
    .origin({x: xOrigin, y: yOrigin})
    .stroke('#CCCCCC')
    .edgeLength(edgeLength)
    .angle(angle)
    .dir('ver')
    .addTip(true)
    .mapType(mapType);
  
  tiles = map(svg);

  legend = legends.ctsColour().colourScale(colourScale).scaleMin(scaleMin).scaleMax(scaleMax).log(true).title('Size (km)');
  legend(legendSvg);
  
  hexmap.title(svg, 'Country Size (km)')

}

/*********************************************************************************************************************************/
selections.popkm = function() {
  variable = 'pop_jul2017_pkm'
  
  cols = ['#FFFFFF','#FFFF00','#CCA500','#00AA00','#6666FF','#FF0000'];
  
  scaleMin = Math.min.apply(Math, data.map(function(o){if(o[variable] !== null & o[variable] != 0){return o[variable];} else {return 1}}));
  scaleMax = Math.max.apply(Math, data.map(function(o){if(o[variable] !== null){return o[variable];} else {return 1}}));
  
  colourScale = d3.scaleLog()
  .domain(hexmap.interpolateSpace(scaleMin,scaleMax,cols.length, true))
  .range(cols);
  
  tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<div class='tip'><strong>Country:</strong> <span style='color:red'>" + d.Country + "</span></div><div class='tip'><strong>Population per km: </strong><span style='color:green'>" + d3.format('.3s')(d[variable]) + "</span> /km</div>";
  })
  
  svg.call(tip)

  sinEdgeLength = Math.sin(angle) * edgeLength;
  cosEdgeLength = Math.cos(angle) * edgeLength;
  
  map = hexmap.map(data)
    .fill(function (country) {
        return colourScale(country[variable]);
      })
    .origin({x: xOrigin, y: yOrigin})
    .stroke('#CCCCCC')
    .edgeLength(edgeLength)
    .angle(angle)
    .dir('ver')
    .addTip(true)
    .mapType(mapType);
  
  tiles = map(svg);
  
  legend = legends.ctsColour().colourScale(colourScale).scaleMin(scaleMin).scaleMax(scaleMax).log(true).title('People per km');
  legend(legendSvg);
  
  hexmap.title(svg, 'Population density (population per km)')
}

/*********************************************************************************************************************************/
selections.GDP = function() {
  variable = 'GDP'
  
  cols = ['#FFFFFF','#FFFF00','#CCA500','#00AA00','#6666FF','#FF0000'];
  
  scaleMin = Math.min.apply(Math, data.map(function(o){if(o[variable] !== null){return o[variable];} else {return 100000000}}));
  scaleMax = Math.max.apply(Math, data.map(function(o){if(o[variable] !== null){return o[variable];} else {return 1}}));
  
  colourScale = d3.scaleLog()
  .domain(hexmap.interpolateSpace(scaleMin,scaleMax,cols.length, true))
  .range(cols);
  
  tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<div class='tip'><strong>Country:</strong> <span style='color:red'>" + d.Country + "</span></div><div class='tip'><strong>GDP: </strong><span style='color:green'>" + d3.format('.3s')(d[variable]) + "</span>$</div>";
  })
  
  svg.call(tip)

  sinEdgeLength = Math.sin(angle) * edgeLength;
  cosEdgeLength = Math.cos(angle) * edgeLength;
  
  map = hexmap.map(data)
    .fill(function (country) {
        return colourScale(country[variable]);
      })
    .origin({x: xOrigin, y: yOrigin})
    .stroke('#CCCCCC')
    .edgeLength(edgeLength)
    .angle(angle)
    .dir('ver')
    .addTip(true)
    .mapType(mapType);
  
  tiles = map(svg);
  
  legend = legends.ctsColour().colourScale(colourScale).scaleMin(scaleMin).scaleMax(scaleMax).log(true).title('Dollars ($)');
  legend(legendSvg);
  
  hexmap.title(svg, 'GDP in USD ($)')
}

/*********************************************************************************************************************************/
selections.GDPpp = function() {
  variable = 'GDPpp'
  
  cols = ['#FFFFFF','#FFFF00','#CCA500','#00AA00','#6666FF','#FF0000'];
  
  scaleMin = Math.min.apply(Math, data.map(function(o){if(o[variable] !== null){return o[variable];} else {return 10000}}));
  scaleMax = Math.max.apply(Math, data.map(function(o){if(o[variable] !== null){return o[variable];} else {return 1}}));
  
  colourScale = d3.scaleLog()
  .domain(hexmap.interpolateSpace(scaleMin,scaleMax,cols.length, true))
  .range(cols);
  
  tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<div class='tip'><strong>Country:</strong> <span style='color:red'>" + d.Country + "</span></div><div class='tip'><strong>GDP: </strong><span style='color:green'>" + d3.format('.3s')(d[variable]) + "</span>($) per person</div>";
  })

  svg.call(tip)
  
  sinEdgeLength = Math.sin(angle) * edgeLength;
  cosEdgeLength = Math.cos(angle) * edgeLength;
  
  map = hexmap.map(data)
    .fill(function (country) {
        return colourScale(country[variable]);
      })
    .origin({x: xOrigin, y: yOrigin})
    .stroke('#CCCCCC')
    .edgeLength(edgeLength)
    .angle(angle)
    .dir('ver')
    .addTip(true)
    .mapType(mapType);
  
  tiles = map(svg);

  legend = legends.ctsColour().colourScale(colourScale).scaleMin(scaleMin).scaleMax(scaleMax).log(true).title('$ per person');
  legend(legendSvg);
  
  hexmap.title(svg, 'GDP per capita ($ per person)')
}
  
/*********************************************************************************************************************************/
selections.un = function() {
  
  // variables
  variable = 'UN'
  colourScale = d3.scaleLinear()
  .domain([0,1])
  .range(['#FF0000','#2fa900']);
  
  // tooltip
  tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "<div class='tip'><strong>Country:</strong> <span style='color:red'>" + d.Country + "</span></div><div class='tip'><strong>Part of UN: </strong><span style='color:green'>" + d[variable] + "</span></div>";
  })

  map = hexmap.map(data)
    .fill(function (country) {
        return colourScale(0 + (country[variable] == "TRUE"));
      })
    .origin({x: xOrigin, y: yOrigin})
    .stroke('#CCCCCC')
    .edgeLength(edgeLength)
    .angle(angle)
    .dir('ver')
    .mapType(mapType);
  
  map(svg);

  d3.selectAll('.d3-tip').remove()
  svg.call(tip)
  
  legendData = [
    {col: 1, text: 'Country of UN'},
    {col: 0, text: 'Not country of UN'}
  ]
  
  legend = legends.categories().symbol(hexmap.symbol).legendData(legendData).colourScale(colourScale).title('United Nations status');
  
  legend(legendSvg);
  hexmap.title(svg, 'Countries who are members of the United Nations')
}

/*********************************************************************************************************************************/
selections.region = function() {
  
  // variables
  variable = 'UN_cont_region';
  cols = ['#FFFF00','#CCA500','#00AA00','#6666FF','#FF0000'];
  legendData = [
    {col: 0, text: 'Africa'},
    {col: 1, text: 'Americas'},
    {col: 2, text: 'Asia'},
    {col: 3, text: 'Europe'},
    {col: 4, text: 'Oceania'}
  ]
  
  colourScale = d3.scaleLinear()
  .domain(hexmap.interpolateSpace(0,4,legendData.length, false))
  .range(cols);
  
  // tooltip
  tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "<div class='tip'><strong>Country:</strong> <span style='color:red'>" + d.Country + "</span></div><div class='tip'><strong>Continental region: </strong><span style='color:green'>" + d[variable] + "</span></div>";
  })
  
  map = hexmap.map(data)
    .fill(function (country) {
    console.log(country)
        return colourScale((country[variable] == 'Americas') + 2*(country[variable] == 'Asia') + 3*(country[variable] == 'Europe') + 4*(country[variable] == 'Oceania'));
      })
    .origin({x: xOrigin, y: yOrigin})
    .stroke('#CCCCCC')
    .edgeLength(edgeLength)
    .angle(angle)
    .dir('ver')
    .mapType(mapType);
  
  map(svg);

  svg.call(tip)
  
  legend = legends.categories().symbol(hexmap.symbol).legendData(legendData).colourScale(colourScale).title('United Nations region');
  
  legend(legendSvg);
  hexmap.title(svg, 'United Nations Continental Regions')  
}

/*********************************************************************************************************************************/
selections.statRegion = function() {
  
  // variables
  variable = 'UN_stat_region';
  cols = ['#FFFF00','#CCA500','#00AA00','#6666FF','#FF0000'];
  legendData = [
    {col: 0, text: "Eastern Asia"},
    {col: 1, text: "Southern Asia"},
    {col: 2, text: "Northern America"},
    {col: 3, text: "South-Eastern Asia"},
    {col: 4, text: "South America"},
    {col: 5, text: "Western Africa"},
    {col: 6, text: "Eastern Europe"},
    {col: 7, text: "Central America"},
    {col: 8, text: "Eastern Africa"},
    {col: 9, text: "Northern Africa"},
    {col: 10, text: "Western Europe"},
    {col: 11, text: "Middle Africa"},
    {col: 12, text: "Western Asia"},
    {col: 13, text: "Northern Europe"},
    {col: 14, text: "Southern Europe"},
    {col: 15, text: "Southern Africa"},
    {col: 16, text: "Central Asia"},
    {col: 17, text: "Australia and New Zealand"},
    {col: 18, text: "Caribbean"},
    {col: 19, text: "Melanesia"},
    {col: 20, text: "Polynesia"},
    {col: 21, text: "Micronesia"}
  ]

  colourScale = d3.scaleLinear()
  .domain(hexmap.interpolateSpace(0,legendData.length-1,cols.length, false))
  .range(cols);
  
  // tooltip
  tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "<div class='tip'><strong>Country:</strong> <span style='color:red'>" + d.Country + "</span></div><div class='tip'><strong>Statistical region: </strong><span style='color:green'>" + d[variable] + "</span></div>";
  })

  map = hexmap.map(data)
    .fill(function (country) {
        var obj = legendData.filter(function (entry) { return entry.text === country[variable]; });
    if(obj.length > 0){
      console.log(obj.length)
        return colourScale(obj[0].col);
    } else {
      return('#CCCCCC')
    }
      })
    .origin({x: xOrigin, y: yOrigin})
    .stroke('#CCCCCC')
    .edgeLength(edgeLength)
    .angle(angle)
    .dir('ver')
    .mapType(mapType);
  
  map(svg);

  svg.call(tip)
  
  legendSvg.selectAll('*').remove();
  
  hexmap.title(svg, 'United Nations Statistical Regions')
}

/*********************************************************************************************************************************/
selections.womenPop = function() {
  // variables
  variable = 'gender';
  cols = ['#000000','#0000FF','#FFFFFF','#FF0000','#000000'];

  scaleMin = 80
  scaleMax = 120
  
  colourScale = d3.scaleLinear()
  .domain([40,80,100,120,160])
  .range(cols);
  
  // tooltip
  tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "<div class='tip'><strong>Country:</strong> <span style='color:red'>" + d.Country + "</span></div><div class='tip'><strong>Women per 100 men: </strong><span style='color:green'>" + d[variable] + "</span></div>";
  })

  map = hexmap.map(data)
    .fill(function (country) {
    console.log(country[variable])
    if(country[variable] !== "NA"){
        return colourScale(country[variable]);
    } else {
      return '#CCCCCC'
    }
    })
    .origin({x: xOrigin, y: yOrigin})
    .stroke('#CCCCCC')
    .edgeLength(edgeLength)
    .angle(angle)
    .dir('ver')
    .mapType(mapType);
  
  map(svg);

  svg.call(tip)
  
  legend = legends.ctsColour().colourScale(colourScale).scaleMin(scaleMin).scaleMax(scaleMax).nTicks(5).log(false).title('Women per 100 men');
  legend(legendSvg);
  hexmap.title(svg, 'Women per 100 men (2005)')
}

/*********************************************************************************************************************************/
selections.womenBirth = function() { 
  // variables
  variable = 'genderBirth';
  cols = ['#000000','#0000FF','#FFFFFF','#FF0000','#000000'];

  scaleMin = 80
  scaleMax = 120
  
  colourScale = d3.scaleLinear()
  .domain([40,80,100,120,160])
  .range(cols);
  
  // tooltip
  tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "<div class='tip'><strong>Country:</strong> <span style='color:red'>" + d.Country + "</span></div><div class='tip'><strong>Women per 100 men: </strong><span style='color:green'>" + d[variable] + "</span></div>";
  })

  map = hexmap.map(data)
    .fill(function (country) {
    console.log(country[variable])
    if(country[variable] !== "NA"){
        return colourScale(country[variable]);
    } else {
      return '#CCCCCC'
    }
    })
    .origin({x: xOrigin, y: yOrigin})
    .stroke('#CCCCCC')
    .edgeLength(edgeLength)
    .angle(angle)
    .dir('ver')
    .mapType(mapType);
  
  map(svg);

  svg.call(tip)
  
  legend = legends.ctsColour().colourScale(colourScale).scaleMin(scaleMin).scaleMax(scaleMax).nTicks(5).log(false).title('Women per 100 men');
  legend(legendSvg);
  hexmap.title(svg, 'Women per 100 men at birth (2005)')
}

/*********************************************************************************************************************************/
selections.povertyLine = function() {  
  // variables
  variable = 'povertyLinePercent';
  cols = ['#FFFFFF','#FFFF00','#FF8800','#FF0000','#880088','#000000'];

  scaleMin = 0
  scaleMax = 100
  
  colourScale = d3.scaleLinear()
  .domain(hexmap.interpolateSpace(scaleMin,scaleMax,cols.length, false))
  .range(cols);
  
  // tooltip
  tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "<div class='tip'><strong>Country:</strong> <span style='color:red'>" + d.Country + "</span></div><div class='tip'><strong>Percentage of population below poverty line: </strong><span style='color:green'>" + d[variable] + "</span></div>";
  })
  
  map = hexmap.map(data)
    .fill(function (country) {
    console.log(country[variable])
    if(country[variable] !== "NA"){
        return colourScale(country[variable]);
    } else {
      return '#CCCCCC'
    }
    })
    .origin({x: xOrigin, y: yOrigin})
    .stroke('#CCCCCC')
    .edgeLength(edgeLength)
    .angle(angle)
    .dir('ver')
    .mapType(mapType);
  
  map(svg);

  svg.call(tip)
  
  legend = legends.ctsColour().colourScale(colourScale).scaleMin(scaleMin).scaleMax(scaleMax).nTicks(5).log(false).title('Below poverty line');
  legend(legendSvg);
  hexmap.title(svg, 'Below Poverty Line (%)')
}

/*********************************************************************************************************************************/
selections.Birthrate = function() {
  variable = 'Birthrate'
  
  cols = ['#FF0000','#ffa500','#FFFF00','#00AA00','#0000FF'];
  
  scaleMin = Math.min.apply(Math, data.map(function(o){if(o[variable] !== null & o[variable] > 0){return o[variable];} else {return 100}}));
  scaleMax = Math.max.apply(Math, data.map(function(o){if(o[variable] !== null){return o[variable];} else {return 1}}));
  
  colourScale = d3.scaleLinear()
  .domain(hexmap.interpolateSpace(scaleMin,scaleMax,cols.length, false))
  .range(cols);
  
  tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<div class='tip'><strong>Country:</strong> <span style='color:red'>" + d.Country + "</span></div><div class='tip'><strong>Birth rate: </strong><span style='color:green'>" + d3.format('.3s')(d[variable]) + "</span></div>";
  })
  
  svg.call(tip)
  
  sinEdgeLength = Math.sin(angle) * edgeLength;
  cosEdgeLength = Math.cos(angle) * edgeLength;
  
  map = hexmap.map(data)
    .fill(function (country) {
        return colourScale(country[variable]);
      })
    .origin({x: xOrigin, y: yOrigin})
    .stroke('#CCCCCC')
    .edgeLength(edgeLength)
    .angle(angle)
    .dir('ver')
    .addTip(true)
    .mapType(mapType);
  
  tiles = map(svg);

  legend = legends.ctsColour().colourScale(colourScale).scaleMin(scaleMin).scaleMax(scaleMax).log(false).title('Per 1000 people');
  legend(legendSvg);
  
  hexmap.title(svg, 'Birth rate (per 1000 people)')
}

selections.DeathRate = function() {
  variable = 'Deathrate'
  
  cols = ['#00AA00','#FFFF00','#ffa500','#FF0000'];
  
  scaleMin = Math.min.apply(Math, data.map(function(o){if(o[variable] !== null & o[variable] > 0){return o[variable];} else {return 100}}));
  scaleMax = Math.max.apply(Math, data.map(function(o){if(o[variable] !== null){return o[variable];} else {return 1}}));
  
  colourScale = d3.scaleLinear()
  .domain(hexmap.interpolateSpace(scaleMin,scaleMax,cols.length, false))
  .range(cols);
  
  tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<div class='tip'><strong>Country:</strong> <span style='color:red'>" + d.Country + "</span></div><div class='tip'><strong>Death rate: </strong><span style='color:green'>" + d3.format('.3s')(d[variable]) + "</span></div>";
  })
  
  svg.call(tip)
  
  sinEdgeLength = Math.sin(angle) * edgeLength;
  cosEdgeLength = Math.cos(angle) * edgeLength;
  
  map = hexmap.map(data)
    .fill(function (country) {
        return colourScale(country[variable]);
      })
    .origin({x: xOrigin, y: yOrigin})
    .stroke('#CCCCCC')
    .edgeLength(edgeLength)
    .angle(angle)
    .dir('ver')
    .addTip(true)
    .mapType(mapType);
  
  tiles = map(svg);

  legend = legends.ctsColour().colourScale(colourScale).scaleMin(scaleMin).scaleMax(scaleMax).log(false).title('Per 1000 people');
  legend(legendSvg);
  
  hexmap.title(svg, 'Death rate (per 1000 people)')
}

/*********************************************************************************************************************************/
selections.LifeExpectancy = function() {
  variable = 'LifeExpectancy'
  
  cols = ['#FF0000','#ffa500','#FFFF00','#00AA00'];
  
  scaleMin = Math.min.apply(Math, data.map(function(o){if(o[variable] !== null & o[variable] > 0){return o[variable];} else {return 90}}));
  scaleMax = Math.max.apply(Math, data.map(function(o){if(o[variable] !== null){return o[variable];} else {return 1}}));
  
  console.log(scaleMin)
  console.log(scaleMax)
  colourScale = d3.scaleLinear()
  .domain(hexmap.interpolateSpace(scaleMin,scaleMax,cols.length, false))
  .range(cols);
  
  tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<div class='tip'><strong>Country:</strong> <span style='color:red'>" + d.Country + "</span></div><div class='tip'><strong>Life expectancy: </strong><span style='color:green'>" + d3.format('.3s')(d[variable]) + "</span></div>";
  })
  
  svg.call(tip)
  
  sinEdgeLength = Math.sin(angle) * edgeLength;
  cosEdgeLength = Math.cos(angle) * edgeLength;
  
  map = hexmap.map(data)
    .fill(function (country) {
        return colourScale(country[variable]);
      })
    .origin({x: xOrigin, y: yOrigin})
    .stroke('#CCCCCC')
    .edgeLength(edgeLength)
    .angle(angle)
    .dir('ver')
    .addTip(true)
    .mapType(mapType);
  
  tiles = map(svg);

  legend = legends.ctsColour().colourScale(colourScale).scaleMin(scaleMin).scaleMax(scaleMax).log(false).title('Years');
  legend(legendSvg);
  
  hexmap.title(svg, 'Life Expectancy')
}

/*********************************************************************************************************************************/
function changeMap(svgID){
  console.log(mapType)
  ranges = meta[mapType]
  
  xmin = ranges.xmin, xmax = ranges.xmax;
  ymin = ranges.ymin, ymax = ranges.ymax;
  sine = Math.sqrt(3)
  xrng = (xmax - xmin)
  yrng = (ymax - ymin) * sine
  
  edgeLength = (width - 200) / xrng
  height = (yrng * edgeLength) + 20 
  
  console.log('edgeLength: ' + edgeLength)
  
  xOrigin = (- xmin * edgeLength + 20)
  yOrigin = (ymax * edgeLength * sine + 20)
  
  console.log("xOrigin,yOrigin: " + xOrigin + ',' + yOrigin)
  
  d3.select(svgID).selectAll('*').remove()
  svg = d3.select(svgID).append('svg')
    .attr('width', width)
    .attr('height', height);
  
  console.log('width, height: ' + width + ',' + height)
  
  legendSvg = svg.append('g')
    .attr('id','legend')
    .attr("transform", "translate(" + (xrng*edgeLength + 20) + "," + (height/3) + ")")
  
  selections[dataType]();

}


/*********************************************************************************************************************************/
function UNHidden(){
  if(unStatus === 'true') {
  d3.selectAll('.parent')
    .classed('hidden', function(d){ return d.UN != 'TRUE'})
  } else {
   d3.selectAll('.parent')
    .classed('hidden', false)
  }
}


/*********************************************************************************************************************************/
/* Data from hexData/WorldHexData_multi.js */
meta = hexData.meta
data = hexData.data
changeMap(svgID)

/*********************************************************************************************************************************/
// get the dropdowns working
// selections
d3.select('#demoSelection')
  .on('change', function(){
  console.log('change')
  dataType = this.value
  selections[dataType]();
})

d3.select('#mapSelection')
  .on('change', function(){
  mapType = this.value;
  changeMap(svgID);
  UNHidden();
})

d3.select('#unOnly')
  .on('change', function(){
  unStatus = this.value
  console.log(unStatus)
  UNHidden()
})

/* End */
/*********************************************************************************************************************************/