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
	//once a hand is evaluated, determines: 
	//1.) hand type/rank 2.) car numbers 3. next high card
	var winner;
	var bestHand;
	var players = this.players;
	for(player in players) {
		var player = players[player]
		var playerBestHand = player.bestHand();
		if(bestHand === undefined || playerBestHand.rank > bestHand.rank) {
			bestHand = playerBestHand;
			winner = player.name;
		} else if (playerBestHand.rank === bestHand.rank) {
			if (playerBestHand.phantNum > bestHand.phantNum) {
				bestHand = playerBestHand;
				winner = player.name;
			} else if (playerBestHand.phantNum === bestHand.phantNum) {
				winner = 'tie';
				return true;
			}
		}
	}

	var winningPlayer = players[winner - 1];
	var showWinner = $('<div class=\'col-md-2\'><p class=\'winner\'>');
	$('.winningHand').append(showWinner);
	
	if (winningPlayer === 0) {
		$('.winner').html('You won!');
	} else if (winner === 'tie') {
		$('.winner').html('It\'s a tie! (for now...)');
	} else {
		$('.winner').html('The winner is player ' + winner + ' with a ' + bestHand.hand);
		winningPlayer.createWinningHandImg(winningPlayer.currentHand.length);
	};

	return winner;
}

Game.prototype.computerDiscard = function(){
	var players = this.players;
	console.log('original', players[1]);
	for (player = 1; player < players.length; player++) {
		var currentPlayer = players[player];
		var bestHand = currentPlayer.bestHand();
		console.log('player best', player, bestHand)
		var bestHandType = bestHand.hand;
		var bestHandValue = bestHand.value;
		var currentFullHand = players[player].currentHand;
		var deck = this.deck.cardList;
		if (bestHandType === 'Royal Flush' || bestHandType === 'Straight Flush' || bestHandType === 'Flush' || bestHandType === 'Straight' || bestHandType === 'Full House') {
			return;
		} else if (bestHandType === 'Two Pair') {
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
				console.log(handIndex, currentFullHand[handIndex])
				currentFullHand[handIndex] = deck.shift();
				console.log(handIndex, currentFullHand[handIndex])
				console.log('new', i, player, currentFullHand);
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
			_this.computerDiscard();
			_this.determineWinner();
			_this.end();
		}	
	})
}