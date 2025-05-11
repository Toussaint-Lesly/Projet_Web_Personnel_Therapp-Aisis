document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("form-reservation").addEventListener("submit", function(event) {
        event.preventDefault();

        const cureId = document.getElementById("cure").value;

        if (cureId === "") {
            alert("Veuillez sélectionner une cure avant d'ajouter au panier.");
            return;
        }

        const message = document.getElementById("message-reservation");
        message.innerHTML = "Cure ajoutée au panier avec succès !";

        const hebergementSection = document.getElementById("hebergement-section");
        hebergementSection.style.display = "block";

        setTimeout(function () {
            hebergementSection.style.display = "block";
        }, 500);
    });
});
