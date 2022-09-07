'use strict';

const score0EL = document.getElementById('score--0');
const score1EL = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const playerActive_Bg = document.querySelector('.active--player');
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');

// Making the default values of scores of both the players to be 0
// score0EL.textContent = 0;
// score1EL.textContent = 0;
// diceEL.classList.add('hidden');

// const scores = [0, 0];
// let currentScore = 0;
// let activePlayer = 0;
// let playing = true;

let scores, currentScore, activePlayer, playing;

const init = function() {
    
    scores = [0, 0]; 
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    current0EL.textContent = 0;
    current1EL.textContent = 0;
    score0EL.textContent = 0;
    score1EL.textContent = 0;

    diceEL.classList.add('hidden');
    player0EL.classList.remove('player--winner');
    player1EL.classList.remove('player--winner');
    player0EL.classList.add('player--active');
    player1EL.classList.remove('player--active');
};
init();

const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0EL.classList.toggle('player--active');   
    player1EL.classList.toggle('player--active');
}

btnRoll.addEventListener('click', function() {
    if(playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;
        
        //need to remove the hidden property from the diceEL
        diceEL.classList.remove('hidden');
        diceEL.src = `dice-${dice}.png`;
        
        if(dice !== 1) {
            currentScore += dice; 
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else {
            //switching to another player
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function() {
    if(playing) {
        // Holding Current Score values of current scores to the Global Score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        
        // Now this is the last step of all other steps
        // One whose score reaches >= 100, WINS the game
        if(scores[activePlayer] >= 20) {
            // JUST FINISH THE GAME
            playing = false;
            diceEL.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }
        else {
            // switchPlayer();
            // Switching PLayers when CLICKED -- ON HOLD
            switchPlayer();
        }   
    }
});

//The below code is into the ====> init() function

// btnNew.addEvenetListener('click', function() {
//     current0EL.textContent = 0;
//     current1EL.textContent = 0;
//     score0EL.textContent = 0;
//     score1EL.textContent = 1;
//     player0EL.classList.remove('player-winner');
//     player1EL.classList.remove('player-winner');
//     player0EL.classList.add('active--player');
//     player1EL.classList.remove('active--player');
// });

btnNew.addEventListener('click', init);