var Game = function(numberOfPlayers) {
	this.deck = new DeckOfCards();
	this.players = [];
	//creating players
	for (playerNumber = 1; playerNumber <= numberOfPlayers; playerNumber++) {
		var player = new Player (playerNumber, []);
		this.players.push(player);
	}
	//dealing cards 
	while(this.players[this.players.length - 1].currentHand.length < 5) {
		for (var playerNumber = 0; playerNumber < numberOfPlayers; playerNumber++) {
			this.players[playerNumber].currentHand.push(this.deck.cardList[0]);
			this.deck.cardList.shift();
		}
	}
}

Game.prototype.start = function() {
	console.log("We're beginning a new game! Let the dealing begin.");
}

Game.prototype.end = function() {
	console.log("Sadly, the game is now over :(");
}

var Player = function(name, currentHand, bestHand) {
	this.name = name;
	this.currentHand = currentHand;
	this.bestHand = bestHand
}

Player.prototype.lookAtCards = function() {
}

Player.prototype.discardCards = function() {
}

Player.prototype.evaluateHand = function() {
	// for testing straights/straight flushes
	// game1.players[0].currentHand[0].number = 10;
	// game1.players[0].currentHand[1].number = "Jack";
	// game1.players[0].currentHand[2].number = "Queen";
	// game1.players[0].currentHand[3].number = "King";
	// game1.players[0].currentHand[4].number = "Ace";
	// game1.players[0].currentHand[0].phantomNumber = 10;
	// game1.players[0].currentHand[1].phantomNumber = 11;
	// game1.players[0].currentHand[2].phantomNumber = 12;
	// game1.players[0].currentHand[3].phantomNumber = 13;
	// game1.players[0].currentHand[4].phantomNumber = 14;

	//sort hand by number
	var sortedHand = this.currentHand.sort(function(a, b) {
		return a.phantomNumber - b.phantomNumber;
	});

	var bestHand = {
		highCard: sortedHand[4].number, 
	}

	var pair1 = false;
	var pair2 = false;
	var twoPair = false;
	var threeOfKind = false;
	var straight = false;
	var fourOfKind = false;
	var fullHouse = false;
	var flush = false;
	var straightFlush = false;
	var royalFlush = false;
	
	for (card in sortedHand) {
		var hand = []
		hand.push([sortedHand[card].number, sortedHand[card].suit]);
		console.log(hand);
	}

	function getCardNumber(element) {
		return sortedHand[element].number;
	}

	function getCardSuit(element) {
		return sortedHand[element].suit;
	}
	
	function isXofKind() {
		var cardsSeen = [];	
		for (i = 0; i < sortedHand.length; i++) {
			cardNumber = getCardNumber(i);
			if (cardNumber === threeOfKind) {
				fourOfKind = cardNumber;
			}
			else if (cardNumber === pair1 || cardNumber === pair2) {
				threeOfKind = cardNumber;
			}
			else if (isIncluded(cardNumber, cardsSeen) && pair1 !== false && cardNumber !== pair1) {
				pair2 = cardNumber;
				twoPair = [pair1, pair2];
			}
			else if (cardNumber === pair1) {
				threeOfKind = cardNumber;
			}
			else if (isIncluded(cardNumber, cardsSeen)) {
				pair1 = cardNumber;
			} 	
			cardsSeen.push(cardNumber);
		}	
	}
	isXofKind();

	function isFullHouse() {
		if (pair2 !== false && threeOfKind !== false && pair2 !== threeOfKind) {
			fullHouse = ["pair " + pair2, "three " + threeOfKind];
		} else if (pair1 !== false && threeOfKind !== false && pair1 !== threeOfKind) {
			fullHouse = ["pair " + pair1, "three " + threeOfKind];
		}
		this.fullHouse = fullHouse
	}
	isFullHouse();

	function isFlush() {
		for (i = 0; i <= sortedHand.length - 2; i++) {
			if (getCardSuit(i + 1) !== getCardSuit(i)) {
				return false
			}
		}
		flush = getCardSuit(0);
		this.flush = flush;
	}
	isFlush(); 

	function isStraight() {
		for (var i = 0; i <= sortedHand.length - 2; i++) {
			if (sortedHand[i + 1].phantomNumber === sortedHand[i].phantomNumber + 1) {
				if (i === sortedHand.length - 2) {
					straight = [sortedHand[0].number, sortedHand[4].number];
					return true;
				}
			} else {
				break;
			}
		}
		for (var i = 0; i <= 2; i++) {
			if (sortedHand[i + 1].phantomNumber === sortedHand[i].phantomNumber + 1) {
				if (i === 2 && sortedHand[4].phantomNumber === 14 && sortedHand[0].phantomNumber === 2) {
					straight = [sortedHand[4].number, sortedHand[3].number];
				}
			} else {
				break;
			}	
		}
		this.straight = straight;
	}
	isStraight();

	function isStraightFlush() {
		if (straight && flush) {
			straightFlush = true;
		}
		this.straightFlush = straightFlush;
	}
	isStraightFlush();

	function isRoyalFlush() {
		if (straightFlush && (getCardNumber(0) === 10)) {
			royalFlush = true;
		}
		this.royalFlush = royalFlush;
	}
	isRoyalFlush();

	bestHand.pair1 = pair1;
	bestHand.pair2 = pair2
	bestHand.twoPair = twoPair;
	bestHand.threeOfKind = threeOfKind;
	bestHand.straight = straight;
	bestHand.fourOfKind = fourOfKind;
	bestHand.fullHouse = fullHouse;
	bestHand.flush = flush;
	bestHand.straightFlush = straightFlush;
	bestHand.royalFlush = royalFlush;

	return bestHand;
}	 

var Card = function(name, number, suit, phantomNumber) {
	this.name = name;
	this.number = number;
	this.phantomNumber = phantomNumber;
	this.suit = suit;
}

var DeckOfCards = function(numberOfCards, cardList) {
	this.numberOfCards = numberOfCards;
	this.cardList = cardList;
	this.create();
	this.shuffle();
}

DeckOfCards.prototype.create = function() {
	var cardList = [];
	var faceCards = ["Jack", "Queen", "King", "Ace"];
	var suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
	var cardCounter = 1 
	for(var i = 0; i < suits.length; i++) {	
		for(var cardNumber = 2; cardNumber <= 10; cardNumber++) {
			var card = new Card (cardCounter, cardNumber, suits[i], cardNumber, i);
			cardList.push(card);
			cardCounter += 1;
		}
		for(var faceCardIndex = 0; faceCardIndex < faceCards.length; faceCardIndex++) {
			var card = new Card (cardCounter, faceCards[faceCardIndex], suits[i], (faceCardIndex + 11), faceCardIndex);
			cardList.push(card);
			cardCounter += 1;
		}
	}
	this.cardList = cardList;
	this.numberOfCards = cardList.length;
}

function isIncluded(element, list) {
	for (var i = 0; i <= list.length; i++) {
		if (list[i] === element) {
			return true;
		}
	}
	return false;
}

function addOnlyNovelNumbersToList(number, list) {
	isIncluded(number, list) ? addOnlyNovelNumbersToList(randomCardNumber(), list) : list.push(number);
}

function randomCardNumber() {
	return Math.floor(Math.random() * 52);
}

DeckOfCards.prototype.shuffle = function() {
	var deck             = this.cardList;
	var shuffled         = [];
	var randomNumberList = [];

	for (i = 1; i <= 52; i++) {
		addOnlyNovelNumbersToList(randomCardNumber(), randomNumberList);
	}
	
	deck.forEach(function(card, cardIndex, deck) {
		shuffled.push(deck[randomNumberList[cardIndex]]);
	}); 

	this.cardList = shuffled;
}


//Play game below

var numberOfPlayers = 2
var game1 = new Game(2);
game1.start();
console.log(game1.players[0].evaluateHand());
console.log(game1.players[1].evaluateHand());
game1.end();





