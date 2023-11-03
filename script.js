// Initialize the score from local storage, or create a new score object
let score = JSON.parse(localStorage.getItem('score')) || {
  win: 0,
  losses: 0,
  tie: 0
};

// Update the initial score on the page
updateScore();

// Function to randomly select the computer's move (Rock, Paper, or Scissors)
function pickComputerMove() {
  const randomInt = Math.floor(Math.random() * 3);

  let computMove = '';
  if (randomInt === 0) {
    computMove = 'Rock';
  } else if (randomInt === 1) {
    computMove = 'Paper';
  } else {
    computMove = 'Scissors';
  }

  return computMove;
}


// Function to play the game and determine the result
function playGame(playerMove) {
  let result = '';

  const computMove = pickComputerMove();

  // Determine the result based on the player's move and the computer's move
  if (playerMove === 'Scissors') {
    if (computMove === 'Rock') {
      result = 'You Lose';
    } else if (computMove === 'Paper') {
      result = 'You Won';
    } else if (computMove === 'Scissors') {
      result = 'Its a Tie';
    }
  } else if (playerMove === 'Paper') {
    if (computMove === 'Rock') {
      result = 'You Won';
    } else if (computMove === 'Paper') {
      result = 'Its a Tie';
    } else if (computMove === 'Scissors') {
      result = 'You Lose';
    }
  } else if (playerMove === 'Rock') {
    if (computMove === 'Rock') {
      result = 'Its a Tie';
    } else if (computMove === 'Paper') {
      result = 'You Lose';
    } else if (computMove === 'Scissors') {
      result = 'You Won';
    }
  }

  // Update the score based on the result
  if (result === 'You Won') {
    score.win++;
  } else if (result === 'You Lose') {
    score.losses++;
  } else if (result === 'Its a Tie') {
    score.tie++;
  }

  // Save the score in local storage
  localStorage.setItem('score', JSON.stringify(score));

  // Update the result, user's move, and AI's move on the page
  document.querySelector('.js-result').innerHTML = `
    <p class="btn-result">${result}</p>`;
  document.querySelector('.js-move').innerHTML = `
    <div class="post-result">
      <div>
        <p class="you">You Picked</p>
        <img src="${playerMove}.png">
        <p class="js"></p>
      </div>
      <div>
        <p class="you">AI Picked</p>
        <img src="${computMove}.png">
      </div>
    </div>
  `;

  // Update the "Play Again" button and the total score
  document.querySelector('.js-again').innerHTML = `<div class="btn-flex">
    <button class="btn" onClick="restart();">Play Again</button>
  </div>`;
  document.querySelector('.js-total').innerHTML = `Total | Wins:${score.win} Losses:${score.losses} Ties:${score.tie}`;
}

// Function to update the score displayed on the page
function updateScore() {
  document.querySelector('.js-score').innerHTML = `${score.win}`;
}

// Function to reset the score to zero
function resetScore() {
  score.win = 0;
  score.losses = 0;
  score.tie = 0;

  // Remove the score from local storage
  localStorage.removeItem('score');

  // Update the score on the page
  updateScore();
}

// Function to restart the game by refreshing the page
function restart() {
  location.reload();
}
