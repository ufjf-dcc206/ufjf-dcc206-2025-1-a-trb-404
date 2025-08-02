import { Deck } from "../models/Deck";
import type { CardComponent } from "./CardComponent";

class DeckComponent extends HTMLElement {
  // criação do barlho
  private deck: Deck;

  constructor() {
    super();
    this.deck = new Deck();

    // shadow DOM para encapsular estilo e conteúdo
    this.attachShadow({ mode: "open" });

    // HTML e CSS do componente, incluindo botão e área para mostrar cartas
    this.shadowRoot!.innerHTML = `
      <style>
        .deck-controls {
          margin-bottom: 1rem;
        }
        .deck-area {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
      </style>

      <div class="deck-controls">
        <button id="draw">Sacar Carta</button>
      </div>

      <div class="deck-area" id="deckArea"></div>
    `;
  }

  connectedCallback() {
    // quando o componente entra na página, adiciona o evento de clique no botão
    const drawButton = this.shadowRoot!.getElementById("draw")!;
    drawButton.addEventListener("click", () => this.drawCard());
  }

  drawCard() {
    // se o baralho tiver vazio, não faz nada
    const card = this.deck.draw(1)[0];
    if (!card) return;

    // dispara um evento dizendo qual carta foi sacada, para que outros componentes possam lidar com isso
    this.dispatchEvent(
      new CustomEvent("card-drawn", {
        detail: { card },
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define("deck-component", DeckComponent);
