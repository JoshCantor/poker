// window.onload = function() {
// 	var pokerTable = $('<img>').attr('src', 'images/pokerTable.png');
// 	$('.container-fluid').append(pokerTable);
// }

var createGamePlayer = function(i) {
	var playerContainer = $('<div>').addClass('col-md-1 player');

	var playerImg = $('<img>').attr('src', 'images/card_back.png');

	var playerName = $('<p>').html('Computer Player ' + (i + 1));

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
	var buttonContainer = $('<div>').addClass('col-md-6 buttonContainer')
	$('.buttons').append(buttonContainer);
	var startButton = $('<a>').addClass('btn btn-info startButton').html('Click to start!');
	$('.buttonContainer').append(startButton);
}
createStartButton();

var GAME_START;
var startGameButton = function() {
	$('.startButton').on('click', function() {
		$('.players, .user, .winningHand').remove();
		var players = $('<div>').addClass('row players');
		$('.container-fluid').append(players);
		var user = $('<div>').addClass('row user');
		$('.container-fluid').append(user);
		var winningHand = $('<div>').addClass('row winningHand');
		$('.container-fluid').append(winningHand);
		var numberOfPlayers = window.prompt('How many other players would you like?');
		var playerName = window.prompt('What\'s your name?');
		$('.user').append($('<div><p>' + playerName + '</p></div>').addClass('col-md-1'));
		createAllPlayers(numberOfPlayers);
		GAME_START = new Game(numberOfPlayers);
	})
}
$('document').ready(function() {
	startGameButton();
})
var createDiscardButton = function() {
	var discardButton = $('<a>').addClass('btn btn-warning discardButton').html('Click to discard selected cards');
	$('.buttonContainer').append(discardButton);
}
createDiscardButton();














