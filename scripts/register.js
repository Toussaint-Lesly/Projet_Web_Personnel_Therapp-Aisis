
document.addEventListener("DOMContentLoaded", function () {
    let form = document.querySelector("form");
    let baliseNom = document.getElementById("name");
    let balisePrenom = document.getElementById("firstname");
    let baliseTel = document.getElementById("tel");
    let baliseEmail = document.getElementById("email");
    let balisePassword = document.getElementById("password");
    let balisePasswordConfirm = document.getElementById("password_confirm");
    let messageDiv = document.getElementById("messages"); // Ajouter un div pour afficher les messages

    function afficherErreur(message) {
        let erreur = document.createElement("p");
        erreur.style.color = "red";
        erreur.textContent = message;
        messageDiv.appendChild(erreur);
    }

    function verifierChamp(balise, message) {
        if (balise.value.trim() === "") {
            afficherErreur(message);
            return false;
        }
        return true;
    }

    function validerEmail(email) {
        let emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegExp.test(email)) {
            afficherErreur("Le format de l'email est incorrect !");
            return false;
        }
        return true;
    }

    function validerTel(tel) {
        let telRegExp = /^\+?[0-9]{7,15}$/; // Accepte les numéros avec ou sans "+"
        if (!telRegExp.test(tel)) {
            afficherErreur("Le numéro de téléphone est invalide !");
            return false;
        }
        return true;
    }

    function validerMotDePasse(password, passwordConfirm) {
        if (password.length < 6) {
            afficherErreur("Le mot de passe doit contenir au moins 6 caractères.");
            return false;
        }
        if (password !== passwordConfirm) {
            afficherErreur("Les mots de passe ne correspondent pas.");
            return false;
        }
        return true;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Empêche le rechargement de la page
        messageDiv.innerHTML = ""; // Efface les messages d'erreur précédents

        let valide = true;

        // Vérification des champs
        valide &= verifierChamp(baliseNom, "Le champ Nom est obligatoire.");
        valide &= verifierChamp(balisePrenom, "Le champ Prénom est obligatoire.");
        valide &= verifierChamp(baliseTel, "Le champ Téléphone est obligatoire.");
        valide &= verifierChamp(baliseEmail, "Le champ Email est obligatoire.");
        valide &= verifierChamp(balisePassword, "Le champ Mot de passe est obligatoire.");
        valide &= verifierChamp(balisePasswordConfirm, "Veuillez confirmer votre mot de passe.");

        // Validation spécifique
        valide &= validerEmail(baliseEmail.value);
        valide &= validerTel(baliseTel.value);
        valide &= validerMotDePasse(balisePassword.value, balisePasswordConfirm.value);

        if (valide) {
            form.submit(); // Envoie le formulaire si tout est valide
        }
    });
});
