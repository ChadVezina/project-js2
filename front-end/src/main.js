import "./assets/styles/styles.scss";
import "./main.scss";
import "./components/header.js";
import "./components/footer.js";
import { CubeShopApp } from "./classes/CubeShopApp.js";
import { apiConnectionManager } from "./utils/api-connection-manager.js";

// Initialize API connection manager
apiConnectionManager.init();

new CubeShopApp();
