document.addEventListener("DOMContentLoaded", function () {
    const panierCountElem = document.getElementById('panier-count');

    if (!panierCountElem) {
        console.log("Élément #panier-count introuvable sur la page.");
        return;
    }

    console.log("Tentative de récupération du nombre d'articles dans le panier...");

    fetch('backend/compter_reservation.php') // ← ajuste le chemin si besoin
        .then(res => {
            console.log("Réponse reçue du serveur:", res);
            if (!res.ok) throw new Error("Erreur réseau lors de la récupération.");
            return res.json();
        })
        .then(data => {
            console.log("Données JSON reçues:", data);

            if (typeof data.count !== 'undefined') {
                panierCountElem.textContent = data.count;
                panierCountElem.style.display = data.count > 0 ? "inline-block" : "none";
                console.log("Compteur mis à jour avec :", data.count);
            } else {
                console.warn("Le champ 'count' est manquant dans la réponse JSON.");
            }
        })
        .catch(err => {
            console.error("Erreur MAJ compteur panier:", err);
        });
});
