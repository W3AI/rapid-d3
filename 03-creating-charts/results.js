
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

/* Our standard data reloading function */
var reload = function() {
  d3.csv("afcw-results.csv", function(rows) {
      redraw(rows);
  })
};

/* Our standard graph drawing function */
var redraw = function(data) {
    var bars = svg.selectAll("rect.bar")
        .data(data);

    bars.enter()
        .append("rect")
        .classed("bar", true);

    bars
        .attr("x", function(d, i) { return i * 6; })
        .attr("width", 5)
        .attr("y", function(d) {
            return height - margin.bottom - (d.GoalsScored * 50);
        })
        .attr("height", function(d) { return d.GoalsScored * 50 });
};

reload();

