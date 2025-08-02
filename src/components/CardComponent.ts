import { Card, cardSuits } from "../models/card";

//extends HTMLElement vai transformar essa classe em um componente customizado do HTML, vai herdar as caracteristicas de HTML.
export class CardComponent extends HTMLElement {
  static get observedAttributes() {
    return ["selected"]; // Diz ao navegador para ficar de olho no atributo 'selected'
  }
  private _card: Card | null = null; // Inicia _card como nula e o private vai garantir _card seja acessada apenas nessa classe, e a condição  é para só a nossa classe ou nada
  private _isSelected: boolean = false; // Inicia como falso e so pode ser verdadeiro ou falso

  //esse trecho define qo que o navegador deve observar nessa classe, nesse caso o atributo 'selected'. E depois inicializa duas proprieades privadas card e isSelected. Card vai guardar a carta, e isSelected vai mostrar se esta selcionada ou nao.

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.loadStyles(); // Carrega os estilos do componente
    this.render(); // desenha a carta
    this.addEventListener("click", this.toggleSelect); // Configura para interagir com o clique
  }
  // o consttructor é para quando o componente for criado, sem segredo.

  set cards(newCard: Card | null) {
    this._card = newCard; // Define a nova carta
    if (!newCard) {
      // se não tiver carta
      this.classList.add("empty-card"); // Adiciona a classe empty-card se não houver carta
    } else {
      this.classList.remove("empty-card"); // Remove a classe
    }
    this.render(); // vai redesenhar mostrando a nova carta
  }

  get card(): Card | null {
    return this._card;
  }
  //esse trecho basicamente atualiza ou retorna a carta e redesenha o componente quando necessário.

  set isSelected(selectState: boolean) {
    if (this.isSelected !== selectState) {
      //so faz alguma coisa se mudar
      this.isSelected = selectState;
      if (this.isSelected) {
        this.setAttribute("selected", ""); //adiciona o atributo selected  no HTML
      } else {
        this.removeAttribute("selected"); //remove o atributo selected do HTML
      }
    }
  }

  get isSelected(): boolean {
    return this._isSelected; //retorna o estado de isSelected
  }

  // Esse trecho controla se a carta está selecionada, atualizando o atributo selected no HTML.

  connectedCallback() {
    this.isSelected = this.hasAttribute("selected"); // Verifica se o atributo 'selected' está presente
    if (this._card) {
      this.classList.add("empty-card");
    } else {
      this.classList.remove("empty-card");
    }
    this.render(); // renderiza inicalmente
  }
  //inicia o componente quando adicionado ao DOM, aplicando a renderização

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "selected") {
      this.isSelected = this.hasAttribute("selected");
    }
  }
//Sincroniza o estado interno quando o atributo selected muda.

  private toggleSelect(){
    if(!this._card) return; // faz nada se tiver vazio
    this.isSelected = !this.isSelected; // Inverte o estado de seleção, ex se for true vira false e vice-versa
    this.dispatchEvent( new CustomEvent('card-selected', {
      detail: { card: this._card, isSelected: this.isSelected }, //é onde empacota os dados que quer enviar junto com o evento
      bubbles: true, // permite que o evento suba na árvore DOM
      composed: true //isso aqui deixa atingir fora do shadow dom
    }));
  }
//dispara evento com os detalhes da carta e seu estado de seleção

    private loadStyles() {
        const styleLink = document.createElement('link');
        styleLink.setAttribute('rel', 'stylesheet');
        styleLink.setAttribute('href', './components/card-component.css'); // Caminho para o arquivo CSS de exemplo ainda ja que nao temos
        this.shadowRoot?.appendChild(styleLink);
    }
    //cria um elemento html link, define o rel como stylesheet, e por ultimo adiciona esse elemento link no shadow DOM do componente

    render(){
        if(!this.shadowRoot) return; // se nao tiver shadow root, nao faz nada
        const existingContent = this.shadowRoot.querySelector('.card-content-wrapper');
        if (existingContent) {
            existingContent.remove();
        }
        //limpa o conteúdo existente parta evitar duplicação

        const contentWrapper = document.createElement('div');
        contentWrapper.classList.add('card-content-wrapper');
        //cria um elemento div e adiciona a classe contentWrapper

        if (!this._card) {
            contentWrapper.innerHTML = `
            <div class ="card-back-placeholder">
                Baralho<br/>Vazio
            </div>
            `;
            //se nao tiver carta, mostra a mensagem de baralho vazio
            this.shadowRoot.appendChild(contentWrapper);
            return; // termina a função aq
        }
        

        const value = this._card.value; // pega o valor da carta
        const suit = this._card.suit; // pega o naipe da carta

        const suitColorClass = (suit === cardSuits.Copas || suit === cardSuits.Ouro) ? 'red-suit' : 'black-suit'; //determina cor do naipe
        
        let suitSymbol = '';
        switch (suit) {
            case cardSuits.Copas: suitSymbol = '♥'; break;
            case cardSuits.Ouro: suitSymbol = '♦'; break;
            case cardSuits.Paus: suitSymbol = '♣'; break;
            case cardSuits.Espada: suitSymbol = '♠'; break;
            default: suitSymbol = '';
        }

        contentWrapper.innerHTML = `
            <div class="card-content">
                <div class="card-value-top ${suitColorClass}">${value}</div>
                <div class="card-suit-center ${suitColorClass}">${suitSymbol}</div>
                <div class="card-value-bottom ${suitColorClass}">${value}</div>
            </div>
        `;
        //vai criar um html com os valores e naipes
        this.shadowRoot.appendChild(contentWrapper); // adiciona o HTML ao Shadow DOM
    }
}
customElements.define('ice-card', CardComponent); // Registra o componente no navegador
