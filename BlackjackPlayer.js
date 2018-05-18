export default class BlackjackPlayer {
  // TODO player: reset, winCount, stand, request cards, flag: bust,
  // TODO dealer: shuffle deck, hand, handTotal, request cards, stands, isDealer flag

  constructor() {
    this.hand = [];
    this.bust = false;
    this.win = false;
    this.winCount = 0;
  }

  reset() {
    this.hand = [];
    this.bust = false;
    this.win = false;
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
        duplicateTotals = handTotals
        handTotals = handTotals.map(total => total + 1);
        duplicateTotals.map(total => {
          if(!(handTotals.includes(total + 11))) {
            handTotals.push(total + 11);
          }
        });
      }
    });
    return handTotals;
  }
}
