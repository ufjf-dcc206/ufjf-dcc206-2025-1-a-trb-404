
/** criei essa enumeração dos naipes das carta pra usar no cardcomponents */
export enum cardSuits {
  Copas = "copas",
  Ouro = "ouro",
  Paus = "paus",
  Espada = "espada",
}

// defini os valores das cartas como strings, pois por exemplo, o valor '10' é uma string na carte e não um número inteiro que daria pra somar (isso vai ser feito depois com o parseInt).
export enum cardValues {
  Dois = "2",
  Tres = "3",
  Quatro = "4",
  Cinco = "5",
  Seis = "6",
  Sete = "7",
  Oito = "8",
  Nove = "9",
  Dez = "10",
  Valete = "J",
  Dama = "Q",
  Rei = "K",
  As = "A",
}
/** Classe que representa uma carta de baralho */
export class Card {
  // as props suit e value são do tipo cardSuits e cardValues, respectivamente, que são os enums que definimos acima.
  // isso garante que só possamos usar valores válidos desses enums ao criar uma carta.
  readonly value: cardValues;
  /*value é o nome da prop que vai guardar o valor da carta.
   *o readonly antes do nome da prop em uma classe (como o suit e value que eu to usando) significa que essa prop so pode ser definada uma vez(ou no momento que o *obj foi criado ou onde ela for declarada).
   *é importante usar pq uma carta não muda depois de ser criada, então não faz sentido mudar o valor ou o naipe dela depois de criada. Um 2 de copas sempre vai ser 2 de copas. E impede tambem que outras partes do código mudem esses valores acidentalmente.
   */

  readonly suit: cardSuits;
  /**
    cardSuit aqui significa que suit deve ser um dos valores do enum cardSuits.
 */
  //cardvalues e cardsuits são os tipos das props value e suit, respectivamente. Isso garante que só possamos usar valores válidos desses enums ao criar uma carta.
  constructor(value: cardValues, suit: cardSuits) {
    this.value = value; //prop value desse objeto vai receber o valor passado no construtor
    this.suit = suit; //prop suit desse objeto vai receber o naipe passado no construtor
  }

  //essa fuuncao retorna o valor numérico da carta, que é usado para calcular a pontuação no jogo.
  get numberValue(): number {
    switch (this.value) {
      case cardValues.Valete:
      case cardValues.Dama:
      case cardValues.Rei:
        return 10;
      case cardValues.As:
        return 15;
      default:
        // pras demais cartas, o valor é o próprio número
        return parseInt(this.value); //parseInt converte a string do valor.
    }
  }
  /** o get aqui permite que acesse como fosse uma prop, e ele nao recebe param e retorna um numero */

  //essa funcao retorna uma string que representa a carta, como "2 de copas" ou "A de espadas".
  toString(): string {
    return `${this.value} de ${this.suit}`; //retorna uma string com o valor e o naipe da carta
  }
}
