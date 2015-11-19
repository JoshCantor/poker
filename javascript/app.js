// window.onload = function() {
// 	var pokerTable = $('<img>').attr('src', 'images/pokerTable.png');
// 	$('.container-fluid').append(pokerTable);
// }

var createGamePlayer = function(i) {
	var playerContainer = $('<div>').addClass('col-md-2 player');

	var playerImg = $('<img>').attr('src', 'images/card_back.png');

	var playerName = $('<p>').html('Player ' + (i + 1));

	playerContainer.append(playerImg, playerName);

	if (i !== 0) {
		$('.players').append(playerContainer);
	}
	
	return playerContainer;
}

var createAllPlayers = function(number) {
	for (i = 0; i < number; i++) {
		createGamePlayer(i);
	}
}

var createStartButton = function() {
	var buttonContainer = $('<div>').addClass('col-md-3 buttonContainer')
	$('.buttons').append(buttonContainer);
	var startButton = $('<a>').addClass('btn btn-info startButton').html('Click to start!');
	$('.buttonContainer').append(startButton);
}
createStartButton();

var createUserCard = function(cardNumber) {
	var userCardContainer = $('<div>').addClass('col-md-2 ' + cardNumber);
	console.log(userCardContainer);
	$('.user').append(userCardContainer);
	var userCardImg = GAME_START.players[0].currentHand[cardNumber].image;
	$('.' + cardNumber).append(userCardImg);
}

var createUserHand = function(handSize) {
	for (var i = 0; i < handSize; i++) {
		createUserCard(i);
	}
}

var GAME_START;
var startGameButton = function() {
	$('.startButton').on('click', function() {
		var numberOfPlayers = window.prompt('How many players would you like?');
		var playerName = window.prompt('Type your name');
		$('.user').append($('<div><p>' + playerName + '</p></div>').addClass('col-md-1'));
		createAllPlayers(numberOfPlayers);
		GAME_START = new Game(numberOfPlayers);
		createUserHand(5);
	})
}
startGameButton();









