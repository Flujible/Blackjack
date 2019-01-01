export default class Player {
  constructor(isDealer) {
    this.hand = [];
    this.handString;
    this.handTotals = [];
    this.totalsString;
    this.win = false;
    this.winCount = 0;
    this.isDealer = isDealer;
  }

  //Re-enable buttons and reset text nodes for the start of a new game
  reset() {
    this.hand = [];
  }

  
  get handTotals() {
    return this.handTotals;
  }

  /**
   * @desc Updates the player's hand totals, hand string, and totals string
   */
  updatePlayerData() {
    this.hand.map((card, index) => {
      index === 0 ? this.handString = card.code : this.handString += `, ${card.code}`;
    });

    //For each card in the player's hand, convert its face number to a value and
    //add it to the player's totals
    this.hand.map(card => {
      if (parseInt(card.value)) {
        const cardValue = parseInt(card.value);
        this.handTotals = this.handTotals.map(total => total + cardValue);
      } else if (['JACK', 'QUEEN', 'KING'].includes(card.value)){
        //Face cards are always worth 10, add this to hand totals
        this.handTotals = this.handTotals.map(total => total + 10);
      } else if (card.value === 'ACE'){
        // Duplicate the hand totals, add 1 to the original and 11 to the
        // other, dont add duplicates
        duplicateTotals = this.handTotals.slice();
        this.handTotals = this.handTotals.map(total => total + 1);
        duplicateTotals = duplicateTotals.map(total => this.handTotals.push(total + 11));
      }
    });
    //Remove any duplicates or values > 21 from the hand totals
    this.handTotals = [...new Set(this.handTotals)]
    for(let i = this.handTotals.length; i === 0; i--) {
      this.handTotals[i] > 21 ? this.handTotals.splice(i, 1) : '';
    }

    this.handTotals.map((total, index) => {
      index === 0 ? this.totalsString = total : this.totalsString += `, ${total}`;
    });
    
    this.isDealer ? 
      document.getElementById('dealerHand').innerText = "Dealer's hand: " + this.handString : 
      document.getElementById('playerHand').innerText = "Your hand: " + this.handString;

    this.isDealer ? 
      document.getElementById('dealerHand').innerText = "Dealer's hand totals: " + this.totalsString : 
      document.getElementById('playerHand').innerText = "Your hand totals: " + this.totalsString;
  }

  evaluateHand() {
    return this.handTotals.every(value => value > 21) ? -1 :
    player.handTotals.includes(21) ? 1 : 0 
  }
}
