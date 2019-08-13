localStorage.clear();
var leftColumn = $('#left');
$('#standings').on('click', function () {
    leftColumn.empty();
    leftColumn.html('<h5>select team to view its roster</h5><h3 class="leagues">American League</h3><div id ="standings-tables"><div class="row"><div class="col"><h5>West</h5><div id="standings"><table class="table"><thead><tr><th scope="col">Team</th><th scope="col">Wins</th><th scope="col">Losses</th></tr></thead><tbody id="teams-table-american-west"><tr><td class="standings-teamname"></td><td class="standings-wins"></td><td class="standings-losses"></td></tr></tbody></table></div></div><div class="col"><h5>Central</h5><div id="standings"><table class="table"><thead><tr><th scope="col">Team</th><th scope="col">Wins</th><th scope="col">Losses</th></tr></thead><tbody id="teams-table-american-central"><tr><td class="standings-teamname"></td><td class="standings-wins"></td><td class="standings-losses"></td></tr></tbody></table></div></div><div class="col"><h5>East</h5><div id="standings"><table class="table"><thead><tr><th scope="col">Team</th><th scope="col">Wins</th><th scope="col">Losses</th></tr></thead><tbody id="teams-table-american-east"><tr><td class="standings-teamname"></td><td class="standings-wins"></td><td class="standings-losses"></td></tr></tbody></table></div></div></div></div ><br><br><h3 class="leagues">National League</h3><div id="standings-tables"><div class="row"><div class="col"><h5>West</h5><div id="standings"><table class="table"><thead><tr><th scope="col">Team</th><th scope="col">Wins</th><th scope="col">Losses</th></tr></thead><tbody id="teams-table-national-west"><tr><td class="standings-teamname"></td><td class="standings-wins"></td><td class="standings-losses"></td></tr></tbody></table></div></div><div class="col"><h5>Central</h5><div id="standings"><table class="table"><thead><tr><th scope="col">Team</th><th scope="col">Wins</th><th scope="col">Losses</th></tr></thead><tbody id="teams-table-national-central"><tr><td class="standings-teamname"></td><td class="standings-wins"></td><td class="standings-losses"></td></tr></tbody></table></div></div><div class="col"><h5>East</h5><div id="standings"><table class="table"><thead><tr><th scope="col">Team</th><th scope="col">Wins</th><th scope="col">Losses</th></tr></thead><tbody id="teams-table-national-east"><tr><td class="standings-teamname"></td><td class="standings-wins"></td><td class="standings-losses"></td></tr></tbody></table></div></div></div></div></div>')
    $.ajax({
        type: 'GET',
        url: 'https://api.mysportsfeeds.com/v2.1/pull/mlb/2019-regular/standings.json',
        dataType: 'json',
        async: false,
        headers: {
            "Authorization": "Basic " + btoa('a47e33a8-4f21-4fa7-b154-d31100' + ":" + 'MYSPORTSFEEDS')
        },
        success: function (response) {
            console.log(response)
            for (var i = 0; i < response.teams.length; i++) {
                var c = response.teams[i].team.city
                var t = response.teams[i].team.name
                var w = response.teams[i].stats.standings.wins
                var l = response.teams[i].stats.standings.losses
                standings_rows(c, t, w, l)
                var division;
                function standings_rows(city, teamName, wins, losses) {
                    if (response.teams[i].conferenceRank.conferenceName === "American League") {
                        if (response.teams[i].divisionRank.divisionName === "West") {
                            division = $("#teams-table-american-west")
                        }
                        else if (response.teams[i].divisionRank.divisionName === "Central") {
                            division = $("#teams-table-american-central")
                        }
                        else if (response.teams[i].divisionRank.divisionName === "East") {
                            division = $("#teams-table-american-east")
                        }
                    }
    
                    else if (response.teams[i].conferenceRank.conferenceName === "National League") {
                        if (response.teams[i].divisionRank.divisionName === "West") {
                            division = $("#teams-table-national-west")
                        }
                        else if (response.teams[i].divisionRank.divisionName === "Central") {
                            division = $("#teams-table-national-central")
                        }
                        else if (response.teams[i].divisionRank.divisionName === "East") {
                            division = $("#teams-table-national-east")
                        }
                    }
                    var table_row = $("<tr>")
                    var tableData_teamName = $("<td>")
                    tableData_teamName.addClass("standings-teamname")
                    tableData_teamName.html(`<a href="playercards.html" id="${response.teams[i].team.abbreviation.toLowerCase()}">${city} ${teamName}</a>`)
                    var tableData_teamWins = $("<td>")
                    tableData_teamWins.addClass("standings-wins")
                    tableData_teamWins.text(`${wins}`)
                    var tableData_teamLosses = $("<td>")
                    tableData_teamLosses.addClass("standings-losses")
                    tableData_teamLosses.text(`${losses}`)
                    table_row.append(tableData_teamName, tableData_teamWins, tableData_teamLosses)
                    division.append(table_row)
                }
            }
            $("a").on("click", function (event) {
                // event.preventDefault()
                // console.log(this.children("a").attr("id"))
                console.log(this.id)
                $('#left').hide();
                localStorage.setItem('abbr', this.id)
    
            })
    
    
        }
    });
    
})

$('#scores').on('click', function() {
  leftColumn.empty();
  leftColumn.html(
    '<div class=container><div class=row><div class=col-12><h1 id=score-title>Scores</h1><br><div class=card><div class=card-body></div></div></div></div></div>'
  );
  // Making sure the moment js link works
  var m = moment();
  console.log(m);
  console.log(moment().format('YYYYMMDD'));

  /* ---------------------------------- */
  // Formatting the datepicker
  /*
function formatter(datePicker) {
var formattedDate = datePicker.format("YYYYMMDD");
return formattedDate;
}
*/
  // console.log(Date.now());

  /* ---------------------------------- */

  var date = moment().format('YYYYMMDD');
  var queryURL =
    'https://api.mysportsfeeds.com/v2.1/pull/mlb/2019-regular/date/' +
    date +
    '/games.json';

  $.ajax({
    type: 'GET',
    url: queryURL,
    dataType: 'json',
    async: false,
    headers: {
      Authorization:
        'Basic ' +
        btoa('a47e33a8-4f21-4fa7-b154-d31100' + ':' + 'MYSPORTSFEEDS')
    },
    success: function(response) {
      console.log(response);
      var results = response.games;

      for (var i = 0; i < results.length; i++) {
        var gameData = results[i];

        var awayTeamName = gameData.schedule.awayTeam.abbreviation;
        console.log(awayTeamName);
          var awayErrors;
          awayErrors = gameData.score.awayErrorsTotal;
          if (awayErrors == null) {
              awayErrors = 'Game Not Started';
            }
        
        console.log(awayErrors);
        var awayHits = gameData.score.awayHitsTotal;
        console.log(awayHits);
        var awayScore = gameData.score.awayScoreTotal;
        console.log(awayScore);

        var homeTeamName = gameData.schedule.homeTeam.abbreviation;
        console.log(homeTeamName);
        var homeErrors = gameData.score.homeErrorsTotal;
        console.log(homeErrors);
        var homeHits = gameData.score.homeHitsTotal;
        console.log(homeHits);
        var homeScore = gameData.score.homeScoreTotal;
        console.log(homeScore);

        var scoreTable = $('<table>');
        scoreTable.addClass('table score-table col');

        var scoreTHead = $('<thead>');
        var scoreHeaderRow = $('<tr>');

        var scoreHeader1 = $('<th>');
        scoreHeader1.attr('scope', 'col');
        scoreHeader1.attr('class', 'col-sm');
        var scoreHeader2 = $('<th>');
        scoreHeader2.attr('scope', 'col');
        scoreHeader2.text('R');
        var scoreHeader3 = $('<th>');
        scoreHeader3.attr('scope', 'col');
        scoreHeader3.text('H');
        var scoreHeader4 = $('<th>');
        scoreHeader4.attr('scope', 'col');
        scoreHeader4.text('E');

        var scoreTBody = $('<tbody>');
        scoreTBody.addClass('table-borderless');
        var scoreHeaderRow2 = $('<tr>');

        var scoreHeaderAway = $('<th>');
        scoreHeaderAway.attr('scope', 'row');
        scoreHeaderAway.text(awayTeamName);
        var scoreDAwayRuns = $('<td>');
        scoreDAwayRuns.text(awayScore);
        var scoreDAwayHits = $('<td>');
        scoreDAwayHits.text(awayHits);
        var scoreDAwayErrors = $('<td>');
        scoreDAwayErrors.text(awayErrors);

        var scoreHeaderRow3 = $('<tr>');

        var scoreHeaderHome = $('<th>');
        scoreHeaderHome.attr('scope', 'row');
        scoreHeaderHome.text(homeTeamName);
        var scoreDHomeRuns = $('<td>');
        scoreDHomeRuns.text(homeScore);
        var scoreDHomeHits = $('<td>');
        scoreDHomeHits.text(homeHits);
        var scoreDHomeErrors = $('<td>');
        scoreDHomeErrors.text(homeErrors);

        scoreHeaderRow2.append(
          scoreHeaderAway,
          scoreDAwayRuns,
          scoreDAwayHits,
          scoreDAwayErrors
        );
        scoreHeaderRow3.append(
          scoreHeaderHome,
          scoreDHomeRuns,
          scoreDHomeHits,
          scoreDHomeErrors
        );
        scoreTBody.append(scoreHeaderRow2, scoreHeaderRow3);

        scoreHeaderRow.append(
          scoreHeader1,
          scoreHeader2,
          scoreHeader3,
          scoreHeader4
        );
        scoreTHead.append(scoreHeaderRow);
        scoreTable.append(scoreTHead, scoreTBody);

        $('.card-body').append(scoreTable);
      }
    }
  });
});
// console.log($('#le,ft').html());
// leftColumn.html($('#left').html())


// function clicker(abbr) {
//   $(`#${abbr}`).on('click', function () { 

//   }
//   )

// }
$("#lookUpCity").on("click", function () {
  var conceptName = $('.custom-select')
    .find(':selected')
    .attr('value');
  console.log(conceptName)
  //   $(".custom-select").on("click", function() {
  //       // In this case, the "this" keyword refers to the button that was clicked
  //       var homeTeam = $(this).attr("value");
  // console.log(this);
  var queryURL = `https://api.openweathermap.org/data/2.5/weather?id=${conceptName}&units=imperial&appid=6b1d1c3cef2c4bef15ddaaf8e3ceea4f`;
  $.ajax({
    type: 'GET',
    url: queryURL,
    dataType: 'json',
    async: false,
    success: function (response) {
      console.log(response)
    }
  })

    .then(function (response) {

      // Log the queryURL
      console.log(queryURL);

      // Log the resulting object
      console.log(response);

      // Transfer content to HTML
      $(".city").html("<h2>" + response.name + " Weather Details</h2>");
      $(".wind").text("Wind Speed: " + response.wind.speed);
      $(".humidity").text("Humidity: " + response.main.humidity);
      $(".temp").text("Temperature (F) " + response.main.temp);

      // Log the data in the console as well
      console.log("Wind Speed: " + response.wind.speed);
      console.log("Humidity: " + response.main.humidity);
      console.log("Temperature (F): " + response.main.temp);
    });
})

var config = {
  apiKey: "AIzaSyBfaMZmhoLBz_yJZRgIyfi9WF14cSfwOJM",
  authDomain: "baseball-facts-963d3.firebaseapp.com",
  databaseURL: "https://baseball-facts-963d3.firebaseio.com",
  projectId: "baseball-facts-963d3",
  storageBucket: "",
  messagingSenderId: "1010342222529",
  appId: "1:1010342222529:web:3f7434ee286fd292"
};
firebase.initializeApp(config);
var database = firebase.database();
var facts = {}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
console.log("asdf")
document.getElementById("randomFact").addEventListener("click", function () {
  $("#factsDisplay").text(facts.Fun_Baseball_Facts[getRandomInt(facts.Fun_Baseball_Facts.length)].fact)
})
database.ref().on(
  "value",
  function (snapshot) {
    facts = snapshot.val()
  },
  function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });