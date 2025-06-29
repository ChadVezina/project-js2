import "../../assets/styles/styles.scss";
import "./form.scss";
import { PageInitializer } from "../../utils/page-initializer.js";
import { FormManager } from "../../classes/FormManager.js";
import "../../components/header.js";
import "../../components/footer.js";

PageInitializer.initializePage(FormManager);