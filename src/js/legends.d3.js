if (typeof legends === 'undefined') {
  var legends = {};
}

// update the colour scale, restyle the plot points and legend
legends.ctsColour = function() {
  var legendWidth = 50;
  var legendHeight = 200;
  var log = true;
  var colourScale = d3.scaleLinear().domain([0,1]).range(['#FFFFFF','#000000'])
  var scaleMin = 0;
  var scaleMax = 1;
  var nTicks = 6;
  var title = "";

  function legend(legendSvg){
  // clear current legend
  legendSvg.selectAll('*').remove();
    

  // append gradient bar
  var gradient = legendSvg.append('defs')
      .append('linearGradient')
      .attr('id', 'gradient')
      .attr('x1', '0%') // bottom
      .attr('y1', '100%')
      .attr('x2', '0%') // to top
      .attr('y2', '0%')
      .attr('spreadMethod', 'pad');

  // programatically generate the gradient for the legend
  // this creates an array of [pct, colour] pairs as stop
  // values for legend
  var pct = hexmap.interpolateSpace(0, 100, 101, false).map(function(d) {return Math.round(d) + '%';});
  var colourPct = d3.zip(pct, hexmap.interpolateSpace(scaleMin,scaleMax, 101, log).map(function(d) {return colourScale(d)}));
    

  colourPct.forEach(function(d) {
      gradient.append('stop')
          .attr('offset', d[0])
          .attr('stop-color', d[1])
          .attr('stop-opacity', 1);
  });

  legendSvg.append('rect')
    .style('fill','url("#gradient")')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('width', legendWidth)
    .attr('height', legendHeight)
    .style('stroke', 'black')
      
      

  // create a scale and axis for the legend
  if(log){
  var legendScale = d3.scaleLog()
      .domain([scaleMin, scaleMax])
      .range([legendHeight, 0]);
  } else {
    var legendScale = d3.scaleLinear()
      .domain([scaleMin, scaleMax])
      .range([legendHeight, 0]);
  }

  var legendAxis = d3.axisRight()
      .scale(legendScale)
      .tickValues(hexmap.interpolateSpace(scaleMin, scaleMax, nTicks, log))
      .tickFormat(d3.format(".2s"));
  
  legendSvg.append("g")
      .attr("class", "legend axis")
      .attr("transform", "translate(" + (legendWidth) + "," + 0 + ")")
      .call(legendAxis);
  
  
  legendSvg.select('legendText').remove();
    
  legendSvg.append('g')
    .attr('id','legendText')
    .append('text')
    .attr('x',0)
    .attr('y',-20)
    .html(title)
    
  }
  
  
  legend.colourScale = function (_) {
    if (!arguments.length) return colourScale;
    colourScale = _;
    return legend;
  };
  
  legend.log = function (_) {
    if (!arguments.length) return log;
    log = _;
    return legend;
  };
  
  legend.scaleMin = function (_) {
    if (!arguments.length) return scaleMin;
    scaleMin = _;
    return legend;
  };
  
  legend.scaleMax = function (_) {
    if (!arguments.length) return scaleMax;
    scaleMax = _;
    return legend;
  };
  
  legend.legendWidth = function (_) {
    if (!arguments.length) return legendWidth;
    legendWidth = _;
    return legend;
  };
  
  legend.legendHeight = function (_) {
    if (!arguments.length) return legendHeight;
    legendHeight = _;
    return legend;
  };
  
  legend.nTicks = function (_) {
    if (!arguments.length) return nTicks;
    nTicks = _;
    return legend;
  };
  legend.title = function (_) {
    if (!arguments.length) return title;
    title = _;
    return legend;
  };
  
  return(legend)
  
}




// categories legend
legends.categories = function() {
  var colourScale = d3.scaleLinear().domain([0,1]).range(['#FFFFFF','#000000'])
  var legendData = [
    {col: 0, text: 'Zero'},
    {col: 1, text: 'One'}
  ]
  var symbol = function(key){
    key.append('rect')
      .attr('height', 10)
      .attr('width', 10)
      .attr('x', 0)
      .attr('y', function(d,i){return i*20})
      .attr('fill', function(d) {return colourScale(d.col)})
    
    key.append('text')
      .attr('x', 25)
      .attr('y', function(d,i){return i * 20  + 10})
      .text(function(d){return d.text})
  }
  
  function legend(legendSvg){
    
  // clear current legend
  legendSvg.selectAll('*').remove();
  
  legendSvg.append("g")
      .attr("class", "legend axis")

    
  var key = legendSvg.append("g")
    .attr('id','legend key')
      .selectAll('g').data(legendData)
      .enter().append('g')
        .attr('id',function(d,i){ return 'key' + i})

  symbol(key);
    
  legendSvg.select('legendText').remove();
    
  legendSvg.append('g')
    .attr('id','legendText')
    .append('text')
    .attr('x',0)
    .attr('y',-20)
    .html(title)
  
    
  }
  
  legend.colourScale = function (_) {
    if (!arguments.length) return colourScale;
    colourScale = _;
    return legend;
  };
  
  legend.legendData = function (_) {
    if (!arguments.length) return legendData;
    legendData = _;
    return legend;
  };
  
  legend.symbol = function (_) {
    if (!arguments.length) return symbol;
    symbol = _;
    return legend;
  };
  legend.title = function (_) {
    if (!arguments.length) return title;
    title = _;
    return legend;
  };
  
  return legend
}
  
