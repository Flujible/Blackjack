import Deck from "./Deck";
import Player from "./Player";

export default class Game {
    constructor(document, apiUrl) {
        this.document = document;
        this.apiUrl = apiUrl;
        this.player = new Player(false);
        this.dealer = new Player(true);
        this.deck = new Deck(this.apiUrl);
    }

    startGame() {
        this.deck.shuffle();
        this.player.reset();
        this.dealer.reset();
        this.deck.initialDeal(this.player, this.dealer);
        if(this.document.getElementById('gameEndMessage')) {
            let message = this.document.getElementById('gameEndMessage');
            message.parentNode.removeChild(message);
        }
        this.document.getElementById('dealerHand').innerText = "Dealer's hand: ";
        this.document.getElementById('dealerTotals').innerText = "Dealer's hand totals: ";
        this.document.getElementById('playerHand').innerText = "Your hand: ";
        this.document.getElementById('playerTotals').innerText = "Your hand totals: ";
        this.document.getElementById('drawButton').disabled = false;
        this.document.getElementById('standButton').disabled = false;
        this.document.getElementById('resetButton').disabled = false;
    }

    /**
     * @desc When the dealer has served every player, his face-down card is turned up.
     * If the total is 17 or more, he must stand.
     * If the total is 16 or under, he must take a card.
     * If the dealer has an ace, and counting it as 11 would bring his total to 17
     * or more (but not over 21), he must count the ace as 11 and stand.
     * He must continue to take cards until the total is 17 or more, at which point the dealer must stand.
     */
    startDealersTurn() {
        this.document.getElementById('drawButton').disabled = true;
        this.document.getElementById('standButton').disabled = true;
        //TODO: Turn over the face down cards
        let dealerLimitReached = false;
        this.dealer.handTotals.map(handTotal => {
            handTotal >= 17 ? dealerLimitReached = true : ''
        })
        dealerLimitReached ? this.evaluateGameState() : this.deck.dealCard(this.dealer);
    }

    dealCardToPlayer() {
        this.deck.dealCard(this.player);
    }

    dealCardToDealer() {
        this.deck.dealCard(this.dealer);
    }

    evaluateGameState() {
        console.log("Dealer's turn finished");
        
        /**
         * If the player stands and the dealer reaches 17 in card value
         * compare hand totals to see who is closest to 21
         * Declare the winner
         */
    }

    giveDealerAce() {
        this.deck.dealAce(this.dealer);
    }
}