import Game from './Game';

let apiUrl = 'https://deckofcardsapi.com/api/';
let game = new Game(document, apiUrl);

window.onload = () => {
  document.getElementById('drawButton').onclick = () => game.dealCardToPlayer();
  document.getElementById('resetButton').onclick = () => game.startGame();
  document.getElementById('standButton').onclick = () => game.startDealersTurn();
  game.startGame();
}
