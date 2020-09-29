/* eslint-disable no-unused-vars */
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
  turn(square.target.id, humanPlayer);
}

function turn(squareId, player) {
  originalBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;
}
