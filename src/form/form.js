import "../assets/styles/styles.scss";
import "./form.scss";

const form = document.querySelector("form");
const errorElement = document.querySelector("#errors");
let errors = [];

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const article = Object.fromEntries(formData.entries());
  if (formIsValid(article)) {
    const json = JSON.stringify(article);
    // Nous ferons la requête ici !
    // Nous créerons un serveur node, et écrirons sur un fichier local
  }
});

function validatePrice(priceString) {
  // Test if it's a valid number
  if (!priceString) {
    return "Le prix est obligatoire !";
  }

  // Check if it's a valid number format
  if (!/^\d*\.?\d+$/.test(priceString)) {
    return "Le format du prix est invalide !";
  }

  // Convert to number
  const price = parseFloat(priceString);

  // Check if positive
  if (price <= 0) {
    return "Le prix doit être supérieur à 0";
  }

  // Check if not too large
  if (price > 1000000) {
    return "Le prix est trop haut !";
  }

  // Check decimal places
  if (priceString.split(".")[1]?.length > 2) {
    return "Mettez deux décimales après le . svp!";
  }

  return true;
}

const formIsValid = (article) => {
  errors = [];
  if (
    !article.nom ||
    !article.maison ||
    !article.prix ||
    !article.image ||
    !article.description
  ) {
    errors.push("Vous devez renseigner tous les champs");
  }

  if (article.description && article.description.length < 20) {
    errors.push("Le contenu de votre article est trop court !");
  }

  let mauvaisPrix = validatePrice(article.prix);
  if (article.prix && mauvaisPrix !== true) {
    errors.push(mauvaisPrix);
  }

  if (errors.length) {
    let errorHTML = "";
    errors.forEach((e) => {
      errorHTML += `<li>${e}</li>`;
    });
    errorElement.innerHTML = errorHTML;
    return false;
  } else {
    errorElement.innerHTML = "";
    return true;
  }
};
