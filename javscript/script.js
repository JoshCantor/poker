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

Game.prototype.determineWinner = function() {
	//loop through players 'best hand' (evaluate hand)
	// console.log(this.players);
}

var Player = function(name, currentHand, potentialHands) {
	this.name = name;
	this.currentHand = currentHand;
	this.potentialHands = potentialHands
}

Player.prototype.discardCards = function() {
}


Player.prototype.lookAtDetailedCards = function() {
	var sortedHand = this.currentHand.sort(function(a, b) {
		return a.phantomNumber - b.phantomNumber;
	});
	return sortedHand;
	
}

Player.prototype.lookAtSimpleCards = function() {
	var sortedHand = this.lookAtDetailedCards();
	var hand = []
	for (card in sortedHand) {
		hand.push([sortedHand[card].number, sortedHand[card].suit]);
	}
	return hand;
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
	var sortedHand = this.lookAtDetailedCards();
	this.lookAtSimpleCards();

	var potentialHands = {highCard: {"0": sortedHand[4].number}};

	var pair1 = {"1": false};
	var pair2 = {"1": false};
	var twoPair = {"2": false};
	var threeOfKind = {"3": false};
	var straight = {"4": false};
	var fourOfKind = {"5": false};
	var fullHouse = {"6": false};
	var flush = {"7": false};
	var straightFlush = {"8": false};
	var royalFlush = {"9": false};

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
			if (cardNumber === threeOfKind["3"]) {
				fourOfKind["5"] = cardNumber;
			}
			else if (cardNumber === pair1["1"] || cardNumber === pair2["1"]) {
				threeOfKind["3"] = cardNumber;
			}
			else if (isIncluded(cardNumber, cardsSeen) && pair1["1"] !== false && cardNumber !== pair1["1"]) {
				pair2["1"] = cardNumber;
				twoPair["2"] = [pair1["1"], pair2["1"]];
			}
			else if (isIncluded(cardNumber, cardsSeen)) {
				pair1["1"] = cardNumber;
			} 	
			cardsSeen.push(cardNumber);
		}	
	}
	isXofKind();

	function isFullHouse() {
		if (pair2["1"] !== false && threeOfKind["3"] !== false && pair2["1"] !== threeOfKind["3"]) {
			fullHouse["6"] = ["pair " + pair2["1"], "three " + threeOfKind["3"]];
		} else if (pair1["1"] !== false && threeOfKind["3"] !== false && pair1["1"] !== threeOfKind["3"]) {
			fullHouse["6"] = ["pair " + pair1["1"], "three " + threeOfKind["3"]];
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
		flush["7"] = getCardSuit(0);
		this.flush = flush;
	}
	isFlush(); 

	function isStraight() {
		for (var i = 0; i <= sortedHand.length - 2; i++) {
			if (sortedHand[i + 1].phantomNumber === sortedHand[i].phantomNumber + 1) {
				if (i === sortedHand.length - 2) {
					straight["4"] = [sortedHand[0].number, sortedHand[4].number];
					return true;
				}
			} else {
				break;
			}
		}
		for (var i = 0; i <= 2; i++) {
			if (sortedHand[i + 1].phantomNumber === sortedHand[i].phantomNumber + 1) {
				if (i === 2 && sortedHand[4].phantomNumber === 14 && sortedHand[0].phantomNumber === 2) {
					straight["4"] = [sortedHand[4].number, sortedHand[3].number];
				}
			} else {
				break;
			}	
		}
		this.straight = straight;
	}
	isStraight();

	function isStraightFlush() {
		if (straight["4"] && flush["7"]) {
			straightFlush["8"] = true;
		}
		this.straightFlush = straightFlush;
	}
	isStraightFlush();

	function isRoyalFlush() {
		if (straightFlush && (getCardNumber(0) === 10)) {
			royalFlush["9"] = true;
		}
		this.royalFlush = royalFlush;
	}
	isRoyalFlush();

	potentialHands.pair1 = pair1;
	potentialHands.pair2 = pair2;
	potentialHands.twoPair = twoPair;
	potentialHands.threeOfKind = threeOfKind;
	potentialHands.straight = straight;
	potentialHands.fourOfKind = fourOfKind;
	potentialHands.fullHouse = fullHouse;
	potentialHands.flush = flush;
	potentialHands.straightFlush = straightFlush;
	potentialHands.royalFlush = royalFlush;

	var cardList = [];
	for (card in sortedHand) {
		cardList.push(sortedHand[card].phantomNumber);
	}

	console.log(cardList);

	potentialHands.pair1.sortedHand = cardList;
	potentialHands.pair2.sortedHand = cardList;
	potentialHands.twoPair.sortedHand = cardList;
	potentialHands.threeOfKind.sortedHand = cardList;
	potentialHands.straight.sortedHand = cardList;
	potentialHands.fourOfKind.sortedHand = cardList;
	potentialHands.flush.sortedHand = cardList;
	potentialHands.straightFlush.sortedHand = cardList;
	potentialHands.royalFlush.sortedHand = cardList;

	//if type is shared, look at the card of that type and compare first
	//if those cards are also tied, then look at ordered hand
	//if that's the same, split the pot
	//have second property be the ordered phantom.numbers 
	
	// console.log(potentialHands);
	return potentialHands;
}	

Player.prototype.bestHand = function() {
	//once a hand is evaluated, determines 
	//1.) hand type/rank 2.) car numbers 3. next high card
	var potentialHands = this.evaluateHand();
	var bestHand;
	var i = 0;
	for (eachHand in potentialHands) {
		numStr = i.toString()
		var currentHand = potentialHands[eachHand][numStr];
		if (currentHand) {
			var detailedHand = potentialHands[eachHand];
			bestHand = [eachHand, detailedHand];
		}
		i += 1
	}



	// console.log(bestHand);

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
// console.log(game1.players[0].evaluateHand());
// console.log(game1.players[1].evaluateHand());
game1.players[0].bestHand();
// game1.determineWinner();
game1.end();





