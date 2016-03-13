#Poker

[Click to Play Poker](http://joshcantor.github.io/poker/)



##What

5 card draw poker. Deals to 1-4 computer players and a single user. 



##Why

This was built in my fourth and fifth weeks of learning JavaScript and Object Oriented Programming, and it was a way to further explore both.



##How
For each hand, cards are dealt to all players. There is then a round of discarding/drawing where the user selects discards by clicking and the computers discard cards that are not part of their 'best hand.' Each computer player's best hand is determined by the evaluation algorithm I created, and the cards that are not part of the best hand are discarded. 

After a full round of discarding and drawing, all players' best hands are determined by the evaluation algorithm and then compared by a different algorithm that determines the winner of the hand.



##Challenges 

Building the algorithm to evaluate an individual player's hand took the largest amount of time and was the most challenging to debug, since I was not yet familiar with tests, and the game state changes with each new hand dealt.


##Known Bugs

Tied hands are not fully evaluated by poker rules (i.e. looking at the next highest card), and results in no winner being determined.

User inputs for 'Computer Players' is not validated, and inputs other than an integer between 1 and 4 can result in a number of bugs.


##Future Features

Tests for the hand evaluation algorithm.

Unselecting cards selected to for discard.

Validating the input for 'Computer Players.'

Using a form (which I was not yet familiar with when I built the game) to take user input.

Full refactor to add modularity and to DRY out my code.




##Software Stack
JavasScript, jQuery, HTML, CSS, Bootstrap

