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
        console.log(data.deck_id);
      }).catch((err) => {
        console.log('Request failed', err);
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
        console.log('Request failed', err);
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
        console.log('Request failed', err);
      });
  }

  updatePlayerData(player) {
    let cards;
    let totals;

    console.log(player.handTotals)
    //Remove any totals greater than 21
    for(let i = player.handTotals.length - 1; i <= 0; i--) {
      player.handTotals[i] > 21 ? player.handTotals.splice(i, 1) : '';
    }

    //Create a string containing each card that the player has in their hand
    player.hand.forEach((card, index) => {
      if (index === 0) {
        cards = card.code;
      } else {
        cards += ', ' + card.code;
      }
    });
    //Add text to identify which player's hand is being displayed
    if(player.isDealer) {
      document.getElementById('dealerHand').innerText = "Dealer's hand: " + cards;
    } else {
      document.getElementById('playerHand').innerText = "Your hand: " + cards;
    }

    //Add totals to the list of totals unless the total is >21
    //
    //For each ace the user has in their hand, they have additional potential
    //hand totals that they can use, so display each of the possibilities
    player.handTotals.forEach((total, index) => {
      if (index === 0) {
        totals = total;
      } else {
        totals += ', ' + total;
      }
    });
    //Add text to identify which player's hand total is being displayed
    if(player.isDealer) {
      document.getElementById('dealerTotals').innerText = "Dealer's hand totals: " + totals;
    } else {
      document.getElementById('playerTotals').innerText = "Your hand totals: " + totals;
    }
  }

  //Calculate the player's current position in the game
  evaluateHand(player) {
    //If all their possible hands are above 21, disable buttons and show losing message
    if (player.handTotals.every(value => value > 21)) {
      document.getElementById('drawButton').disabled = true
      document.getElementById('standButton').disabled = true;
      this.createGameEndMessage("You lose 😭");
    }
    //If any of the player's hands show 21, they automatically win
    if (player.handTotals.includes(21)) {
      if (player.isDealer) {
        document.getElementById('drawButton').disabled = true;
        document.getElementById('standButton').disabled = true;
        this.createGameEndMessage("Dealer wins 😭");
      } else {
        document.getElementById('drawButton').disabled = true;
        document.getElementById('standButton').disabled = true;
        this.createGameEndMessage("You win! 😄");
      }
    }
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
