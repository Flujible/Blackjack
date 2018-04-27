import BlackjackDeck, { BlackjackDeckES6Class } from './BlackjackDeck.js';

// // TODO:
/*
Initiate npm (npm init)
Add Parcel
Use a ES6 CLass for BlackjackDeck
npm start -> parcel index.html
*/

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
