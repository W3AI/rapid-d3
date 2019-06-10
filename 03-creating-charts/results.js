
/* Constants for our drawing area */
var width = 750,
    height = 300,
    margin = {top: 20, right: 20, bottom: 20, left: 70};

/* The drawing area */
var svg = d3.select("#results")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
;

var x = d3.scale
    .ordinal()
    .rangeRoundBands([margin.left, width - margin.right], 0.1);
var y = d3.scale
    .linear()
    .range([height - margin.bottom, margin.top]);

/* Our standard data reloading function */
var reload = function() {
  d3.csv("afcw-results.csv", function(rows) {
      redraw(rows);
  })
};

/* Our standard graph drawing function */
var redraw = function(data) {
    x.domain(data.map(function (d,i) { return i; }));
    y.domain([0, d3.max(data, function (d) { return d.GoalsScored })]);

    var bars = svg.selectAll("rect.bar")
        .data(data);

    bars.enter()
        .append("rect")
        .classed("bar", true);

    bars
        .attr("x", function(d, i) { return x(i); })
        .attr("width", 5)
        .attr("y", function(d) { return y(d.GoalsScored); })
        .attr("height", function(d) { return y(0) - y(d.GoalsScored); });
};

reload();

