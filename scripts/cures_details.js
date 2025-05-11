
document.addEventListener("DOMContentLoaded", function () {
    console.log("Script chargé : gestion des cures");

    let toggleBtn = document.getElementById("toggleCuresBtn");
    let hideBtn = document.getElementById("hideCuresBtn"); // Nouveau bouton
    let curesContainer = document.getElementById("allCuresContainer");

    if (toggleBtn && curesContainer) {
        curesContainer.style.display = "none"; // Masquer au chargement

        toggleBtn.addEventListener("click", function () {
            console.log("Bouton cliqué !");
            if (curesContainer.style.display === "none") {
                curesContainer.style.display = "block"; // Afficher
                toggleBtn.textContent = "Masquer les details >>";
            } else {
                curesContainer.style.display = "none"; // Cacher
                toggleBtn.textContent = "Voir les details des autres cures >>";
            }
        });

        // Gestion du bouton "Masquer les cures" à l'intérieur du conteneur
        if (hideBtn) {
            hideBtn.addEventListener("click", function () {
                curesContainer.style.display = "none"; // Cacher
                toggleBtn.textContent = "Voir les details des autres cures >>"; // Réinitialiser le texte du bouton du haut
            });
        }
    } else {
        console.error("Bouton ou conteneur introuvable !");
    }
});