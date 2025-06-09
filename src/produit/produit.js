import "../assets/styles/styles.scss";
import "./produit.scss";
import { produits } from "../../data/products.js";

const content = document.querySelector(".content");
console.log(content, produits);

const getProductIdFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
};

const displayProduct = (product) => {
  content.innerHTML = `
     <div class="card p-20 product-container">
          <div class="product">
              <div class="product-image">
                  <img src="${product.image}" alt="${product.nom}" srcset="">
              </div>
              <div class="px-20 product-details">
                  <div class="brand"><h2>${product.maison}</h2></div>
                  <div class="title"><h1>${product.nom}</h1></div>
                  <div class="price"><h3>${product.prix}$ (CAD)</h3></div>
                  <div class="description"><p>${product.description}</p></div>
              </div>
          </div>
      </div>
  `;
};

// Usage when the product page loads
window.addEventListener("DOMContentLoaded", () => {
  const productId = getProductIdFromUrl();
  const produit = produits.find((produit) => produit.id == productId);

  if (produit) {
    displayProduct(produit);
  } else {
    window.location.href = "/";
  }
});
