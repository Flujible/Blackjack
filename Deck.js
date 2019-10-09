export default class Deck {
  constructor(apiUrl) {
    this.deckId = 'new';
    this.cardsRemaining = null;
    this.apiUrl = apiUrl;
    this.imgBase = "https://deckofcardsapi.com/static/img/"
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
  dealCard(player, faceDown) {
    const imgTag = document.createElement('img');
    const cardArea = document.getElementById(player.isDealer ? 'dealerArea' : 'playerArea');
    return fetch(this.apiUrl + 'deck/' + this.deckId + '/draw/?count=1')
      .then(response => response.json())
      .then((data) => {
        const randomNo = Math.floor(Math.random() * 4) - 2;
        // Add a 'resolved' key to speed up hand calculations
        data.cards[0].resolved = false;
        // Add a 'faceDown' key to determine how to display the card
        faceDown ? data.cards[0].faceDown = true : null;
        player.hand.push(data.cards[0]);
        imgTag.src = `${this.imgBase}${data.cards[0].code}.png`;
        imgTag.classList.add("card");
        imgTag.style.transform = `rotate(${randomNo}deg)`
        console.log()
        faceDown ? imgTag.classList.add("facedown") : null;
        cardArea.appendChild(imgTag);
        player.updatePlayerData();
        player.evaluateHand();
      }).catch((err) => {
        console.error('Request failed', err);
      });
  }
}
