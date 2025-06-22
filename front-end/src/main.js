import "./assets/styles/styles.scss";
import "./main.scss";
import { produits } from "../data/products.js";

const contentDiv = document.querySelector(".content");

const productsContainer = document.createElement("div");
productsContainer.className = "products-container";

const productsPerPage = 6;

let currentIndex = 0;
let buttonContainer = null;

function displayProducts(startIndex, count) {
    const endIndex = Math.min(startIndex + count, produits.length);

    for (let i = startIndex; i < endIndex; i++) {
        const product = produits[i];
        const productEl = document.createElement("a");
        productEl.className = "product block";
        productEl.href = `./produit/produit.html?id=${product.id}`;
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
        productsContainer.appendChild(productEl);
    }
    currentIndex = endIndex;

    updateButtons();
}

function createButtonContainer() {
    if (buttonContainer) return buttonContainer;

    buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";

    // Create filter button
    const filterBtn = document.createElement("button");
    filterBtn.className = "btn-filter";
    filterBtn.innerText = "Filtrer par marque";

    filterBtn.addEventListener("click", () => {
        // TODO: Implement filter functionality
        console.log("Filter button clicked");
        // You can add filter logic here
    });

    // Create load more button
    const loadMoreBtn = document.createElement("button");
    loadMoreBtn.className = "btn-more";
    loadMoreBtn.innerText = "Afficher Plus";

    loadMoreBtn.addEventListener("click", () => {
        displayProducts(currentIndex, productsPerPage);
    });

    buttonContainer.appendChild(filterBtn);
    buttonContainer.appendChild(loadMoreBtn);
    contentDiv.appendChild(buttonContainer);

    return buttonContainer;
}

function updateButtons() {
    if (!buttonContainer) {
        createButtonContainer();
    }

    const loadMoreBtn = buttonContainer.querySelector(".btn-more");

    if (currentIndex < produits.length) {
        loadMoreBtn.style.display = "block";
    } else {
        loadMoreBtn.style.display = "none";
    }
}

displayProducts(0, productsPerPage);
contentDiv.appendChild(productsContainer);
