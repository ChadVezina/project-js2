class AppFooter extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `<footer>© CubeShop - Your Speedcubing Store</footer>`;
    }
}

customElements.define("app-footer", AppFooter);