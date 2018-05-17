export default class BlackjackPlayer {
  // TODO player: hand, handTotal, winCount, stand, request cards, flag: bust,
  // TODO dealer: shuffle deck, hand, handTotal, request cards, stands, isDealer flag

  constructor() {
    this.hand = [];
    this.bust = false;
    this.win = false;
  }

  get handTotals() {
    this.hand.sort();
    let handTotals = [0];

    this.hand.map(card => {
      if (['JACK', 'QUEEN', 'KING'].includes(card.value)) {
        //Face cards are always worth 10
        handTotals = handTotals.map(total => total + 10);

      } else if(Number.isInteger(card.value))) {
        const { value } = card;
        const cardValue = parseInt(value, 10);

        handTotals = handTotals.map(total => total + cardValue);
      } else if (card.value === 'ACE'){
        handTotals = handTotals.map(total => total + 1);
        // TODO:
        //Calculate these last
        //Duplicate the current number of hand totals
        //Add 1 to the original hand totals, add 11 to the duplications
        //Combine the arrays
        //Remove the duplicates
      }

    })
  }
}
