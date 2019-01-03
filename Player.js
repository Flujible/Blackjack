export default class Player {
  constructor(isDealer) {
    this.hand = [];
    this.handString;
    this.handTotals = [];
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
    //For each card in the player's hand, convert its face number to a value and
    //add it to the player's totals
    let handTotals = [0];
    let duplicateTotals;
    this.hand.map(card => {
      if (parseInt(card.value)) {
        const cardValue = parseInt(card.value);
        handTotals = handTotals.map(total => total + cardValue);
      } else if (['JACK', 'QUEEN', 'KING'].includes(card.value)){
        //Face cards are always worth 10, add this to hand totals
        handTotals = handTotals.map(total => total + 10);
      } else if (card.value === 'ACE'){
        // Duplicate the hand totals, add 1 to the original and 11 to the
        // other, dont add duplicates
        duplicateTotals = handTotals.slice();
        handTotals = handTotals.map(total => total + 1);
        duplicateTotals = duplicateTotals.map(total => handTotals.push(total + 11));
      }
    });

    //TODO: This isnt always being run for some reason
    let cleanHandTotals = [...new Set(handTotals)];
    for(let i = cleanHandTotals.length -1; i === 0; i--) {
      console.log(cleanHandTotals[i])
      if(cleanHandTotals[i] > 21) {
        console.log("over 21 found: "+cleanHandTotals[i]);
        cleanHandTotals.splice(i, 1);
      }

    }
    console.log(`Hand: ${cleanHandTotals}`);
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
