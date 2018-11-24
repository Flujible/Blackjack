import Game from './Game';

let apiUrl = 'https://deckofcardsapi.com/api/';
let game = new Game(document, apiUrl);

window.onload = () => {
  game.startGame();
  document.getElementById('drawButton').onclick = () => game.dealCardToPlayer();
  document.getElementById('resetButton').onclick = () => game.startGame();
  document.getElementById('standButton').onclick = () => game.startDealersTurn();
}
