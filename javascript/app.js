var createGamePlayer = function() {
	var playerContainer = $('<div>').addClass('player');

	var playerImg = $('<img>').attr('src', 'images/card_back.png');

	var playerName = $('<p>')

	playerContainer.append(playerImg, playerName);

	$('.players').append(playerContainer);
	
	return playerContainer;
}

var createAllPlayers = function(number) {
	for (i = 0; i < number; i++) {
		console.log(i);
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

var startGameButton = function() {
	$('.startButton').on('click', function() {
		var numberOfPlayers = window.prompt("How many players woudld you like?");
		createAllPlayers(numberOfPlayers);
		var gameStart = new Game(numberOfPlayers);

	})
}
startGameButton();
