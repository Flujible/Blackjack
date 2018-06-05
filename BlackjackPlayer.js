export default class BlackjackPlayer {
  // TODO player: stand
  // TODO dealer: auto-play when player stands

  constructor(isDealer) {
    this.hand = [];
    this.win = false;
    this.winCount = 0;
    this.isDealer = isDealer;
  }

  reset() {
    this.hand = [];
    document.getElementById('drawButton').disabled = false;
    document.getElementById('standButton').disabled = false;
    if(this.isDealer) {
      document.getElementById('dealerHand').innerText = "Dealer's hand: ";
      document.getElementById('dealerTotals').innerText = "Dealer's hand totals: ";
    } else {
      document.getElementById('playerHand').innerText = "Your hand: ";
      document.getElementById('playerTotals').innerText = "Your hand totals: ";
    }
  }

  get handTotals() {
    let handTotals = [0];
    let duplicateTotals;
    let aces = 0;

    this.hand.map(card => {
      if (Number.isInteger(parseInt(card.value))) {
        const { value } = card;
        const cardValue = parseInt(value, 10);
        handTotals = handTotals.map(total => total + cardValue);
      } else if (['JACK', 'QUEEN', 'KING'].includes(card.value)){
        //Face cards are always worth 10
        handTotals = handTotals.map(total => total + 10);
      } else if (card.value === 'ACE'){
        // Duplicate the hand totals, add 1 to the original and 11 to the
        // other, dont add duplicates
        duplicateTotals = handTotals.slice();
        handTotals = handTotals.map(total => total + 1);
        duplicateTotals.forEach(total => {
          if(!(handTotals.includes(total + 11))) {
            handTotals.push(total + 11);
          }
        });
      }
    });
    return handTotals;
  }

  dealerPlays() {
    /**
    When the dealer has served every player, his face-down card is turned up.

    If the total is 17 or more, he must stand.

    If the total is 16 or under, he must take a card.

    He must continue to take cards until the total is 17 or more, at which point the dealer must stand.

    If the dealer has an ace, and counting it as 11 would bring his total to 17
    or more (but not over 21), he must count the ace as 11 and stand.
    The dealer's decisions, then, are automatic on all plays, whereas the player
    always has the option of taking one or more cards.
    */
  }
}
