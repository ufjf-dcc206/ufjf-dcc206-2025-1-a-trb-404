import "./styles/main.css";
import "./components/BaseComponent";

const app = document.querySelector<HTMLDivElement>("#app");

if (app) {
  app.innerHTML = `
    <h1>ICElatro</h1>
    <base-component></base-component>
  `;
}
