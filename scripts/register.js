document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#registerForm"); // Correction ici : on sélectionne le bon formulaire
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
        container.innerHTML = ""; 
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
        let telRegExp = /^\+?[0-9]{7,15}$/;
        if (!telRegExp.test(tel)) {
            afficherErreur(container, "Le numéro de téléphone est invalide !");
            return false;
        }
        return true;
    }

    function validerMotDePasse(password, passwordConfirm, container) {
        container.innerHTML = "";
        let passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;
        if (!passwordRegExp.test(password)) {
            afficherErreur(container, "Le mot de passe doit contenir entre 6 et 20 caractères, inclure lettres et chiffres.");
            return false;
        }
        if (password !== passwordConfirm) {
            afficherErreur(container, "Les mots de passe ne correspondent pas.");
            return false;
        }
        return true;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        nomMessage.innerHTML = "";
        prenomMessage.innerHTML = "";
        telMessage.innerHTML = "";
        emailMessage.innerHTML = "";
        passWordMessage.innerHTML = "";

        let valide = true;

        if (!verifierChamp(baliseNom, "Le champ Nom est obligatoire.", nomMessage)) valide = false;
        if (!verifierChamp(balisePrenom, "Le champ Prénom est obligatoire.", prenomMessage)) valide = false;
        if (!verifierChamp(baliseTel, "Le champ Téléphone est obligatoire.", telMessage)) valide = false;
        if (!verifierChamp(baliseEmail, "Le champ Email est obligatoire.", emailMessage)) valide = false;
        if (!verifierChamp(balisePassword, "Le champ Mot de passe est obligatoire.", passWordMessage)) valide = false;
        if (!verifierChamp(balisePasswordConfirm, "Veuillez confirmer votre mot de passe.", passWordMessage)) valide = false;

        if (!validerEmail(baliseEmail.value, emailMessage)) valide = false;
        if (!validerTel(baliseTel.value, telMessage)) valide = false;
        if (!validerMotDePasse(balisePassword.value, balisePasswordConfirm.value, passWordMessage)) valide = false;

        if (valide) {
            let formData = new FormData(form);
            fetch("../backend/register.php", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Inscription réussie !");
                    window.location.href = data.redirect || "../index.html";
                } else {
                    afficherErreur(passWordMessage, data.message || "Erreur lors de l'inscription.");
                }
            })
            .catch(error => {
                console.error("Erreur :", error);
                afficherErreur(passWordMessage, "Une erreur s'est produite.");
            });
        }
    });
});

