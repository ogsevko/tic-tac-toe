let originalBoard;
const humanPlayer = 'O';
const aiPlayer = 'X';
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];

const cells = document.querySelectorAll('.board__cell');
const replay = document.querySelector('.start');

replay.addEventListener('click', startGame);

startGame();

function startGame() {
  document.querySelector('.winner').style.display = 'none';

  originalBoard = Array.from(Array(9).keys());

  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = '';
    cells[i].style.removeProperty('background-color');
    cells[i].addEventListener('click', turnClick, false);
  }
}

function turnClick(square) {
  if (typeof originalBoard[square.target.id] === 'number') {
    turn(square.target.id, humanPlayer);

    setTimeout(() => {
      if (!checkTie()) {
        turn(bestSpot(), aiPlayer);
      }
    }, 100);
  }
}

function turn(squareId, player) {
  originalBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;

  const gameWon = checkWin(originalBoard, player);

  if (gameWon) {
    gameOver(gameWon);
  }
}

function checkWin(board, player) {
  const plays = board.reduce((a, e, i) => (
    (e === player) ? a.concat(i) : a), []);
  let gameWon = null;

  for (const [index, win] of winningCombinations.entries()) {
    if (win.every(elem => plays.indexOf(elem) > -1)) {
      gameWon = {
        index: index,
        player: player,
      };
      break;
    }
  }

  return gameWon;
}

function gameOver(gameWon) {
  for (const index of winningCombinations[gameWon.index]) {
    document.getElementById(index).style.backgroundColor
      = gameWon.player === humanPlayer ? 'blue' : 'red';
  }

  for (let i = 0; i < cells.length; i++) {
    cells[i].removeEventListener('click', turnClick, false);
  }

  declareWinner(gameWon.player === humanPlayer ? 'You win!' : 'You lose!');
}

function declareWinner(winner) {
  document.querySelector('.winner').style.display = 'block';
  document.querySelector('.winner__name').innerText = winner;
}

function emptySquares() {
  return originalBoard.filter(s => typeof s === 'number');
}

function bestSpot() {
  return emptySquares()[0];
}

function checkTie() {
  if (emptySquares().length === 0) {
    for (let i = 0; i < cells.length; i++) {
      cells[i].style.backgroundColor = 'green';
      cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner('It\'s a tie');

    return true;
  }

  return false;
}
