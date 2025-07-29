import { Card, cardSuits, cardValues } from "./card";

/**
 * @class Deck
 * @description vai representar um baralho de 52 cartas (sem curinga) com métodos para embaralhar e sacar cartas
 */
export class Deck {
  private cards: Card[] = []; // armazena as cartas do baralho

  /**
   * @constructor
   * cria um baralho e embaralha ele
   */
  constructor() {
    this.generateDeck();
    this.shuffle();
  }

  /**
   * @method generateDeck
   * @description gera as 52 cartas do baralho
   */
  private generateDeck(): void {
    this.cards = []; // limpa o array antes de gerar de novo
    const suits = Object.values(cardSuits); // naipes
    const values = Object.values(cardValues); // valores

    // loop que para cada naipe, gera uma carta de cada valor
    for (const suit of suits) {
      for (const value of values) {
        this.cards.push(new Card(value, suit));
      }
    }
  }

  /**
   * @method shuffle
   * @description embaralha as cartas do baralho usando o algoritmo de Fisher-Yates (percorre o array de trás para frente trocando a posição da carta atual com outra aleatória antes dela)
   */
  public shuffle(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  /**
   * @method draw
   * @description remove um número determinado de cartas do baralho e retorna as que foram removidas
   * @param {number} count - número de cartas a sacar
   * @returns {Card[]} - array com as cartas sacadas
   */
  public draw(count: number): Card[] {
    return this.cards.splice(0, count); // remove do início do array (topo)
  }

  /**
   * @method cardsLeft
   * @description retorna quantas cartas ainda restam no baralho
   * @returns {number}
   */
  public cardsLeft(): number {
    return this.cards.length;
  }

  /**
   * @method reset
   * @description reseta o baralho ao estado original
   */
  public reset(): void {
    this.generateDeck();
    this.shuffle();
  }
}
