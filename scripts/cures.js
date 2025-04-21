document.addEventListener("DOMContentLoaded", function () {
    console.log("Script chargé : gestion des cures");

    

    // Récupération des réservations via AJAX
    fetch('../backend/afficher_dans_panier.php')
        .then(res => {
            if (!res.ok) {
                throw new Error('Erreur lors de la récupération des données');
            }
            return res.json();
        })
        .then(data => {
            const cartCardsContainer = document.getElementById('cart-cards');
            let totalPrix = 0;

            data.forEach(res => {
                const carte = document.createElement('div');
                carte.classList.add('col-md-4', 'mb-4');
                carte.id = `carte-${res.id_reservation}`;
                    //j'ai change reservation-card en card
                carte.innerHTML = `
                    <div class="card shadow" style="height: 100%;"> 
                        <div class="card-body">
                            <h5 class="card-title">${res.nom_sous_type}</h5>
                            <img class = "card-img-top" src="${res.image ?? '../images/default.png'}" class="img-fluid mb-2 rounded">
                            <p><strong>Dates :</strong> du ${res.date_arrivee} au ${res.date_depart}</p>
                            <p><strong>Type de chambre :</strong> ${res.type_chambre} (${res.vue})</p>
                            <p><strong>Total :</strong> <span class="prix-item">${parseFloat(res.prix_total).toFixed(2)}</span> €</p>
                            <div class="mt-auto d-flex gap-2">
                                <button class="btn btn-danger btn-supprimer w-100" data-id="${res.id_reservation}">🗑 Supprimer</button>
                            </div>
                        </div>
                    </div>
                `;
                cartCardsContainer.appendChild(carte);

                // Mettre à jour le total des prix
                totalPrix += parseFloat(res.prix_total);
            });

            // Mettre à jour le total global dans la page
            const totalElem = document.getElementById('total-global');
            totalElem.textContent = totalPrix.toFixed(2).replace('.', ',');

            // Mettre à jour le nombre d'articles dans le panier
            const totalArticles = data.length;
            const panierCountElem = document.getElementById('panier-count');
            panierCountElem.textContent = totalArticles;


           
            // 💡 Rattacher les événements de suppression APRÈS avoir généré les cartes
            document.querySelectorAll('.btn-supprimer').forEach(btn => {
                btn.addEventListener('click', function () {
                    const id = this.dataset.id;
                    if (!confirm("Voulez-vous vraiment supprimer cette réservation ?")) return;

                    fetch('../backend/supprimer_reservation.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: new URLSearchParams({
                            supprimer: true,
                            id: id
                        })
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.success) {
                                const carte = document.getElementById(`carte-${id}`);
                                if (carte) {
                                    const prix = parseFloat(carte.querySelector('.prix-item').textContent.replace(',', '.'));
                                    carte.remove();

                                    // Mettre à jour compteur
                                    const countElem = document.getElementById('panier-count');
                                    const newCount = parseInt(countElem.textContent) - 1;
                                    countElem.textContent = newCount;

                                    // Mettre à jour le total global
                                    const totalElem = document.getElementById('total-global');
                                    const total = parseFloat(totalElem.textContent.replace(',', '.'));
                                    totalElem.textContent = (total - prix).toFixed(2).replace('.', ',');
                                }
                            } else {
                                alert("Erreur lors de la suppression.");
                            }
                        });
                });
            });

        })
        .catch(error => {
            console.error('Erreur:', error);
        });
});

