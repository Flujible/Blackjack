export default class BlackjackDeck {
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

  // TODO: Rewrite this to push new cards directly to the player's hand and then
  // call handTotals getter as per comments in player file
  dealCard(player) {
    fetch(this.apiUrl + 'deck/' + this.deckId + '/draw/?count=1')
      .then(response => response.json())
      .then((data) => {
        this.lastDrawnCard = data.cards[0].code;
        document.getElementById('card').innerText = "Card: " + this.lastDrawnCard;
        player.addCardToHand(data.cards[0]);
        console.log(player.handTotals);
        if (player.bust) {
          document.getElementById('drawButton').disabled = true;
        }
      }).catch((err) => {
        console.log('Request failed', err);
      });
  }
}
