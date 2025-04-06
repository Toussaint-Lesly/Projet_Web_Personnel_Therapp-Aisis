
document.addEventListener("DOMContentLoaded", function () {
    let form = document.querySelector("#loginForm");
    let baliseEmail = document.getElementById("email");
    let balisePassword = document.getElementById("password");
    
    let emailMessage = document.getElementById("emailMessages"); 
    let passWordMessage = document.getElementById("passWordMessages"); 

    function afficherErreur(container, message) {
        container.innerHTML = ""; // Nettoie les anciens messages
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
            afficherErreur(container, "L'adresse email n'est pas valide.");
            return false;
        }
        return true;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Empêche la validation automatique du navigateur

        // Efface les anciens messages d'erreur
        emailMessage.innerHTML = "";
        passWordMessage.innerHTML = "";

        let valide = true;

        if (!verifierChamp(baliseEmail, "Le champ Email est obligatoire.", emailMessage)) valide = false;
        if (!verifierChamp(balisePassword, "Le champ Mot de passe est obligatoire.", passWordMessage)) valide = false;
        if (!validerEmail(baliseEmail.value, emailMessage)) valide = false;

        if (valide) {
            let formData = new FormData();
            formData.append("email", baliseEmail.value);
            formData.append("password", balisePassword.value);

            fetch("../backend/login.php", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = data.redirect;
                } else {
                    afficherErreur(passWordMessage, data.message);
                }
            })
            .catch(error => console.error("Erreur lors de la connexion :", error));
        }
    });
});

