
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
  d3.csv('afcw-results.csv', function(rows) {
      redraw(rows);
  })
};

/* Our standard graph drawing function */
var redraw = function(data) {
  // Fill in here
};

reload();

