import Deck from "./Deck";
import Player from "./Player";

export default class Game {
    constructor(document, apiUrl) {
        this.document = document;
        this.apiUrl = apiUrl;
        this.deck = new Deck(this.apiUrl);
        this.gameEnded = false;
    }

    /**
     * @desc Reset the page and player objects and shuffle the deck
     */
    startGame() {
        const dealerCardArea = this.document.getElementById('dealerArea');
        const playerCardArea = this.document.getElementById('playerArea');
        while (dealerCardArea.firstChild) {
            dealerCardArea.removeChild(dealerCardArea.firstChild);
        }
        while (playerCardArea.firstChild) {
            playerCardArea.removeChild(playerCardArea.firstChild);
        }
        this.gameEnded = false;
        this.player = new Player(false);
        this.dealer = new Player(true);
        this.deck.shuffle();
        this.deck.initialDeal(this.player, this.dealer).then(() => {
            this.evaluateGameState();
        });
        if(this.document.getElementById('gameEndMessage')) {
            let message = this.document.getElementById('gameEndMessage');
            message.parentNode.removeChild(message);
        }
        this.document.getElementById('dealerHand').innerText = "Dealer's hand: ";
        this.document.getElementById('dealerTotals').innerText = "Dealer's hand total(s): ";
        this.document.getElementById('playerHand').innerText = "Your hand: ";
        this.document.getElementById('playerTotals').innerText = "Your hand total(s): ";
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
    //TODO: The dealer must draw cards in a loop until their limit of 17 has been reached instead of drawing a single card
    startDealersTurn() {
        this.player.stand = true;
        this.document.getElementById('drawButton').disabled = true;
        this.document.getElementById('standButton').disabled = true;
        this.dealersDraw();
    }

    dealersDraw() {
        if(!this.dealer.dealerStand()) {
            this.dealCardToDealer()
                .then(() => {
                    this.dealersDraw();
                });
        } else {
            this.evaluateGameState();
        }
    }

    /**
     * @desc Deal a card from the deck to the player
     */
    dealCardToPlayer() {
        this.deck.dealCard(this.player)
            .then(() => {
                this.evaluateGameState();
            });
    }

    /**
     * @desc Deal a card from the deck to the dealer
     */
    dealCardToDealer(faceDown) {
        return this.deck.dealCard(this.dealer, faceDown);
    }

    /**
     * @desc Compare the dealer's optimal total to the player's optimal total and declare a winner
     */
    evaluateGameState() {
        this.player.handTotals.map(total => {
            if(total === 21) {
                this.endGame(this.player);
                this.gameEnded = true;
            } else if(total > 21 && !this.gameEnded) {
                this.endGame(this.dealer);
                this.gameEnded = true;
            }
        });

        if(!this.gameEnded) {
            this.dealer.handTotals.map(total => {
                if(total === 21) {
                    this.endGame(this.dealer);
                    this.gameEnded = true;
                } else if(total > 21) {
                    this.endGame(this.player);
                    this.gameEnded = true;
                }
            });
        }

        if(!this.gameEnded && this.dealer.stand && this.player.stand) {
            if(this.player.largestTotal === this.dealer.largestTotal) {
                this.endGame();
            } else if(this.player.largestTotal > this.dealer.largestTotal) {
                this.endGame(this.player);
            } else {
                this.endGame(this.dealer)
            }

        }
    }

    giveDealerAce(player) {
        this.deck.dealAce(player);
    }

    endGame(winner) {
        this.document.getElementById("drawButton").disabled = true;
        this.document.getElementById("standButton").disabled = true;
        let innerText;
        if(winner) {
            winner.isDealer ? innerText = "You lose 😭" : innerText = "You win 🎉";
        } else {
            innerText = "Its a draw 😱"
        }
        let gameEndMessage = document.createElement('div');
        gameEndMessage.id ='gameEndMessage'
        let newContent = document.createTextNode(innerText);
        gameEndMessage.appendChild(newContent);
        let mainContent = document.getElementById('mainContent');
        mainContent.append(gameEndMessage);
    }
}