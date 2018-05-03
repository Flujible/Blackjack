export default class BlackjackPlayer {
 // TODO player: hand, handTotal, winCount, stand, request cards, flag: bust,
 // TODO dealer: shuffle deck, hand, handTotal, request cards, stands, isDealer flag

 constructor() {
   let hand = [];
 }

 addCardToHand(card) {
    this.hand.push(card);
    this.handTotal = this.calculateHandTotal();
 }

 calculateHandTotal() {
   let total = 0;
   for (let card of this.hand) {
     total += this.evaluate(card);
   }
   if (total > 21) {
     this.bust = true;
     console.log("bust");
   }
   console.log(total);
 }

 evaluate(card) {
   let cardValue = card.value;
   //Face cards are always worth 10
   if (['JACK', 'QUEEN', 'KING'].includes(cardValue)) return 10;

   // TODO: Aces can be either 1 or 11 - think how to handle this
   // Calculate total of all cards except aces
   // For the each Ace, duplicate the handTotal aray
   // For each hand total, add 1 to inital array, add 11 to the duplications
   // Cast a set operator to ensure there is only one of each possible value
   if (cardValue === 'ACE') return 1;

   //All other cards have self explanatory values
   return parseInt(cardValue, 10);
 }
}
