import "./assets/styles/styles.scss";
import "./main.scss";
import { produits } from "../data/products.js";

const content = document.querySelector(".content");

const displayProduits = () => {
  const productsContainer = document.createElement("div");
  productsContainer.className = "products-container";
  const products = produits.map((produit, index) =>
    createProductElement(produit, index)
  );

  productsContainer.append(...products);
  content.append(productsContainer);
};

const createProductElement = (produit, index) => {
  const a = document.createElement("a");
  a.className = "product card overflow";
  a.innerHTML = `
     <div>
        <div class="overflow">
          <img src="${produit.image}" alt="${produit.nom}">
        </div>
        <h3 class="brand">${produit.maison}</h3>
        <h2 class="title">${produit.nom}</h2>
        <h2 class="price">${produit.prix}$</h2>
  `;
  a.href = `/produit/produit.html?id=${produit.id}`;
  return a;
};

displayProduits();
