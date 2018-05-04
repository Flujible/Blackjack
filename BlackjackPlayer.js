export default class BlackjackPlayer {
 // TODO player: hand, handTotal, winCount, stand, request cards, flag: bust,
 // TODO dealer: shuffle deck, hand, handTotal, request cards, stands, isDealer flag

 constructor() {
   this.hand = [];
   this.handTotals = [0];
   this.bust = false;
   this.win = false;
 }

 addCardToHand(card) {
   //If the card is an ace, duplicate the array of totals and add 1 to the original
   //array and add 11 to the duplicated, add values if they dont already exist
   if(card.value === 'ACE') {
     let duplicateHandTotals = this.handTotals;
     for (let total of this.handTotals) {
       total += 1;
       console.log(total);
     }
     for (let total of duplicateHandTotals) {
       total += 11;
       console.log(total);
       if (!this.handTotals.includes(total)) this.handTotals.push(total);
     }
   } else if (['JACK', 'QUEEN', 'KING'].includes(card.value)) {
     for(let total of this.handTotals) {
       //Face cards are always worth 10;
       total += 10;
       console.log(total);
     }
   } else {
     for(let total of this.handTotals) {
       total += parseInt(card.value);
       console.log(total);
     }
   }
 }
}
