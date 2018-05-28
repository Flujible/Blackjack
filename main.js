import BlackjackDeck from './BlackjackDeck.js';
import BlackjackPlayer from './BlackjackPlayer.js'

let apiUrl = 'https://deckofcardsapi.com/api/';

let deck = new BlackjackDeck(apiUrl);
let player = new BlackjackPlayer();

let status = (response) => {
  if (response.status <= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

let json = (response) => {
  return response.json();
}

deck.shuffle();

window.onload = () => {
  deck.initialDeal(player, dealer);
  document.getElementById('drawButton').onclick = () => deck.dealCard(player);
  document.getElementById('resetButton').onclick = () => {
    deck.shuffle();
    player.reset();
    document.getElementById('drawButton').disabled = false;
    document.getElementById('playerHand').innerText = "Your hand: ";
    document.getElementById('playerTotals').innerText = "Your hand totals: ";
  }
}
