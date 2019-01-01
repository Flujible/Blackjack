export default class Deck {
  constructor(apiUrl) {
    this.deckId = 'new';
    this.cardsRemaining = null;
    this.lastDrawnCard = null;
    this.apiUrl = apiUrl;
  }

  //Shuffle the deck and deal cards
  initialDeal(player, dealer) {
    //Deal cards alternately to the player and then the dealer
    this.dealCard(player);
    this.dealCard(dealer);
    this.dealCard(player);
    this.dealCard(dealer);
  }

  //Shuffle the deck of cards being used
  shuffle() {
    fetch(this.apiUrl + 'deck/' + this.deckId + '/shuffle/')
      .then(response => response.json())
      .then((data) => {
        this.deckId = data.deck_id;
        this.cardsRemaining = data.remaining;
      }).catch((err) => {
        console.err('Request failed', err);
      });
  }

  //Take a card from the deck being used and give it to the specified player
  dealCard(player) {
    fetch(this.apiUrl + 'deck/' + this.deckId + '/draw/?count=1')
      .then(response => response.json())
      .then((data) => {
        this.lastDrawnCard = data.cards[0].code;
        player.hand.push(data.cards[0]);
        this.updatePlayerData(player);
        this.evaluateHand(player);
      }).catch((err) => {
        console.err('Request failed', err);
      });
  }
  
  dealAce(player) {
    let ace = {suit: "DIAMONDS", value: "ACE", code: "AD"}
    fetch(this.apiUrl + 'deck/' + this.deckId + '/draw/?count=1')
      .then(response => response.json())
      .then((data) => {
        player.hand.push(ace);
        this.updatePlayerData(player);
        this.evaluateHand(player);
      })
      .catch((err) => {
        console.err('Request failed', err);
      });
  }
}
