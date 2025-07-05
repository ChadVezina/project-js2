export class PageInitializer {
    static async initializePage(PageClass, options = {}) {
        try {
            // Ensure DOM is ready before proceeding
            await this.waitForDOM();
            
            // Add longer delay to ensure all elements are rendered
            await new Promise(resolve => setTimeout(resolve, 150));

            const page = new PageClass(options);

            if (page.init && typeof page.init === "function") {
                await page.init();
            }

            return page;
        } catch (error) {
            console.error("Failed to initialize page:", error);
            throw error;
        }
    }

    static waitForDOM() {
        return new Promise((resolve) => {
            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", resolve, { once: true });
            } else {
                resolve();
            }
        });
    }

    static async loadPage(pageName, options = {}) {
        try {
            const module = await import(`../${pageName}/${pageName}.js`);
            const PageClass = Object.values(module)[0]; // Get the first exported class
            return await this.initializePage(PageClass, options);
        } catch (error) {
            console.error(`Failed to load page: ${pageName}`, error);
            throw error;
        }
    }
}
