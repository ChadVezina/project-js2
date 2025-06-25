import "../../assets/styles/styles.scss";
import "./auth.scss";
import { PageInitializer } from "../../utils/page-initializer.js";
import { AuthManager } from "../../classes/AuthManager.js";
import "../../components/header.js";
import "../../components/footer.js";

PageInitializer.initializePage(AuthManager, { deferInit: true });
