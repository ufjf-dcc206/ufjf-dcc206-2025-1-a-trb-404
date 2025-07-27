export class BaseComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `<p>Teste de componente base</p>`;
  }
}

customElements.define("base-component", BaseComponent);
