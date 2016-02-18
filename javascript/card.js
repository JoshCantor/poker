var Card = function(name, number, suit, phantomNumber) {
	this.name = name;
	this.number = number;
	//phantom number gives the facecards a number id: J = 11, Q = 12, K = 13, A = 14
	this.phantomNumber = phantomNumber;
	this.suit = suit;
}