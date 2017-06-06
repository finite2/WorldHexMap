// hexmap generates a hexmap from a dataset.
// This version requires nested data to allow multiple hexes per object.
if (typeof hexmap === 'undefined') {
  var hexmap = {};
}


hexmap.interpolateSpace = function(start, end, n, log) {
  var out = [], delta, i = 0;
  log = log == null ? false: log;
  if (log) {
    delta = (Math.log(end) - Math.log(start)) / (n - 1);
    while(i < (n - 1)) {
        out.push(Math.exp(Math.log(start) + (i * delta)));
        i++;
    }
    out.push(end);
    return out;
  } else {
  delta = (end - start) / (n - 1);
  while(i < (n - 1)) {
      out.push(start + (i * delta));
      i++;
  }
  out.push(end);
  return out;
  }
}

d3.selection.prototype.moveToFront = function() {  
      return this.each(function(){
        this.parentNode.appendChild(this);
      });
    };

d3.selection.prototype.moveToBack = function() {  
        return this.each(function() { 
            var firstChild = this.parentNode.firstChild; 
            if (firstChild) { 
                this.parentNode.insertBefore(this, firstChild); 
            } 
        });
    };

hexmap.symbol = function(key){
  var origin = {x: 0, y: 0};

  key
    .append('use')
    .attr('xlink:href', '#symbol')
    .attr('x', 0)
    .attr('y', function(d,i){ return i*Math.sqrt(3)*2*edgeLength})
    .attr('class', 'set1')
    .attr('fill', '#cccccc')
    .attr('filter', 'url(#dilate)')

  key
    .append('use')
    .attr('xlink:href', '#symbol')
    .attr('x', 0)
    .attr('y', function(d,i){ return i*Math.sqrt(3)*2*edgeLength})
    .attr('fill', function(d) {return colourScale(d.col)})
    .attr('stroke', function(d) {return colourScale(d.col)})
    .attr('filter', 'url(#erode)')
  
  key.append('text')
    .attr('x', 25)
    .attr('y', function(d,i){return i*Math.sqrt(3)*2*edgeLength + 5})
    .text(function(d){return d.text})
}


hexmap.closedPath = function(point, points) {
  var tmp = [];
  tmp.push('M' + point[0] + ' ' + point[1]);
  for (var i = 0; point = points[i]; i++) {
    tmp.push('L' + point[0] + ' ' + point[1]);
  }
  tmp.push('z');
  return tmp.join('');
}

hexmap.hexPath = function(data, origin, edgeLength, angle) {
  
  var sinEdgeLength = Math.sin(angle) * edgeLength;
  var cosEdgeLength = Math.cos(angle) * edgeLength;
  angle = angle * Math.PI / 180;
  
  if(dir == 'hor'){
    var x = origin.x + (data.x * (edgeLength + cosEdgeLength)), y = origin.y - (data.y * sinEdgeLength);
    var x1 = x + edgeLength, y1 = y + sinEdgeLength, y2 = y1 + sinEdgeLength;
    return hexmap.closedPath([x, y], [[x1, y], [x1 + cosEdgeLength, y1], [x1, y2], [x, y2], [x - cosEdgeLength, y1]]);
  } else {
    var x = origin.x + edgeLength*data.x, y = origin.y - Math.sqrt(3)*edgeLength*data.y;
    var x1 = edgeLength, y1 = edgeLength/Math.sqrt(3);
    return hexmap.closedPath([x, y + 2*y1], [[x + x1, y + y1], [x + x1, y - y1], [x, y - 2*y1], [x - x1, y - y1], [x - x1, y + y1]]);
  }
}


hexmap.title = function(svg, title){
  svg.select('#title').remove()
  
  svg.append('g')
    .attr('id', 'title')
  .append('text')
    .attr('x',svg.attr('width') / 2)
    .attr('y',40)
    .attr('text-anchor','middle')
    .style('font-size','2em')
    .html(title)
}


hexmap.map = function (data) {
  var edgeLength = 5,
      stroke = '#cccccc',
      fill = 'none',
      origin = undefined,
      angle = 60,
      dir = 'ver',
      addTip = true,
      mapType = 'hexes_one';


  function chart(svg) {
    console.log('edgeLength:ww ' + edgeLength)
    console.log(origin)
    angle = angle * Math.PI / 180;

    if (typeof origin === 'undefined') {
      origin = {x: (4 * edgeLength) + Math.ceil(5 * cosEdgeLength), y: svg.attr('height') - Math.ceil(2 * sinEdgeLength)};
    }
  
    if(svg.select('#hexagons').empty()){
      svg.append('g')
        .attr('id','hexagons')
    }
    
    // add definitions to the page if required
    if(svg.select('defs').empty()){
      var defs = svg.append('defs')

      defs.append('filter')
        .attr('id','erode')
        .html('<feMorphology operator="erode" radius="0.75" />')

      defs.append('filter')
        .attr('id','dilate')
        .html('<feMorphology operator="dilate" radius="1" />')
      

      path = ['M',0, 2, 'l', 1.73205, -1, 'l', 0, -2, 'l', -1.73205, -1, 'l', -1.73205, 1, 'l', 0, 2, 'l', 1.73205, 1, 'Z']
      path = path.map(function(o){
        if(isFinite(o)){
          return (edgeLength) * o / 2
        } else {
          return o
        }
      })
      
      defs.append('path')
        .attr('id', 'symbol')
        .attr('class', 'scale')
        .attr('d', path.join(' '))
    }
  
    var tiles = svg.select('#hexagons')
      .selectAll('g.parent').data(data)
      
    console.log(tiles)
    
    var tilesEnter = tiles.enter()
      .append('g')
      .attr('id', function(d,i){return 'c' + i})
      .attr("class", "parent")
      .merge(tiles)
        .on('mouseover', function(d,i){
          d3.selectAll('#c' + i + ' .inner').attr('stroke', 'black')
          d3.selectAll('#c' + i + ' .outer')
            .attr('stroke', 'black')
            .attr('fill', 'black')
          tip.show(d)
        })
        .on('mouseleave',  function(d,i){
          d3.selectAll('#c' + i + ' .inner').attr('stroke', fill)
          d3.selectAll('#c' + i + ' .outer').attr('stroke', stroke)
          tip.hide(d)
        })
      

    subTiles = tilesEnter.append('g')
      .attr('id', function(d,i){ return 'h' + i})
      .selectAll('use').data(function(d) {return d[mapType]})
    
    subTiles.enter()
      .append('use')
        .attr('class','hex')
        .attr('xlink:href', '#symbol')
        .attr('x', function(d, i){/*console.log(i)*/; return origin.x + edgeLength*d.x})
        .attr('y', function(d){ return origin.y - edgeLength*d.y*Math.sqrt(3)})
        .merge(subTiles)
          .attr('x', function(d, i){/*console.log(i)*/; return origin.x + edgeLength*d.x})
          .attr('y', function(d){ return origin.y - edgeLength*d.y*Math.sqrt(3)})



    tilesEnter
      .append('use')
      .attr('xlink:href', function(d,i){/*console.log(i)*/; return '#h' + i})
      .attr('class', 'outer')
      .attr('fill', stroke)
      .attr('stroke', stroke)
      .attr('filter', 'url(#dilate)')
      
    
    tilesEnter
      .append('use')
      .attr('xlink:href', function(d,i){return '#h' + i})
      .attr('class', 'inner')
      .attr('filter', 'url(#erode)')
      .attr('stroke', fill)
      .attr('fill', fill)
      
      
      tiles.merge(tiles)
        .select('.inner')
          .transition().duration(1000)
          .attr('stroke', fill)
          .attr('fill', fill)
      


      

    tiles.exit().remove()
    return tiles;
  }

  chart.edgeLength = function (_) {
    if (!arguments.length) return edgeLength;
    edgeLength = _;
    return chart;
  };

  chart.origin = function (_) {
    if (!arguments.length) return origin;
    origin = _;
    return chart;
  };

  chart.stroke = function (_) {
    if (!arguments.length) return stroke;
    stroke = _;
    return chart;
  };

  chart.fill = function (_) {
    fill = function (d) { return _(d); };
    return chart;
  };
  chart.dir = function(_) {
    if (!arguments.length) return dir;
    dir = _;
    return chart;
  };
  chart.angle = function(_) {
    if (!arguments.length) return angle;
    angle = _;
    return chart;
  };
  chart.addTip = function(_) {
    if (!arguments.length) return addTip;
    addTip = _;
    return chart;
  };
  chart.mapType = function(_) {
    if (!arguments.length) return mapType;
    mapType = _;
    return chart;
  };
  return chart;
}





