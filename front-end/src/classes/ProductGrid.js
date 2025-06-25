export class ProductGrid {
    constructor(container) {
        this.container = container;
        this.productsContainer = this.createProductsContainer();
        this.products = [];
    }

    createProductsContainer() {
        const container = document.createElement("div");
        container.className = "products-container";
        this.container.appendChild(container);
        return container;
    }

    render(products) {
        this.clear();
        this.addProducts(products);
    }

    addProducts(products) {
        products.forEach((product) => {
            const productElement = this.createProductElement(product);
            this.productsContainer.appendChild(productElement);
            this.products.push(product);
        });
    }

    createProductElement(product) {
        const productEl = document.createElement("a");
        productEl.className = "product block";
        productEl.href = `./pages/produit/produit.html?id=${product.id}`;
        productEl.innerHTML = `
            <div class="overflow">
                <div class="img-container" 
                style="background-image: url(${product.image}); height: 300px; background-size: cover; background-position: center;">
                </div>
            </div>
            <h3 class="brand">${product.marque}</h3>
            <h2 class="name">${product.nom}</h2>
            <h2 class="price">${product.prix} $</h2>
        `;
        return productEl;
    }

    clear() {
        this.productsContainer.innerHTML = "";
        this.products = [];
    }

    getProductCount() {
        return this.products.length;
    }
}
