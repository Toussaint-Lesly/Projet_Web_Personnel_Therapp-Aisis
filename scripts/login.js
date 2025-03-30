document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const errorMessage = document.createElement("p");
    errorMessage.style.color = "red";
    errorMessage.style.marginTop = "10px";
    errorMessage.style.textAlign = "left";
    form.appendChild(errorMessage);

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Empêcher le rechargement de la page

        const formData = new FormData(form);

        fetch("../backend/login.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = data.redirect; // Redirige vers index.html si connexion réussie
            } else {
                errorMessage.textContent = data.message; // Affiche le message d'erreur sous le formulaire
            }
        })
        .catch(error => console.error("Erreur:", error));
    });
});
