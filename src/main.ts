import "./components/CardComponent";
import "./components/DeckComponent";
import "./components/HandComponent";

import { Deck } from "./models/Deck";
import { Hand } from "./models/Hand";

// Criação das instâncias principais
const deck = new Deck();
const hand = new Hand(8);

// Conexão lógica entre os componentes
const handComponent = document.querySelector("ice-hand") as HTMLElement & {
  hand: Hand;
  updateHand: () => void;
};

if (handComponent) {
  handComponent.hand = hand;

  const cards = deck.draw(5);
  cards.forEach((card) => hand.addCard(card));
  handComponent.updateHand();
}

const deckComponent = document.querySelector("deck-component");
if (deckComponent) {
  deckComponent.addEventListener("card-drawn", (event: any) => {
    const card = event.detail.card;
    if (hand.addCard(card)) {
      handComponent.updateHand();
    } else {
      alert("Mão cheia!");
    }
  });
}
