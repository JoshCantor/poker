var Player = function(name, currentHand, potentialHands) {
	this.name = name;
	this.currentHand = currentHand;
	this.potentialHands = potentialHands
	this.discards = [];
	this.numberOfDiscards = 0;
}

Player.prototype.sortHand = function() {
	var sortedHand = this.currentHand.slice().sort(function(a, b) {
		return a.phantomNumber - b.phantomNumber;
	});
	return sortedHand;
}

Player.prototype.evaluateHand = function() {

	//sort hand by number
	var sortedHand = this.sortHand();

	var highCard = sortedHand[4];
	
	var potentialHands = [
			{
				hand: 'High Card',
				value: highCard.number,
				sortedHand: sortedHand,
				rank: 0,
				phantNum: highCard.phantomNumber

			}
	];

	var pair1 = {
		hand: 'pair',
		value: undefined,
		rank: 1
	};

	var pair2 = {
		hand: 'pair2',
		value: undefined
	};

	var twoPair = {
		hand: 'two pair',
		value: undefined,
		rank: 2
	};

	var threeOfKind = {
		hand: 'three of a kind',
		value: undefined,
		rank: 3
	};

	var straight = {
		hand: 'straight',
		value: undefined,
		rank: 4
	};

	var fourOfKind = {
		hand: 'four of a kind',
		value: undefined,
		rank: 5
	};

	var fullHouse = {
		hand: 'full house', 
		value: undefined,
		rank: 6
	};

	var flush = {
		hand: 'flush', 
		value: undefined,
		rank: 7
	};

	var straightFlush = {
		hand: 'straight flush', 
		value: undefined,
		rank: 8
	};

	var royalFlush = {
		hand: 'royal flush', 
		value: undefined,
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
			cardIndex = getCardNumber(i);
			phantomNumber = getPhantomNumber(i);
			if (cardIndex === threeOfKind.value) {
				fourOfKind.value = cardIndex;
				fourOfKind.phantNum = phantomNumber;
			}
			else if (cardIndex === pair1.value || cardIndex === pair2.value) {
				threeOfKind.value = cardIndex;
				threeOfKind.phantNum = phantomNumber;
			}
			else if (isIncluded(cardIndex, cardsSeen) && pair1.value && cardIndex !== pair1.value) {
				pair2.value = cardIndex;
				pair2.phantNum = phantomNumber;
				twoPair.value = [pair1.value, pair2.value];
				twoPair.phantNum = [pair1.phantNum, pair2.phantNum];
			}
			else if (isIncluded(cardIndex, cardsSeen)) {
				pair1.value = cardIndex;
				pair1.phantNum = phantomNumber;
			} 	
			cardsSeen.push(cardIndex);
		}	
	}
	isXofKind();

	function isFullHouse() {
		if (pair2.value && threeOfKind.value && pair2.value !== threeOfKind.value) {
			fullHouse.value = ["pair " + pair2.value, "three " + threeOfKind.value];
			fullHouse.phantNum = ['pair' + pair2.phantNum, 'three' + threeOfKind.phantNum];
		} else if (pair1.value && threeOfKind.value && pair1.value !== threeOfKind.value) {
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
		for (var i = 0; i < sortedHand.length - 1; i++) {
			if (sortedHand[i + 1].phantomNumber === sortedHand[i].phantomNumber + 1) {
				if (i === sortedHand.length - 2) {
					straight.value = [sortedHand[0].number, sortedHand[4].number];
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
		if (straightFlush.value && (getCardNumber(0) === 10)) {
			royalFlush.value = true;
		}
		this.royalFlush = royalFlush;
	}
	isRoyalFlush();

	// var cardList = [];
	// for (card in sortedHand) {
	// 	cardList.push(sortedHand[card].phantomNumber);
	// }
	// potentialHands[0].sortedHand = cardList;
	// pair1.sortedHand = cardList;
	// pair2.sortedHand = cardList;
	// twoPair.sortedHand = cardList;
	// threeOfKind.sortedHand = cardList;
	// straight.sortedHand = cardList;
	// fourOfKind.sortedHand = cardList;
	// flush.sortedHand = cardList;
	// straightFlush.sortedHand = cardList;
	// royalFlush.sortedHand = cardList;

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
		var hand = potentialHands[eachHand];
		if (hand.value) {
			bestHand = potentialHands[eachHand];
		}
	}
	return bestHand;
} 

Player.prototype.createCardImg = function(cardIndex) {
	var userCardContainer = $('<div>').addClass('col-md-1 ' + 'card' + cardIndex);
	$('.user').append(userCardContainer);
	var userCardImg = this.currentHand[cardIndex].image;
	userCardImg.addClass(cardIndex.toString());
	$('.card' + cardIndex).append(userCardImg);
}

Player.prototype.replaceCardImg = function(cardIndex) {
	var userCardImg = this.currentHand[cardIndex].image;
	userCardImg.addClass(cardIndex.toString());
	$('.card' + cardIndex).append(userCardImg);
}

Player.prototype.createHandImg = function(handSize) {
	for (var i = 0; i < handSize; i++) {
		this.createCardImg(i);
	}
}

Player.prototype.selectDiscard = function() {
	var _this = this;
	window.alert('Click Each Card You Would Like To Discard, Then Click the \'Discard\' Button');	
	$('.0, .1, .2, .3, .4').on('click', function(event) {
		$(event.target).css('margin-top', '25px');
		var discarded = $(event.target).attr('class');
		_this.discards.push(discarded);
	})
}

Player.prototype.createWinningCardImg = function(cardIndex) {
	var winnerCardContainer = $('<div>').addClass('col-md-1 ' + 'winningCard' + cardIndex);
	$('.winningHand').append(winnerCardContainer);
	var winningCardImg = this.currentHand[cardIndex].image;
	$('.winningCard' + cardIndex).append(winningCardImg);
}

Player.prototype.createWinningHandImg = function(handSize) {
	for (var i = 0; i < handSize; i++) {
		this.createWinningCardImg(i);
	}
}


