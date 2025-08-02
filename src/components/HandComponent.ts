import { Hand } from "../models/Hand";
import { Card } from "../models/card";
import { CardComponent } from './CardComponent'

//essa classe com esse web component vai representar a mão do jogador, ou seja, as cartas que ele tem na mão e gerenciar a seleção e desseleção dessas cartas.

export class HandComponent extends HTMLElement { //aqui diz pro navegador tratar essa classe como um componente HTML
    static get observedAttributes() {
        //pede o navegador pra observar as mudanças no atributo max-selected
        return ['max-selected'];
    }
    private _hand: Hand | null = null
    //guarda a mao do jogador, que é um objeto da classe Hand, e inicia como nulo
    private _selectedCards: Card[] = []
    //guarda as cartar que o jogador clicou e inicia como um array vazio
    private _maxSelected: number = 5
    //guarda o limite de cartas que o jogador pode selecionar, que no caso é 5


    //o construtor é a funcao que é chamada primeiro qunado o componente é criado.
    //ela prepara o componente cria uma área isolada pra estilo e o html(atachShadow), desenha o componente na tela (render) e fica atento aos cliques da carta com o (addEventListener) 
    constructor() {
        super() //garante as características básicas do HTMLElement
        this.attachShadow({ mode: "open" }) //html e css nao comprometem o resto da pagina e ela ser open significa que posso interagir com o conteúdo dela, o que é util pra conseguir escutar os eventos de clique nas cartas.
        this.render() //desenha o conteúdo do componente: vai ver se tem mao de cartas, se tiver vai criar o <ice-card> para cada carta e insere esse ice-card na tela dentro da bolha do attachShadow
        this.shadowRoot?.addEventListener('card-selected', this.handleCardSelection as EventListener)
        //diz pro componente escutar o evento card-selected que é disparado quando uma carta é selecionada, e chama a função handleCardSelected quando isso acontecer.
        // o this.shadowRoot acessa a bolha criada pelo attachShadow, e o ? é pra garantir que shadowRoot não seja nulo.
        //handleCardSelected é executada quando o evento card selected acontecer
    }

    set hand(newHand: Hand | null) {
        this._hand = newHand
        this.render()
    }
    //passa a mao do jogador criada na classe hand para o handcomponent
    //pega o novo obj hand e armazena em _hand.
    //chama o render que vai redesenhar o componente com as novas cartas para que aparecam na tela

    get hand(): Hand | null {
        return this._hand
    }

    //permite ter acesso a mão do jogador de fora do componente simplesmente retornando o valor de _hand.

    get selectedCards(): Card[] {
        return this._selectedCards.slice() 
    }

    //pega a lista de cartas selecionadas e retorna uma copia dela de forma que não possa ser alterada de fora do componente (por engano ou nao) mantendo a lista original intacta.


    //atributeChangedCallback é chamada automaticcamente quando o atributo observado muda, nesse caso quando o max-selected é alterado.
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (name === 'max-selected') {
            //verifica se o atributo alterado é o max-selected
            const newMax = parseInt(newValue);
            //tenta converter o novo valor para um número inteiro, pois ele vem como string
            if (!isNaN(newMax) && newMax >= 0) {
                //isNaN verifica se o valor é um número (is not a number) e se ele é maior ou igual a zero. o ! inverte a resposta, ou seja, se for um número válido e maior que zero, ele continua.
                this._maxSelected = newMax;
                //se passar por tudo, atribui o novo valor a _maxSelected
            }
        }
    }

    //handleCardSelected é chamada toda vez que o jogador clica na carta
    private handleCardSelection(event: CustomEvent) {
        const { card, isSelected } = event.detail; //detalha o clique com os detalhres da carta e se foi selecionada ou não

        if (isSelected) {
            if (this._selectedCards.length < this._maxSelected) {
                this._selectedCards.push(card); 
                //se a carta foi clicada pra ser selecionada, ai ve se o limite de cartas ja foi atingido
                //se tiver espaco, add a carta na lista de cartas selecionadas
            } else {
                const cardElement = event.target as CardComponent;
                cardElement.isSelected = false; 
                //se o limite ja foi atingido, nao seleciona a carta e desmarca ela.
            }
        } else {
            this._selectedCards = this._selectedCards.filter(c => c !== card); //
        }
        //aqui, se a carta foi clicada pra ser desselecionada, remove ela da lista de cartas selecionadas, fazendo uma comparacao carta a carta, as cartas que responderem false vao ser mantidas na lista.
        // entao aqui é so pra tirar a carta que o jogador nao quer mais.
    }


    updateHand() {
        this._selectedCards = []; //limpa a lista de cartas selecionadas, pq depois que ele joga ou descarta a carta, a mao ja nao é mais valida, pq a mao comeca de novo.
        this.render(); //chama a funcao render pra redesenhar o componente na tela com as novas cartas.
    }


    // o render nada mais é que o responsavel por desenhar o componente (a mao do jogador) na tela e é chamado sempre que a mao tem que ser exibida ou atualizada.
    render() {
        if (!this.shadowRoot || !this._hand) return;
        //verifica se o shadowRoot (a bolha) e a mao do jogador (_hand) existem, se nao existir, nao faz nada e sai da funcao.
        this.shadowRoot.innerHTML = '';
        //limpa o conteudo do shadowRoot, pra nao ficar acumulando cartas de renderizações anteriores.
        //quando render for chamado pra atualizar a mao, nao quero que fique as cartas antigas na tela
        const cardContainer = document.createElement('div');
        //cria uma nova div que vai conter as cartas da mão do jogador e é util pra organizar e aplicar os estilos mais facil.
        cardContainer.classList.add('hand-container');
        //add nessa div uma classe.

        cardContainer.style.display = 'flex';
        cardContainer.style.justifyContent = 'center';
        //aqui ja esta aplicando estilo css diretamente na div pra que quando as cartas aparecerem, elas estejam do lado uma da outra (flex) e centralizadas (justifyContent = center).


        //um laco que percorre cada carta na mao do jogador
        this._hand.getCards().forEach(card => {
            //getCard retorna a copia da lista na mao do jogador e o forEach percorre cada carta dessa lista.
            const cardElement = document.createElement('ice-card') as any;
            //cria o elemento ice-card, que é o componente que representa cada carta na tela.
            //esse as any é usado pra ignorar a verificacao de tipo do Ts pra atribuir as props de um elemento que o ts nao reconhece por padrao, no caso, o ice-card.
            cardElement.card = card; 
            //atribui o objeto card(valor e naipe) na prop card do cardComponent, que é o componente que representa a carta na tela.
            cardContainer.appendChild(cardElement);
            //add o ice-card dentro do cardContainer, que é a div que vai conter todas as cartas da mão do jogador.

        });

        this.shadowRoot.appendChild(cardContainer);
        ////pega o cardConteiner (com todas as cartas dentro dele) e coloca na bolha (shadowRoot) do componente HandComponent, ou seja, coloca as cartas na tela.
    }
}
customElements.define('ice-hand', HandComponent);
//registra um novo tipo de elemento html personalizado chamado 'ice-hand', como fosse adicionando uma palavra no dicionário do navegador.
//agora, ao inves de usar div, posso usar <ice-hand> no html e o navegador vai entender que é um componente personalizado que eu criei com a classe HandComponent.
