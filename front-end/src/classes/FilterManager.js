import { EventEmitter } from "../utils/event-emitter.js";

export class FilterManager extends EventEmitter {
    constructor(container) {
        super();
        this.container = container;
        this.filterContainer = null;
        this.currentBrand = null;
        this.brands = [];
        this.init();
    }

    init() {
        this.createFilterUI();
        this.bindEvents();
    }

    createFilterUI() {
        // Create filter wrapper
        const filterWrapper = document.createElement("div");
        filterWrapper.className = "filter-wrapper";
        filterWrapper.style.position = "relative";
        filterWrapper.style.display = "inline-block";

        const filterBtn = document.createElement("button");
        filterBtn.className = "btn btn-filter filter-btn";
        filterBtn.textContent = "Filtrer par marque";

        const dropdown = document.createElement("div");
        dropdown.className = "filter-dropdown";
        dropdown.style.display = "none";

        const refreshBtn = document.createElement("button");
        refreshBtn.className = "btn btn-filter refresh-btn";
        refreshBtn.textContent = "Actualiser";
        refreshBtn.style.marginLeft = "1rem";

        filterWrapper.appendChild(filterBtn);
        filterWrapper.appendChild(dropdown);

        // Add both filter and refresh buttons to container
        this.container.appendChild(filterWrapper);
        this.container.appendChild(refreshBtn);

        // Store references
        this.filterContainer = this.container;
    }

    bindEvents() {
        const filterBtn = this.filterContainer.querySelector(".filter-btn");
        const refreshBtn = this.filterContainer.querySelector(".refresh-btn");
        const dropdown = this.filterContainer.querySelector(".filter-dropdown");

        filterBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            this.toggleDropdown();
        });

        refreshBtn.addEventListener("click", () => {
            this.emit("refresh");
        });

        document.addEventListener("click", (e) => {
            if (!this.filterContainer.contains(e.target)) {
                this.hideDropdown();
            }
        });
    }

    updateBrands(products) {
        this.brands = [...new Set(products.map((product) => product.marque))].sort();
        this.renderDropdown();
    }

    renderDropdown() {
        const dropdown = this.filterContainer.querySelector(".filter-dropdown");
        dropdown.innerHTML = "";

        // Add "All brands" option
        const allOption = document.createElement("button");
        allOption.className = "filter-option";
        allOption.textContent = "Toutes les marques";
        allOption.addEventListener("click", () => {
            this.selectBrand(null);
        });
        dropdown.appendChild(allOption);

        // Add brand options
        this.brands.forEach((brand) => {
            const option = document.createElement("button");
            option.className = "filter-option";
            option.textContent = brand;
            option.addEventListener("click", () => {
                this.selectBrand(brand);
            });
            dropdown.appendChild(option);
        });
    }

    selectBrand(brand) {
        this.currentBrand = brand;
        const filterBtn = this.filterContainer.querySelector(".filter-btn");
        filterBtn.textContent = brand ? `Marque: ${brand}` : "Filtrer par marque";
        this.hideDropdown();
        this.emit("filterChange", { brand });
    }

    toggleDropdown() {
        const dropdown = this.filterContainer.querySelector(".filter-dropdown");
        const isVisible = dropdown.style.display !== "none";
        dropdown.style.display = isVisible ? "none" : "block";
    }

    hideDropdown() {
        const dropdown = this.filterContainer.querySelector(".filter-dropdown");
        dropdown.style.display = "none";
    }
}
