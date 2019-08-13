/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
// particlesJS.load('particles-js', 'particles.json', function() {
//   console.log('callback - particles.js config loaded');
// });
// var abbr = localStorage.getItem('abbr')
var abbr = localStorage.getItem('abbr');
$.ajax({
  type: 'GET',
  url: `https://api.mysportsfeeds.com/v2.1/pull/mlb/players.json?team=${abbr}&rosterstatus=assigned-to-roster`,
  dataType: 'json',
  async: false,
  headers: {
      "Authorization": "Basic " + btoa('a47e33a8-4f21-4fa7-b154-d31100' + ":" + 'MYSPORTSFEEDS')  },
  //data: '{ "comment" }',
  success: function (response) {

    console.log(response)

    for (var i = 0; i < response.players.length; i++){
      var firstName = response.players[i].player.firstName;
      var lastName = response.players[i].player.lastName;
      var picture = response.players[i].player.officialImageSrc;
      var jersey = response.players[i].player.jerseyNumber;
      var height = response.players[i].player.height;
      var weight = response.players[i].player.weight;
      var position = response.players[i].player.primaryPosition;
      cardCreator(firstName, lastName, picture, jersey, position,
        height, weight);
    }
    
  }
});
function cardCreator(firstName, lastName, picture, jersey, position,
  height, weight) {
  console.log('oiiiii')
  
  var playerCard = $('<div>');
  playerCard.addClass('playerCard');
  var playerCard_Name = $('<div>');
  playerCard_Name.addClass('playerCard-Name');
  playerCard_Name.append(`<h2>${firstName}</h2>`);
  playerCard_Name.append(`<h2>${lastName}</h2>`);
  var playerCard_Image = $('<div>');
  playerCard_Image.addClass('playerCard-Image');
  playerCard_Image.append(`<img src="${picture}">`);
  var playerCard_Information = $('<div>');
  playerCard_Information.append(`<h3># ${jersey}</h3>`, `<h3>Height: ${height}</h3>`, `<h3>Weight: ${weight}</h3>`, `<h3>Position: ${position}</h3>`);
  
  playerCard_Information.addClass('playerCard-Information')
  playerCard.append(playerCard_Name, playerCard_Image, playerCard_Information);
  $('.mainCardsContainer').append(playerCard);

}






  
