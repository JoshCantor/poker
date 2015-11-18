// var createPlayer = function() {
	var playerContainer = $('<div>').addClass('player');

	var playerImg = $('<img>').attr('src', 'images/card_back.png');

	var playerName = $('<p>')

	playerContainer.append(playerImg, playerName);

	$('.row').append(playerContainer);
// 	return playerContainer;
// }

