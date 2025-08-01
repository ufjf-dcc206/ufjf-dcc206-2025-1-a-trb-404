import {Card} from "./card.ts";

export class Hand {
    private cards: Card[] = []; // array para armazenar as cartas na mão

    readonly maxCards: number; // numero máximo de cartas permitidas na mão

    constructor(maxCards: number = 8) {
    this.maxCards = maxCards;
    }
    //define o tamanho maximo da mao

    addCard(card: Card): boolean {
        if (this.cards.length < this.maxCards) {
            this.cards.push(card); // adiciona a carta ao array
            return true; // retorna verdadeiro se a carta foi adicionada com sucesso
        }
        return false; // retorna falso se a mão já estiver cheia
    }
    //basicamente adiciona uma carta se a mao nao estiver cheia

    removeCards(cardsToremove: Card[]){
        this.cards = this.cards.filter(card=> !cardsToremove.includes(card));
        //vai filtrar as cartas mantendo so as que não estão na lista de remoção
    }

    getCards(): Card[] {
        return[...this.cards]; //retorna uma cópia do array de cartas, assim não modificando o original
    }
}