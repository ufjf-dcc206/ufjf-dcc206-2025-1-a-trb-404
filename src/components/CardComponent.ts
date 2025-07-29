import { Card ,cardSuits } from '../models/card'; 


//extends HTMLElement vai transformar essa classe em um componente customizado do HTML, vai herdar as caracteristicas de HTML.
class CardComponent extends HTMLElement {
 static get observedAttributes() {
        return ['selected']; // Diz ao navegador para ficar de olho no atributo 'selected'
    }
    private card: Card | null = null; // Inicia _card como nula e o private vai garantir _card seja acessada apenas nessa classe, e a condição  é para só a nossa classe ou nada
    private isSelected: boolean = false; // Inicia como falso e so pode ser verdadeiro ou falso

    //esse trecho define qo que o navegador deve observar nessa classe, nesse caso o atributo 'selected'. E depois inicializa duas proprieades privadas card e isSelected. Card vai guardar a carta, e isSelected vai mostrar se esta selcionada ou nao.

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.loadStyles(); // Carrega os estilos do componente
        this.render(); // desenha a carta
        this.addEventListener('click', this.toggleSelect); // Configura para interagir com o clique
    }
    // o consttructor é para quando o componente for criado, sem segredo.
    
    set cards(newCard: Card | null){
        this.card = newCard; // Define a nova carta
        if(!newCard){ // se não tiver carta remove
            this.classList.add('empty-card'); // Adiciona a classe empty-card se não houver carta
        } else {
            this.classList.remove('empty-card'); // Remove a classe
        }
        this.render();
    }

    get cards(): Card | null {
        return this.card; // vai redesenhar mostrando a nova carta
    }

    //esse trecho basicamente atualiza ou retorna a carta e redesenha o componente quando necessário.

    
}

