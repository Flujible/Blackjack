import BlackjackDeckES6Class from './BlackjackDeck.js';

let apiUrl = 'https://deckofcardsapi.com/api/';

let deck = new BlackjackDeckES6Class(apiUrl);

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
