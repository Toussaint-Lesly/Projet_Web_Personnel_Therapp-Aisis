document.addEventListener("DOMContentLoaded", function () {
    let form = document.querySelector("form");
    let baliseNom = document.getElementById("name");
    let balisePrenom = document.getElementById("firstname");
    let baliseTel = document.getElementById("tel");
    let baliseEmail = document.getElementById("email");
    let balisePassword = document.getElementById("password");
    let balisePasswordConfirm = document.getElementById("password_confirm");

    let nomMessage = document.getElementById("nomMessages"); 
    let prenomMessage = document.getElementById("prenomMessages"); 
    let telMessage = document.getElementById("telMessages"); 
    let emailMessage = document.getElementById("emailMessages"); 
    let passWordMessage = document.getElementById("passWordMessages"); 

    function afficherErreur(container, message) {
        container.innerHTML = ""; // Nettoie les messages précédents
        let erreur = document.createElement("p");
        erreur.style.color = "red";
        erreur.textContent = message;
        container.appendChild(erreur);
    }

    function verifierChamp(balise, message, container) {
        if (balise.value.trim() === "") {
            afficherErreur(container, message);
            return false;
        }
        return true;
    }

    function validerEmail(email, container) {
        let emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegExp.test(email)) {
            afficherErreur(container, "Le format de l'email est incorrect !");
            return false;
        }
        return true;
    }

    function validerTel(tel, container) {
        let telRegExp = /^\+?[0-9]{7,15}$/; // Accepte les numéros avec ou sans "+"
        if (!telRegExp.test(tel)) {
            afficherErreur(container, "Le numéro de téléphone est invalide !");
            return false;
        }
        return true;
    }

    function validerMotDePasse(password, passwordConfirm, container) {
        container.innerHTML = ""; // Nettoie les messages précédents
        if (password.length < 6) {
            afficherErreur(container, "Le mot de passe doit contenir au moins 6 caractères.");
            return false;
        }
        if (password !== passwordConfirm) {
            afficherErreur(container, "Les mots de passe ne correspondent pas.");
            return false;
        }
        return true;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Empêche le rechargement de la page

        // Efface tous les anciens messages d'erreur
        nomMessage.innerHTML = "";
        prenomMessage.innerHTML = "";
        telMessage.innerHTML = "";
        emailMessage.innerHTML = "";
        passWordMessage.innerHTML = "";

        let valide = true;

        // Vérification des champs
        if (!verifierChamp(baliseNom, "Le champ Nom est obligatoire.", nomMessage)) valide = false;
        if (!verifierChamp(balisePrenom, "Le champ Prénom est obligatoire.", prenomMessage)) valide = false;
        if (!verifierChamp(baliseTel, "Le champ Téléphone est obligatoire.", telMessage)) valide = false;
        if (!verifierChamp(baliseEmail, "Le champ Email est obligatoire.", emailMessage)) valide = false;
        if (!verifierChamp(balisePassword, "Le champ Mot de passe est obligatoire.", passWordMessage)) valide = false;
        if (!verifierChamp(balisePasswordConfirm, "Veuillez confirmer votre mot de passe.", passWordMessage)) valide = false;

        // Validation spécifique
        if (!validerEmail(baliseEmail.value, emailMessage)) valide = false;
        if (!validerTel(baliseTel.value, telMessage)) valide = false;
        if (!validerMotDePasse(balisePassword.value, balisePasswordConfirm.value, passWordMessage)) valide = false;

        if (valide) {
            form.submit(); // Envoie le formulaire si tout est valide
        }
    });
});
