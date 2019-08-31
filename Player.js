export default class Player {
  constructor(isDealer) {
    this.hand = [];
    this.handString;
    this.handTotals = [0];
    this.totalsString;
    this.win = false;
    this.isDealer = isDealer;
  }

  /**
   * @desc Updates the player's hand totals, hand string, and totals string
   */
  updatePlayerData() {
    let cardCodes = this.hand.map(card => card.code);
    this.handString = this.stringify(cardCodes);
    this.handTotals = this.calcHandTotals();
    this.totalsString = this.stringify(this.handTotals);


    //TODO: Move to bespoke function
    this.isDealer ?
      document.getElementById('dealerHand').innerText = "Dealer's hand: " + this.handString :
      document.getElementById('playerHand').innerText = "Your hand: " + this.handString;
    this.isDealer ?
      document.getElementById('dealerTotals').innerText = "Dealer's hand totals: " + this.totalsString :
      document.getElementById('playerTotals').innerText = "Your hand totals: " + this.totalsString;
  }

  evaluateHand() {
    return this.handTotals.every(value => value > 21 ? -1 :
    this.handTotals.includes(21) ? 1 : 0)
  }

  calcHandTotals() {
    let newCards = [];
    let duplicateTotals;
    this.hand.map(card => {
      if(!card.resolved) {
        newCards.push(card);
        card.resolved = true;
      }
    });
    newCards.map(card => {
      if (parseInt(card.value)) {
        const cardValue = parseInt(card.value);
        this.handTotals = this.handTotals.map(total => total + cardValue);
      } else if (['JACK', 'QUEEN', 'KING'].includes(card.value)){
        //Face cards are always worth 10, add this to hand totals
        this.handTotals = this.handTotals.map(total => total + 10);
      } else if (card.value === 'ACE'){
        // Duplicate the hand totals, add 1 to the original and 11 to the other
        duplicateTotals = this.handTotals.slice();
        this.handTotals = this.handTotals.map(total => total + 1);
        duplicateTotals = duplicateTotals.map(total => this.handTotals.push(total + 11));
      }
    });

    //Remove any duplicates added above
    let cleanHandTotals = [...new Set(this.handTotals)];
    //Check: This isnt always being run for some reason
    //Remove any totals greater than 21 (unless its the only hand total)
    for(let i = cleanHandTotals.length - 1; i === 0; i--) {
      cleanHandTotals[i] > 21 && i > 0 ? cleanHandTotals.splice(i, 1) : null;
    }
    return cleanHandTotals;
  }


  stringify(arr) {
    let string;
    arr.map((item, index) => {
      index === 0 ? string = item : string += `, ${item}`;
    })
    return string;
  }
}
