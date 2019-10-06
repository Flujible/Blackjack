export default class Deck {
  constructor(apiUrl) {
    this.deckId = 'new';
    this.cardsRemaining = null;
    this.apiUrl = apiUrl;
  }

  //Shuffle the deck and deal cards
  initialDeal(player, dealer) {
    const deals = [];
    //Deal cards alternately to the player and then the dealer
    deals.push(this.dealCard(player));
    deals.push(this.dealCard(dealer, true));
    deals.push(this.dealCard(player));
    deals.push(this.dealCard(dealer));

    return Promise.all(deals)
  }

  //Shuffle the deck of cards being used
  shuffle() {
    fetch(this.apiUrl + 'deck/' + this.deckId + '/shuffle/')
      .then(response => response.json())
      .then((data) => {
        this.deckId = data.deck_id;
        this.cardsRemaining = data.remaining;
      }).catch((err) => {
        console.error('Request failed', err);
      });
  }

  //Take a card from the deck being used and give it to the specified player
  dealCard(player) {
    return fetch(this.apiUrl + 'deck/' + this.deckId + '/draw/?count=1')
      .then(response => response.json())
      .then((data) => {
        //Add a 'resolved' key to speed up hand calculations 
        data.cards[0].resolved = false;
        player.hand.push(data.cards[0]);
        player.updatePlayerData();
        player.evaluateHand();
      }).catch((err) => {
        console.error('Request failed', err);
      });
  }
  
  dealAce(player) {
    let ace = {suit: "DIAMONDS", value: "ACE", code: "AD"}
    fetch(this.apiUrl + 'deck/' + this.deckId + '/draw/?count=1')
      .then(response => response.json())
      .then((data) => {
        player.hand.push(ace);
        player.updatePlayerData(player);
        player.evaluateHand(player);
      })
      .catch((err) => {
        console.error('Request failed', err);
      });
  }
}
