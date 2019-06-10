
/* Constants for our drawing area */
var width = 750,
    height = 500,
    margin = { top: 20, right: 20, bottom: 20, left: 70 };

/* The drawing area */
var svg = d3.select("#standings-chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

/* Our standard data reloading function */
var reload = function () {
    // Read in json file
    d3.json('eng2-2013-14.json', function (results) {
        // and merge the results into single array with all records including the date for each
        data = d3.merge(
            results.map(function (d) {
                d.Games.forEach(function (g) { g.Date = d.Date });
                return d.Games;
            })
        );
        // and build datasets of games/matches/projects for each team
        var dataMap = d3.map();
        d3.merge([
            d3.nest().key( d => { return d.Away; }).entries(data),
            d3.nest().key( d => { return d.Home; }).entries(data)
        ]).forEach( d => {
            if (dataMap.has(d.key)) {
                dataMap.set(d.key, d3.merge([dataMap.get(d.key), d.values]))
                    .sort(function(a,b) { return d3.ascending(a.Date, b.Date); });
            } else {
                dataMap.set(d.key, d.values);
            }
        });

        // calculated progresive league points after each game
        dataMap.forEach( (key, values) => {
            var games = [];
            values.forEach( (g, i) => {
                games.push(gameOutcome(key, g, games));
            });
            dataMap.set(key, games);    // Replace old games with outcomes
        });

        // console.log(dataMap);
        redraw(dataMap);
    });
};

/* Our standard graph drawing function */
var redraw = function (data) {
    // Fill in here
};

// calculate leaguePoints
function gameOutcome(team, game, games) {
    var isAway = (game.Away === team);
    var goals = isAway ? +game.AwayScore : +game.HomeScore;
    var allowed = isAway ? +game.HomeScore : +game.AwayScore;
    var decision = (goals > allowed) ? 'win' : (goals < allowed) ? 'loss' : 'draw';
    var points = (goals > allowed) ? 3 : (goals < allowed) ? 0 : 1;
    return {
        date: game.Date,
        team: team,
        align: isAway ? 'away' : 'home',
        opponent: isAway ? game.Home : game.Away,
        goals: goals,
        allowed: allowed,
        venue: game.Venue,
        decision: decision,
        points: points,
        leaguePoints: d3.sum(games, d => { return d.points }) + points
    }; 
}

reload();

