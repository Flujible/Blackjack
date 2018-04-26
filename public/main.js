let apiUrl = 'https://deckofcardsapi.com/api/';

let deck = new BlackjackDeck();

function BlackjackDeck() {
  this.deckId = 'new';
  this.cardsRemaining = null;
  this.lastDrawnCard = null;

  this.shuffle = () => {
    fetch(apiUrl + 'deck/' + this.deckId + '/shuffle/')
      .then(status)
      .then(json)
      .then((data) => {
        this.deckId = data.deck_id;
        this.cardsRemaining = data.remaining;
        console.log(data.deck_id);
      }).catch((err) => {
        console.log('Request failed', err);
      });
  }

  this.drawCard = (drawNo) => {
    fetch(apiUrl + 'deck/' + this.deckId + '/draw/?count=' + drawNo)
      .then(status)
      .then(json)
      .then((data) => {
        this.lastDrawnCard = data.cards[0].code;;
      }).catch((err) => {
        console.log('Request failed', err);
      });
  }
}


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
