var DeckOfCards = function(numberOfCards, cardList) {
	this.numberOfCards = numberOfCards;
	this.cardList = cardList;
	this.create();
	this.shuffle();
}

DeckOfCards.prototype.create = function() {
	var cardList = [];
	var faceCards = ["jack", "queen", "king", "ace"];
	var suits = ["clubs", "diamonds", "hearts", "spades"];
	var cardCounter = 1 
	
	for(var i = 0; i < suits.length; i++) {	
		for(var cardNumber = 2; cardNumber <= 10; cardNumber++) {
			var card = new Card (cardCounter, cardNumber, suits[i], cardNumber, i);
			card.image = $('<img>').attr('src', 'images/' + card.suit + '/' + card.number + '.png')
			cardList.push(card);
			cardCounter += 1;
		}
		for(var faceCardIndex = 0; faceCardIndex < faceCards.length; faceCardIndex++) {
			var card = new Card (cardCounter, faceCards[faceCardIndex], suits[i], (faceCardIndex + 11), faceCardIndex);
			card.image = $('<img>').attr('src', 'images/' + card.suit + '/' + card.number + '.png')
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
	var deck = this.cardList;
	var shuffled = [];
	var randomNumberList = [];

	for (var i = 1; i <= 52; i++) {
		addOnlyNovelNumbersToList(randomCardNumber(), randomNumberList);
	}
	
	deck.forEach(function(card, cardIndex, deck) {
		shuffled.push(deck[randomNumberList[cardIndex]]);
	}); 

	this.cardList = shuffled;
}