import { Deck } from "../models/Deck";
import { Card } from "../models/card";

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
    const deckArea = this.shadowRoot!.getElementById("deckArea")!;

    // se não tiver mais cartas no baralho após uma pedida, nada acontece
    const card = this.deck.draw(1)[0];
    if (!card) return;

    // cria o elemento visual da carta e passa os atributos necessários
    const cardEl = document.createElement("playing-card");
    cardEl.setAttribute("rank", card.rank);
    cardEl.setAttribute("suit", card.suit);

    // a carta é renderizada na tela
    deckArea.appendChild(cardEl);
  }
}

customElements.define("deck-component", DeckComponent);
