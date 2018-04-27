export default function(apiUrl) {
  this.deckId = 'new';
  this.cardsRemaining = null;
  this.lastDrawnCard = null;
  this.apiUrl = apiUrl

  this.shuffle = () => {
    fetch(this.apiUrl + 'deck/' + this.deckId + '/shuffle/')
      .then(response => response.json())
      .then((data) => {
        this.deckId = data.deck_id;
        this.cardsRemaining = data.remaining;
        console.log(data.deck_id);
      }).catch((err) => {
        console.log('Request failed', err);
      });
  }

  this.drawCard = (drawNo) => {
    fetch(this.apiUrl + 'deck/' + this.deckId + '/draw/?count=' + drawNo)
      .then(response => response.json())
      .then((data) => {
        this.lastDrawnCard = data.cards[0].code;;
      }).catch((err) => {
        console.log('Request failed', err);
      });
  }
}

export class BlackjackDeckES6Class {
  constructor(apiUrl) {
    this.deckId = 'new';
    this.cardsRemaining = null;
    this.lastDrawnCard = null;
    this.apiUrl = apiUrl;
  }

  shuffle() {
    fetch(this.apiUrl + 'deck/' + this.deckId + '/shuffle/')
      .then(response => response.json())
      .then((data) => {
        this.deckId = data.deck_id;
        this.cardsRemaining = data.remaining;
        console.log(data.deck_id);
      }).catch((err) => {
        console.log('Request failed', err);
      });
  }

  drawCard() {

  }
}
