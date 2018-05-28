export default class BlackjackPlayer {
  // TODO player: reset, winCount, stand, request cards, flag: bust,
  // TODO dealer: shuffle deck, hand, handTotal, request cards, stands, isDealer flag

  constructor(isDealer) {
    this.hand = [];
    this.bust = false;
    this.win = false;
    this.winCount = 0;
    this.isDealer = isDealer;
  }

  reset() {
    this.hand = [];
    this.bust = false;
    document.getElementById('drawButton').disabled = false;
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
}
