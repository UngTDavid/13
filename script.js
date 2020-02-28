$(document).ready(function() {


  //Orders the cards by value then suits.
  function orderCards(hand) {
    hand.sort((a, b) => a.number - b.number);
  }


  // Makes classes of cards to be injected to the Deck class's array.
  class Card {
    constructor(value, suit, number) {
      this.value = value;
      this.suit = suit;
      this.codeName =
      this.src = ((value + suit[0]).toUpperCase() + ".png")
      this.number = number;
    }
  }


  //Generates the Deck by constructing classes of cards.
  class Deck {
    constructor() {
      this.suits = ["Diamond", "Clubs", "Hearts", "Spades"];
      this.values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
      this.cards = [];
      let cardIndex = 0
      for (let value of this.values) {
        for (let suit of this.suits) {
          this.cards.push(new Card(value, suit, cardIndex));
          cardIndex++;
        }
      }
    }

    //Generates the deck again.
    regenerate() {
      let cardIndex = 0
      for (let value of this.values) {
        for (let suit of this.suits) {
          this.cards.push(new Card(value, suit, cardIndex));
          cardIndex++;
        }
      }
    }

    //Console logs the cards in the Deck.
    print() {
      console.log(this.cards);
    }

    //Deals Cards in to player's hand.
    deal(player) {
      while (player.length != 13) {
        let card = Math.floor(Math.random() * (this.cards.length - 0)) + 0;
        player.push(this.cards[card]);
        this.cards.splice(card, 1);
      }
      orderCards(player)
    }
  }

  //Make each player as a class with their number and cards in thier hand
  class Player {
    constructor(playerNumber) {
      this.cardsInHand = [];
      this.playerNumber = playerNumber
      newDeck.deal(this.cardsInHand);
      orderCards(this.cardsInHand);
    }
    //deals the cards to the player by calling the deal function in the deck
    dealCards() {
      newDeck.deal(this.cardsInHand);
    }
    //loops through the cards and appends them to a Div in the html page.
    show(player) {
      let playerName = `<h1>player</h1>`
      $("#demo").append(playerName);
      for (let card in player) {
        let content = `
        <img src=images/${player[card].src} class="cardHand" id="${player[card].number}">
        `
        $("#demo").append(content);
      }
    }

  }


  //Creates a TotalPlayers class with all the players
  class TotalPlayers {
    constructor() {
      this.playersInGame = [];
      let playerCounter = 1;
      while (this.playersInGame.length != 4) {
        this.playersInGame.push(new Player(playerCounter));
        playerCounter++;
      }
    }
    //prints all the players
    print() {
      console.log(this.playersInGame)
    }
    //loops all the players and shows their cards in the game
    showAllPlayers() {
      for (let player of this.playersInGame) {
        player.show(player.cardsInHand)
      }
    }
  }


  newDeck = new Deck();
  newDeck.print();
  players = new TotalPlayers();
  players.showAllPlayers();
  players.print();
  newDeck.regenerate();

  //plays a single card
  // function playSingle(){
  $('.cardHand').click(
    function() {
      //targets the number of the card and stores it in card ID
      let cardId = $(this).attr("id");
      //loops through the players and the cards in their hands to find the card
      for (let player of players.playersInGame) {
        let counter = 0
        for (let card of player.cardsInHand) {
          //if the cardId is equal to the card in their hand remove the card from the array and the screen
          if (card.number == cardId) {
            player.cardsInHand.splice(counter, 1);
            $("#"+cardId).remove()
          } else {
            counter++;
          }
        }
      }

    }
  )
// }
  console.log(players.playersInGame[1].cardsInHand);




});
