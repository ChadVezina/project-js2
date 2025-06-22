import "./assets/styles/styles.scss";
import "./main.scss";
import { ProductsManager } from "./utils/products-manager.js";
import "./components/app-header.js";
import "./components/app-footer.js";

const contentDiv = document.querySelector(".content");
const productsContainer = document.createElement("div");
productsContainer.className = "products-container";

const productsPerPage = 6;
let currentIndex = 0;
let buttonContainer = null;
let allProducts = ProductsManager.getAllProducts();
let filteredProducts = [...allProducts]; // Track filtered products
let currentBrand = null; // Track current filter

function displayProducts(startIndex, count) {
    const endIndex = Math.min(startIndex + count, filteredProducts.length);

    for (let i = startIndex; i < endIndex; i++) {
        const product = filteredProducts[i];
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

function createBrandFilter() {
    // Get unique brands from all products
    const brands = [...new Set(allProducts.map((product) => product.marque))].sort();

    // Create filter dropdown
    const filterDropdown = document.createElement("div");
    filterDropdown.className = "filter-dropdown";
    filterDropdown.style.display = "none";

    // Add "Toutes les marques" option
    const allBrandsOption = document.createElement("button");
    allBrandsOption.className = "filter-option";
    allBrandsOption.textContent = "Toutes les marques";
    allBrandsOption.addEventListener("click", () => {
        filterByBrand(null);
        hideFilterDropdown();
    });
    filterDropdown.appendChild(allBrandsOption);

    // Add brand options
    brands.forEach((brand) => {
        const option = document.createElement("button");
        option.className = "filter-option";
        option.textContent = brand;
        option.addEventListener("click", () => {
            filterByBrand(brand);
            hideFilterDropdown();
        });
        filterDropdown.appendChild(option);
    });

    return filterDropdown;
}

function filterByBrand(brand) {
    currentBrand = brand;

    if (brand) {
        filteredProducts = allProducts.filter((product) => product.marque === brand);
    } else {
        filteredProducts = [...allProducts];
    }

    // Reset display
    productsContainer.innerHTML = "";
    currentIndex = 0;
    displayProducts(0, productsPerPage);

    // Update filter button text
    const filterBtn = buttonContainer.querySelector(".btn-filter");
    filterBtn.textContent = brand ? `Marque: ${brand}` : "Filtrer par marque";

    console.log(`Filtered by brand: ${brand || "All"}. Products found: ${filteredProducts.length}`);
}

function showFilterDropdown() {
    const dropdown = buttonContainer.querySelector(".filter-dropdown");
    dropdown.style.display = "block";

    // Position the dropdown relative to its parent instead of viewport
    dropdown.style.position = "absolute";
    dropdown.style.top = "100%"; // Position right below the button
    dropdown.style.left = "0";
    dropdown.style.zIndex = "1000";
}

function hideFilterDropdown() {
    const dropdown = buttonContainer.querySelector(".filter-dropdown");
    dropdown.style.display = "none";
}

function createButtonContainer() {
    if (buttonContainer) return buttonContainer;

    buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";
    buttonContainer.style.position = "relative"; // For dropdown positioning

    // Create filter button
    const filterBtn = document.createElement("button");
    filterBtn.className = "btn-filter";
    filterBtn.innerText = "Filtrer par marque";
    filterBtn.style.position = "relative"; // Make button a positioning context

    filterBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const dropdown = buttonContainer.querySelector(".filter-dropdown");
        if (dropdown.style.display === "none") {
            showFilterDropdown();
        } else {
            hideFilterDropdown();
        }
    });

    // Create filter dropdown
    const filterDropdown = createBrandFilter();

    // Create load more button
    const loadMoreBtn = document.createElement("button");
    loadMoreBtn.className = "btn-more";
    loadMoreBtn.innerText = "Afficher Plus";

    loadMoreBtn.addEventListener("click", () => {
        displayProducts(currentIndex, productsPerPage);
    });

    // Create refresh button to reload products from localStorage
    const refreshBtn = document.createElement("button");
    refreshBtn.className = "btn-filter";
    refreshBtn.innerText = "Actualiser";
    refreshBtn.style.marginLeft = "1rem";

    refreshBtn.addEventListener("click", () => {
        refreshProducts();
    });

    // Create a wrapper for the filter button and dropdown
    const filterWrapper = document.createElement("div");
    filterWrapper.style.position = "relative";
    filterWrapper.style.display = "inline-block";

    filterWrapper.appendChild(filterBtn);
    filterWrapper.appendChild(filterDropdown);

    buttonContainer.appendChild(filterWrapper);
    buttonContainer.appendChild(loadMoreBtn);
    buttonContainer.appendChild(refreshBtn);
    contentDiv.appendChild(buttonContainer);

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
        if (!filterWrapper.contains(e.target)) {
            hideFilterDropdown();
        }
    });

    return buttonContainer;
}

function updateButtons() {
    if (!buttonContainer) {
        createButtonContainer();
    }

    const loadMoreBtn = buttonContainer.querySelector(".btn-more");

    if (currentIndex < filteredProducts.length) {
        loadMoreBtn.style.display = "block";
    } else {
        loadMoreBtn.style.display = "none";
    }
}

function refreshProducts() {
    allProducts = ProductsManager.getAllProducts();

    // Reapply current filter if any
    if (currentBrand) {
        filteredProducts = allProducts.filter((product) => product.marque === currentBrand);
    } else {
        filteredProducts = [...allProducts];
    }

    productsContainer.innerHTML = "";
    currentIndex = 0;
    displayProducts(0, productsPerPage);

    // Recreate filter dropdown with updated brands
    const oldDropdown = buttonContainer.querySelector(".filter-dropdown");
    if (oldDropdown) {
        oldDropdown.remove();
        const newDropdown = createBrandFilter();
        buttonContainer.insertBefore(newDropdown, buttonContainer.children[1]);
    }

    console.log("Products refreshed. Total:", allProducts.length, "Filtered:", filteredProducts.length);
}

displayProducts(0, productsPerPage);
contentDiv.appendChild(productsContainer);
