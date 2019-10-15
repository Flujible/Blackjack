export default class Deck {
  constructor(apiUrl) {
    this.deckId = 'new';
    this.cardsRemaining = null;
    this.apiUrl = apiUrl;
    this.imgBase = "https://deckofcardsapi.com/static/img/"
  }

  /**
   * TODO: aria-live polite will announce whenever something changes
   * Adding alt tags to the images and aria live to the card area MAY cause screen readers
   * to announce the new card
   * Otherwise, add a srt div with the hand values in and aria live and it should
   * get announced
   */

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
    const imgContainer = document.createElement('div');
    const imgTag = document.createElement('img');
    const cardArea = document.getElementById(player.isDealer ? 'dealerArea' : 'playerArea');

    imgContainer.classList.add('cardFace');
    imgContainer.classList.add(faceDown ? 'cardFace--back' : 'cardFace--front');
    return fetch(this.apiUrl + 'deck/' + this.deckId + '/draw/?count=1')
      .then(response => response.json())
      .then((data) => {
        let randomNo = Math.floor(Math.random() * 4) - 2;
        // Add a 'resolved' key to speed up hand calculations
        data.cards[0].resolved = false;
        // Add a 'faceDown' key to determine how to display the card
        faceDown ? data.cards[0].faceDown = true : null;
        player.hand.push(data.cards[0]);
        imgTag.src = `${this.imgBase}${data.cards[0].code}.png`;
        imgContainer.style.transform = `translateY(${player.isDealer ? '-' : '+'}50vh) 
                                        rotate(${randomNo}deg)`;
        imgTag.classList.add("card");
        faceDown ? imgTag.classList.add("facedown") : null;
        
        

        const sceneDiv = document.createElement('div');
        if(faceDown) {
          const cardDiv = document.createElement('div');
          const frontDiv = document.createElement('div');
          const backDiv = document.createElement('div');

          sceneDiv.classList.add('scene');
          sceneDiv.style.transform = `translateY(-50vh) rotate(${randomNo}deg)`;

          cardDiv.classList.add('cardFlip');
          cardDiv.id = "cardFlip";
          backDiv.classList.add('cardFlipFace');
          backDiv.classList.add('cardFace--back');
          frontDiv.classList.add('cardFace');
          frontDiv.classList.add('cardFace--front');

          sceneDiv.appendChild(cardDiv);
          frontDiv.appendChild(imgTag);
          cardDiv.appendChild(backDiv);
          cardDiv.appendChild(frontDiv);
          cardArea.appendChild(sceneDiv);
        } else {
          imgContainer.appendChild(imgTag);
          cardArea.appendChild(imgContainer);
        }
        
        player.updatePlayerData();
        player.evaluateHand();
        setTimeout(() => {
          sceneDiv.style.transform = `rotate(${randomNo}deg)`;
          randomNo = Math.floor(Math.random() * 4) - 2;
          imgContainer.style.transform = `rotate(${randomNo}deg)`;
        }, 100);
      }).catch((err) => {
        console.error('Request failed', err);
      });
  }
}
