
var width = 750,
    height = 500;

var fill = d3.scale.category20();

d3.tsv("stats.tsv", function (data) {
    // read stats, 
    // filter for records with G> 0, 
    // map to new records with text and size - as required by d3 word cloud
    // sort descending with top names / size=Goals
    // slice to keep the first/top 100 names
    var leaders = data
        .filter(function (d) { return +d.G > 0; })
        .map(function (d) { return { text: d.Name, size: +d.G }; })
        .sort(function (a, b) { return d3.descending(a.size, b.size); })
        .slice(0, 100);

    // script below from https://github.com/jasondavies/d3-cloud/blob/v1.0.5/examples/simple.html
    d3.layout.cloud().size([width, height])
        .words(leaders)
        .padding(5)
        .rotate(function () { return ~~(Math.random() * 2) * 90; })
        .font("Impact")
        .fontSize(function (d) { return d.size; })
        .on("end", draw)
        .start();

})

function draw(words) {
    d3.select("#word-cloud").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")")
        .selectAll("text")
        .data(words)
        .enter().append("text")
        .style("font-size", function (d) { return d.size + "px"; })
        .style("font-family", "Impact")
        .style("fill", function (d, i) { return fill(i); })
        .attr("text-anchor", "middle")
        .attr("transform", function (d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function (d) { return d.text; });
}