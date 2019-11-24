/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScore, activePlayer, winScore;

scores = [0,0];
roundScore = 0;
activePlayer = 0;
prevRolls = [0,0];
winScore = document.getElementById('winningScore').value;
console.log(winScore);

document.getElementById('setScore').addEventListener('click',function(){
    var setScore = document.getElementById('winningScore').value;
    setScore > scores[0] && setScore > scores[1] ? winScore = setScore : alert('Winning score cannot be set to a value that is less than either player\'s current total score.')
    console.log(winScore);
    document.getElementById('winningScore').value = winScore;
});

/*
Math object allows for basic math operations

dice = Math.floor(Math.random() * 6) + 1;

/*
querySelector allows us to select elements from the DOM just as with CSS
qurySelector only uses the first element it finds
textContent attribute only modifies plain text and does not modify HTML
innerHtml attribute is used to modify HTML - values assigned to this attribute must always be a string
*/

//document.querySelector('#current-'+ activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

/*
Use querySelector to read text of element to variable
var x = document.querySelector('#score-0').textContent;
console.log(x);
*/

/*
Use querySelector to modify CSS properties of object

*/
document.querySelector('.dice').style.display = 'none';

/*
Events notify js code that something has happened on the DOM
add eventListeners to elements to respont to various actions performed on the DOM
events are executed only once the execution stack is empty 
events waiting to be processed are placed in the message que after the execution stack is cleared
event listeners are functions so they get their own execution contexts
*/

//add event listener to element
//list of events can be found on https://developer.mozilla.org/en-US/docs/Web/Events

function btn(){

}

/*if we want to call the btn function from the event listener we do not use parenthesis
i.e we just give the name of the function to the event listener for it to call
e.g ....addEventListener('click', btn);
This is know as a callback function - that is, a function that is passed as a parameter to another
*/

/*
An anonymous function does not have a name and cannot be reused
anonymous functions are useful for implementing event listeners as they define the logoc of the event without the need to define an external function
*/

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

document.querySelector('.btn-roll').addEventListener('click', function() {
  
    //1. generate a random number
    var dice = Math.floor(Math.random() * 6) + 1;
    //2. display a the roll result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    
    //3. update the round score if the rolled number was NOT a 1
    if(dice > 1){
        if (prevRolls[activePlayer] === 6 && dice === 6){
            nextPlayer();
        }
        else{
        //Add score
        roundScore += dice;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
        prevRolls[activePlayer] = dice;
        }
    }
    else{
     nextPlayer();
    }
});

function nextPlayer(){
       //Next player
       prevRolls[activePlayer] = 0;
       var diceDOM = document.querySelector('.dice');
       activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
       roundScore = 0;
       document.getElementById('current-0').textContent = 0;
       document.getElementById('current-1' ).textContent = 0;
       //remove class from one element and add it to another
       //toggle method removes class if it is there and adds it if it is not
       document.querySelector('.player-0-panel').classList.toggle('active');
       document.querySelector('.player-1-panel').classList.toggle('active');
       diceDOM.style.display = 'none';
}

document.querySelector('.btn-hold').addEventListener('click', function(){
    scores[activePlayer] += roundScore;
    var diceDOM = document.querySelector('.dice');
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    if(scores[activePlayer] < winScore){
        roundScore = 0;
        document.getElementById('current-0').textContent = 0;
        document.getElementById('current-1' ).textContent = 0;
        //remove class from one element and add it to another
        //toggle method removes class if it is there and adds it if it is not
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        diceDOM.style.display = 'none';
    }
    else{
        document.querySelector('.btn-hold').style.display = 'none';
        document.querySelector('.btn-roll').style.display = 'none';
        document.getElementById('name-' + activePlayer).textContent = 'WINNER!';
        diceDOM.style.display = 'none';
    }
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

});

document.querySelector('.btn-new').addEventListener('click', resetGame);

function resetGame(){
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.btn-hold').style.display = 'block';
    document.querySelector('.btn-roll').style.display = 'block';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
}
