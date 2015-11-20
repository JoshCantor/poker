var Player = function(name, currentHand, potentialHands) {
	this.name = name;
	this.currentHand = currentHand;
	this.potentialHands = potentialHands
}

Player.prototype.discardAndDraw = function() {

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
	var highCard = sortedHand[4].number;
	
	var potentialHands = [
			{
				hand: 'High Card',
				value: highCard,
				sortedHand: sortedHand,
				rank: 0

			}
	];

	var pair1 = {
		hand: 'Pair',
		value: false,
		rank: 1
	};

	var pair2 = {
		hand: 'Pair2',
		value: false
	};

	var twoPair = {
		hand: 'Two Pair',
		value: false,
		rank: 2
	};

	var threeOfKind = {
		hand: 'Three Of a Kind',
		value: false,
		rank: 3
	};

	var straight = {
		hand: 'Straight',
		value: false,
		rank: 4
	};

	var fourOfKind = {
		hand: 'Four Of a Kind',
		value: false,
		rank: 5
	};

	var fullHouse = {
		hand: 'Full House', 
		value: false,
		rank: 6
	};

	var flush = {
		hand: 'Flush', 
		value: false,
		rank: 7
	};

	var straightFlush = {
		hand: 'Straight Flush', 
		value: false,
		rank: 8
	};

	var royalFlush = {
		hand: 'Royal Flush', 
		value: false,
		rank: 9
	};

	function getCardNumber(index) {
		return sortedHand[index].number;
	}

	function getPhantomNumber(index) {
		return sortedHand[index].phantomNumber;
	}

	function getCardSuit(index) {
		return sortedHand[index].suit;
	}
	
	function isXofKind() {
		var cardsSeen = [];	
		for (i = 0; i < sortedHand.length; i++) {
			cardNumber = getCardNumber(i);
			phantomNumber = getPhantomNumber(i);
			if (cardNumber === threeOfKind.value) {
				fourOfKind.value = cardNumber;
				fourOfKind.phantNum = phantomNumber;
			}
			else if (cardNumber === pair1.value || cardNumber === pair2.value) {
				threeOfKind.value = cardNumber;
				threeOfKind.phantNum = phantomNumber;
			}
			else if (isIncluded(cardNumber, cardsSeen) && pair1.value !== false && cardNumber !== pair1.value) {
				pair2.value = cardNumber;
				pair2.phantNum = phantomNumber;
				twoPair.value = [pair1.value, pair2.value];
				twoPair.phantNum = [pair1.phantNum, pair2.phantNum];
			}
			else if (isIncluded(cardNumber, cardsSeen)) {
				pair1.value = cardNumber;
				pair1.phantNum = phantomNumber;
			} 	
			cardsSeen.push(cardNumber);
		}	
	}
	isXofKind();

	function isFullHouse() {
		if (pair2.value !== false && threeOfKind.value !== false && pair2.value !== threeOfKind.value) {
			fullHouse.value = ["pair " + pair2.value, "three " + threeOfKind.value];
			// fullHouse.phantNum = ['pair' pair2.phantNum, 'three' + threeOfKind.phantNum];
		} else if (pair1.value !== false && threeOfKind.value !== false && pair1.value !== threeOfKind.value) {
			fullHouse.value = ["pair " + pair1.value, "three " + threeOfKind.value];
			fullHouse.phantNum = ['pair' + pair1.phanNum, 'three' + threeOfKind.phantNum];
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
		flush.value = getCardSuit(0);
		this.flush = flush;
	}
	isFlush(); 

	function isStraight() {
		for (var i = 0; i <= sortedHand.length - 2; i++) {
			if (sortedHand[i + 1].phantomNumber === sortedHand[i].phantomNumber + 1) {
				if (i === sortedHand.length - 2) {
					straight.value = [sortedHand[0].number, sortedHand[4].number];
					return true;
				}
			} else {
				break;
			}
		}
		for (var i = 0; i <= 2; i++) {
			if (sortedHand[i + 1].phantomNumber === sortedHand[i].phantomNumber + 1) {
				if (i === 2 && sortedHand[4].phantomNumber === 14 && sortedHand[0].phantomNumber === 2) {
					straight.value = [sortedHand[4].number, sortedHand[3].number];
				}
			} else {
				break;
			}	
		}
		this.straight = straight;
	}
	isStraight();

	function isStraightFlush() {
		if (straight.value && flush.value) {
			straightFlush.value = true;
		}
		this.straightFlush = straightFlush;
	}
	isStraightFlush();

	function isRoyalFlush() {
		if (straightFlush && (getCardNumber(0) === 10)) {
			royalFlush.value = true;
		}
		this.royalFlush = royalFlush;
	}
	isRoyalFlush();

	var cardList = [];
	for (card in sortedHand) {
		cardList.push(sortedHand[card].phantomNumber);
	}
	potentialHands[0].sortedHand = cardList;
	pair1.sortedHand = cardList;
	pair2.sortedHand = cardList;
	twoPair.sortedHand = cardList;
	threeOfKind.sortedHand = cardList;
	straight.sortedHand = cardList;
	fourOfKind.sortedHand = cardList;
	flush.sortedHand = cardList;
	straightFlush.sortedHand = cardList;
	royalFlush.sortedHand = cardList;

	potentialHands.push(pair1);
	potentialHands.push(pair2);
	potentialHands.push(twoPair);
	potentialHands.push(threeOfKind);
	potentialHands.push(straight);
	potentialHands.push(fourOfKind);
	potentialHands.push(fullHouse);
	potentialHands.push(flush);
	potentialHands.push(straightFlush);
	potentialHands.push(royalFlush);

	return potentialHands;
}	

Player.prototype.bestHand = function() {
	var potentialHands = this.evaluateHand();
	var bestHand;
	var i = 0;
	for (eachHand in potentialHands) {
		var currentHand = potentialHands[eachHand];
		if (currentHand.value) {
			bestHand = potentialHands[eachHand];
		}
	}
	return bestHand;
} 

Player.prototype.createCardImg = function(cardNumber) {
	var userCardContainer = $('<div>').addClass('col-md-1 ' + cardNumber);
	$('.user').append(userCardContainer);
	var userCardImg = this.currentHand[cardNumber].image;
	userCardImg.addClass('card' + cardNumber.toString());
	$('.' + cardNumber).append(userCardImg);
}

Player.prototype.createHandImg = function(handSize) {
	for (var i = 0; i < handSize; i++) {
		this.createCardImg(i);
	}
}

Player.prototype.discard = function() {
	window.alert('click up to three cards to discard');
	var discardChoice = $('.0, .1, .2, .3, .4').on('click', function(event) {
		console.log('hi', event.target);
		$(event.target).css('margin-top', '25px');
	})
}








