export default class BlackjackDeck {
  constructor(apiUrl) {
    this.deckId = 'new';
    this.cardsRemaining = null;
    this.lastDrawnCard = null;
    this.apiUrl = apiUrl;
  }

  initialDeal(player, dealer) {
    this.shuffle();
    this.dealCard(player);
    this.dealCard(dealer);
    this.dealCard(player);
    this.dealCard(dealer);
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
            totals += ', ' + total;
          }
        });
        if(player.isDealer) {
          document.getElementById('dealerHand').innerText = "Dealer's hand: " + cards;
          document.getElementById('dealerTotals').innerText = "Dealer's hand totals: " + totals;
        } else {
          document.getElementById('playerHand').innerText = "Your hand: " + cards;
          document.getElementById('playerTotals').innerText = "Your hand totals: " + totals;
        }

        console.log(player.handTotals);
        if (player.handTotals.every(value => value > 21)) {
          document.getElementById('drawButton').disabled = true;
          this.createGameEndMessage("You lose 😭");
        }
        if (player.handTotals.includes(21)) {
          if (player.isDealer) {
            document.getElementById('drawButton').disabled = true;
            this.createGameEndMessage("Dealer wins 😭");
          } else {
            document.getElementById('drawButton').disabled = true;
            this.createGameEndMessage("You win! 😄");
          }
        }
      }).catch((err) => {
        console.log('Request failed', err);
      });
  }

  createGameEndMessage(innerText) {
    let gameEndMessage = document.createElement('div');
    gameEndMessage.id ='gameEndMessage'
    let newContent = document.createTextNode(innerText);
    gameEndMessage.appendChild(newContent);
    let mainContent = document.getElementById('mainContent');
    mainContent.append(gameEndMessage);
  }
}
