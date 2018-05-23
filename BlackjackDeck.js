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
        player.hand.push(data.cards[0]);
        let cards;
        let totals;
        player.hand.forEach((card, index) => {
          if (index === 0) {
            cards = card.code;
          } else {
            cards += ', '+card.code;
          }
        });
        player.handTotals.forEach((total, index) => {
          if (index === 0) {
            totals = total;
          } else if(total <= 21) {
            totals += ', '+total;
          }
        })
        document.getElementById('playerHand').innerText = "Your hand: " + cards;
        document.getElementById('playerTotals').innerText = "Your hand totals: " + totals;
        console.log(player.handTotals);
        // if (player.handTotals.every(value => value > 21)) {
        //   document.getElementById('drawButton').disabled = true;
        // }
      }).catch((err) => {
        console.log('Request failed', err);
      });
  }
}
