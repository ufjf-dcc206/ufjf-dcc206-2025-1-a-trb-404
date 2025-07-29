import { Card ,cardSuits } from '../models/card'; 


//extends HTMLElement vai transformar essa classe em um componente customizado do HTML, vai herdar as caracteristicas de HTML.
class CardComponent extends HTMLElement {
 static get observedAttributes() {
        return ['selected']; // Diz ao navegador para ficar de olho no atributo 'selected'
    }
    private card: Card | null = null; // Inicia _card como nula e o private vai garantir _card seja acessada apenas nessa classe, e a condição  é para só a nossa classe ou nada
    private isSelected: boolean = false; // Inicia como falso e so pode ser verdadeiro ou falso
}
//esse trecho define qo que o navegador deve observar nessa classe, nesse caso o atributo 'selected'. E depois inicializa duas proprieades privadas card e isSelected. Card vai guardar a carta, e isSelected vai mostrar se esta selcionada ou nao.