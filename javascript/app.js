var createGamePlayer = function() {
	var playerContainer = $('<div>').addClass('player');

	var playerImg = $('<img>').attr('src', 'images/card_back.png');

	var playerName = $('<p>').html()

	playerContainer.append(playerImg, playerName);

	$('.players').append(playerContainer);
	
	return playerContainer;
}

var createAllPlayers = function(number) {
	for (i = 0; i < number; i++) {
		createGamePlayer();
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
		var numberOfPlayers = window.prompt("How many players would you like?");
		createAllPlayers(numberOfPlayers);
		GAME_START = new Game(numberOfPlayers);
		createUserHand(5);
	})
}
startGameButton();









