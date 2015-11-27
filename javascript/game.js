var Game = function(numberOfPlayers) {
	this.start();
	this.deck = new DeckOfCards();
	this.players = [];
	//creating players
	for (playerNumber = 1; playerNumber <= numberOfPlayers; playerNumber++) {
		var player = new Player (playerNumber, []);
		this.players.push(player);
	}
	//dealing cards 
	while (this.players[this.players.length - 1].currentHand.length < 5) {
		for (var playerNumber = 0; playerNumber < numberOfPlayers; playerNumber++) {
			this.players[playerNumber].currentHand.push(this.deck.cardList[0]);
			this.deck.cardList.shift();
		}
	}
	var user = this.players[0];
	user.createHandImg(user.currentHand.length);
	
	user.selectDiscard();
	this.discard();
}
	

Game.prototype.start = function() {
	console.log("We're beginning a new game! Let the dealing begin.");
}

Game.prototype.end = function() {
	console.log("Sadly, the game is now over :(");
}

Game.prototype.determineWinner = function() {
	var winner;
	var bestHand;
	var players = this.players;
	for(player in players) {
		var currentPlayer = players[player]
		var currentPlayerBestHand = currentPlayer.bestHand();
		console.log(player, currentPlayerBestHand);
		if(bestHand === undefined || currentPlayerBestHand.rank > bestHand.rank) {
			bestHand = currentPlayerBestHand;
			winner = currentPlayer.name;
		} else if (currentPlayerBestHand.rank === bestHand.rank) {
			if (currentPlayerBestHand.phantNum > bestHand.phantNum) {
				bestHand = currentPlayerBestHand;
				winner = currentPlayer.name;
			} else if (currentPlayerBestHand.phantNum === bestHand.phantNum) {
				winner = 'tie';
			}
		}
	}

	var winningPlayerIndex = players[winner - 1];
	var showWinner = $('<div class=\'col-md-2\'><p class=\'winner\'>');
	$('.winningHand').append(showWinner);
	
	if (winningPlayerIndex === 0) {
		$('.winner').html('You won!');
	} else if (winner === 'tie') {
		$('.winner').html('It\'s a tie! (for now...)');
	} else {
		$('.winner').html('The winner is computer player ' + Number(winningPlayerIndex.name) - 1 + ' with a ' + bestHand.hand);
		winningPlayerIndex.createWinningHandImg(winningPlayerIndex.currentHand.length);
	};

	return winner;
}

Game.prototype.computerDiscard = function(){
	var players = this.players;
	for (player = 1; player < players.length; player++) {
		var currentPlayer = players[player];
		var bestHand = currentPlayer.bestHand();
		var bestHandType = bestHand.hand;
		var bestHandValue = bestHand.value;
		var currentFullHand = players[player].currentHand;
		var deck = this.deck.cardList;
		if (bestHandType === 'Royal Flush' || bestHandType === 'Straight Flush' || bestHandType === 'Flush' || bestHandType === 'Straight' || bestHandType === 'Full House') {
			return;
		} else if (bestHandType === 'Two Pair') {
			console.log('twoPair Full Hand before', currentFullHand);
			for (card = 0; card < currentFullHand.length; card++) {
				var currentCard = currentFullHand[card];
				var currentCardValue = currentCard.number;
				var discards = currentPlayer.discards;
				if (bestHandValue[0] !== currentCardValue || bestHandValue[1] !== currentCardValue) {
					discards.push(card);
				}
				for(i in discards) {
					var handIndex = discards[i];
					currentFullHand[handIndex] = deck.shift();
				}
			}
		} else {
			for (card = 0; card < currentFullHand.length; card++) {
				var currentCard = currentFullHand[card];
				var currentCardValue = currentCard.number;
				var discards = currentPlayer.discards;
				if (bestHandValue !== currentCardValue) {
					discards.push(card);
				}
			}
			for (i in discards) {
				var handIndex = discards[i];
				currentFullHand[handIndex] = deck.shift();
			}
		}
	}
}

Game.prototype.discard = function() {
	var _this = this;
	var user = this.players[0]
	var userDiscardNum = user.numberOfDiscards
	var discards = user.discards;
	var userHand = user.currentHand;
	var deck = this.deck.cardList;
	$('.discardButton').on('click', function(event) {
		if (userDiscardNum < 1) {
			userDiscardNum += 1;
			for(i in discards) {
				var handIndex = discards[i];
				userHand[handIndex] = deck.shift();
				$('.' + handIndex).remove();
				user.replaceCardImg(handIndex);
			}
			console.log('waaaay before', _this.players[1].currentHand);
			_this.computerDiscard();
			_this.determineWinner();
			_this.end();
		}	
	})
}