/* Creating a table
 *
 * This script shall create a table from a tab-separated value text document.
 */
var positions = { G: "Goalkeeper", D: "Defender", M: "Midfielder", F: "Forward" };
var columns = ["No", "Name", "Team", "Pos"];

/* Store the data in an array. Starts off empty.
 * This is usually NOT global, but making global here for demonstration purposes.
 */
var data = [];
var teams = [];

/* Select the DIV in the document with the ID of "roster".
 * Append a <table class="table"></table> to the selected DIV.
 * The "table" class is a beautification measure via Bootstrap's CSS.
 * The resulting table element is stored in the variable "table."
 */
var table = d3.select('#roster')
    .append('table')
    .classed('table', true);

/* Append <thead><tr></tr></thead> to the above table.
 * The inner tr element is stored in the "thead" variable.
 */
var thead = table.append('thead').append('tr');

/* Append <tbody></tbody> to the table and store it in the "tbody" variable. */
var tbody = table.append('tbody');

// added a team selector
var teamSelector = d3.select('#page-title')
    .append('select')
    .attr('id', 'team-selector');

/* Function to reload the data from the data file.
 * Call the redraw() function after the data is loaded to drive the drawing of the data.
 * We'll be filling this in during the lesson.
 */
var reload = () => {
    d3.tsv('eng2-rosters.tsv', rows => {
        data = rows;
        data.forEach(d => {
            d.Pos = positions[d.Pos];
            if (teams.indexOf(d.TeamID) < 0) {
                teams.push(d.TeamID);
                teams[d.TeamID] = d.Team;
            }
        });

        teamSelector.selectAll("option")
            .data(teams)
            .enter()
            .append("option")
            .attr("value", d => { return d; })
            .text(d => { return teams[d]; })
            .sort((a,b) => { return d3.ascending(a,b); });
            
        redraw();
    });
};

/* Function to redraw the table.
 * It's good practice to keep the data input and drawing functions separate.
 * We'll be filling this in during the lesson.
 */
var redraw = () => {
    thead.selectAll("th")
        .data(columns)
        .enter()
        .append("th")
        .text(d => { return d; })

    var rows = tbody.selectAll("tr")
        .data(data);

    rows.enter().append("tr");
    rows.exit().remove();

    var cells = rows.selectAll("td")
        .data(row => {
            var values = [];
            columns.forEach(d => { values.push(row[d]); });
            return values;
        })

    cells.enter().append("td");
    cells.text(d => { return d; })
};

/* Call reload() once the page and script have loaded to get the controller script started. */
reload();

