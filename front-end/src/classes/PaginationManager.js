import { EventEmitter } from "../utils/event-emitter.js";

export class PaginationManager extends EventEmitter {
    constructor(container) {
        super();
        this.container = container;
        this.paginationContainer = null;
        this.currentCount = 0;
        this.totalCount = 0;
        this.init();
    }

    init() {
        this.createPaginationUI();
        this.bindEvents();
    }

    createPaginationUI() {
        this.paginationContainer = document.createElement("div");
        this.paginationContainer.className = "pagination-container";

        const loadMoreBtn = document.createElement("button");
        loadMoreBtn.className = "btn-more load-more-btn";
        loadMoreBtn.textContent = "Afficher Plus";

        this.paginationContainer.appendChild(loadMoreBtn);
        this.container.appendChild(this.paginationContainer);
    }

    bindEvents() {
        const loadMoreBtn = this.paginationContainer.querySelector(".load-more-btn");
        loadMoreBtn.addEventListener("click", () => {
            this.emit("loadMore");
        });
    }

    updateState(currentCount, totalCount) {
        this.currentCount = currentCount;
        this.totalCount = totalCount;
        this.updateVisibility();
    }

    updateVisibility() {
        const loadMoreBtn = this.paginationContainer.querySelector(".load-more-btn");
        loadMoreBtn.style.display = this.currentCount < this.totalCount ? "block" : "none";
    }
}
