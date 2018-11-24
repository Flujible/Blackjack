export default class Player {
  // TODO player: stand
  // TODO dealer: auto-play when player stands

  constructor(isDealer) {
    this.hand = [];
    this.win = false;
    this.winCount = 0;
    this.isDealer = isDealer;
  }

  //Re-enable buttons and reset text nodes for the start of a new game
  reset() {
    this.hand = [];
  }

  
  get handTotals() {
    let handTotals = [0];
    let duplicateTotals;

    //For each card in the player's hand, convert its face number to a value and
    //add it to the player's totals
    this.hand.map(card => {
      if (Number.isInteger(parseInt(card.value))) {
        const { value } = card;
        const cardValue = parseInt(value, 10);
        //Add that value to every available hand total
        handTotals = handTotals.map(total => total + cardValue);
      } else if (['JACK', 'QUEEN', 'KING'].includes(card.value)){
        //Face cards are always worth 10, add this to hand totals
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
