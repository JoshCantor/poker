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
	user.createHandImg(5);
	
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
		// console.log("all hands", playerBestHand);
		if(bestHand === undefined || playerBestHand.rank > bestHand.rank) {
			bestHand = playerBestHand;
			winner = player.name;
		} else if (playerBestHand.rank === bestHand.rank) {
			if (playerBestHand.phantNum > bestHand.phantNum) {
				bestHand = playerBestHand;
				winner = player.name;
			} else if (playerBestHand.phantNum === bestHand.phantNum) {
				console.log("It's a tie! (for now...)")
				return true;
			}
		}
	}
	console.log('The winner is player', winner);
	console.log('Winning hand: ', bestHand.hand, bestHand.phant);
	return winner;
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
				console.log(event.target);
				$('.' + handIndex).remove();
				user.replaceCardImg(handIndex);
			}
			console.log(userHand);
			_this.determineWinner()
			_this.end();
		}	
	})
}


//make discard on game, game discards for players