var createGamePlayer = function(i) {
	var playerContainer = $('<div>').addClass('col-md-1 player');
	var playerImg = $('<img>').attr('src', 'images/card_back.png');
	var playerName = $('<p>').html('Computer ' + (i));

	playerContainer.append(playerImg, playerName);

	if (i !== 0) {
		$('.players').append(playerContainer);
	}
	
	return playerContainer;
}

var createAllPlayers = function(number) {
	for (var i = 0; i < number; i++) {
		createGamePlayer(i);
	}
}

var createStartButton = function() {
	var buttonContainer = $('<div>').addClass('col-md-6 buttonContainer')
	$('.buttons').append(buttonContainer);
	
	var startButton = $('<a>').addClass('btn btn-info startButton').html('CLICK TO START A NEW GAME');
	$('.buttonContainer').append(startButton);
}
createStartButton();

var GAME_START;
var startGameButton = function() {
	$('.startButton').on('click', function() {
		//clear poker table
		$('.players, .user, .winningHand').remove();
		
		//add div for new computer players
		var players = $('<div>').addClass('row players');
		$('.container-fluid').append(players);
		$('.players').append($('<div>').addClass('col-md-offset-2 col-md-1'));
		
		//add div for user
		var user = $('<div>').addClass('row user');
		$('.container-fluid').append(user);
		

		var numberOfComputerPlayers = window.prompt('HOW MANY COMPUTER PLAYERS WOULD YOU LIKE?');
		var totalNumberOfPlayers = Number(numberOfComputerPlayers) + 1;
		var playerName = window.prompt('WHAT\'S YOUR NAME?');
		
		$('.user').append($('<div><p>' + playerName + '</p></div>').addClass('col-md-offset-2 col-md-1'));
		createAllPlayers(totalNumberOfPlayers);
		
		//instantiate new game
		GAME_START = new Game(totalNumberOfPlayers);
		
		//create div for winning hand
		var winningHand = $('<div>').addClass('row winningHand');
		$('.container-fluid').append(winningHand);
	})
}

$('document').ready(function() {
	startGameButton();
})

var createDiscardButton = function() {
	var discardButton = $('<a>').addClass('btn btn-warning discardButton').html('DISCARD');
	$('.buttonContainer').append(discardButton);
}
createDiscardButton();














