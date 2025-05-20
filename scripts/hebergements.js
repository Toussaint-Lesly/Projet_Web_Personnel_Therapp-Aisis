document.addEventListener("DOMContentLoaded", function () {
    console.log("Script chargé : gestion des hebergements");

    function slugify(text) {
        return text.toString().toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // enlève les accents
            .replace(/[^a-z0-9]+/g, '-') // remplace tout sauf lettres/chiffres par tirets
            .replace(/^-+|-+$/g, ''); // supprime les tirets au début/fin
    }

    fetch("../backend/hebergements.php")
        .then(response => response.json())
        .then(data => {
            const chambresContainer = document.getElementById("container-chambres-classiques");
            const chambresContainerConfort = document.getElementById("container-chambres-confort");
            const suiteContainer = document.getElementById("container-suite");
            const vuesContainer = document.getElementById("vue_list");

            let vuesCarousel = "";

            // Buffers pour stocker les cartes par type
            let standardCards = [];
            let confortCards = [];

            data.hebergements.forEach(h => {
                const slug = slugify(h.type); 
                const chambreId = slug;
                const suiteId = slug;
                const typeLower = h.type.toLowerCase();
                    //j'ai change chambre_card en card
                const cardHTML = `
                    <div id="${chambreId}" class="col-6 mt-4 mb-4 d-flex align-items-stretch">
                        <div class="card chambre_card" style="width: 100%;">
                            <img src="${h.imageH}" class="card-img-top" alt="image de chambre" style="height: 350px; object-fit: cover;">
                            <div class="card-body text-center">
                                <h5 class="card-title extra">${h.type}</h5>
                                <p class="card-text">À partir de <strong>${parseFloat(h.prixH).toFixed(2)} €</strong></p>
                            </div>
                        </div>
                    </div>`;
    
                if (typeLower.includes("suite")) {
                    // La suite : affichage en ligne spéciale
                     //j'ai change suite_card en card
                    const suiteRow = `
                        <div id="${suiteId}" class="row align-items-center my-5">
                            <div class="col-12 col-md-7">
                                <div class="card mb-4">
                                    <img src="${h.imageH}" class="card-img-top" alt="${h.type}" style="height: 350px; object-fit: cover;">
                                    <div class="card-body text-center">
                                        <h5 class="card-title">${h.type}</h5>
                                        <p class="card-text">Prix : <strong>${parseFloat(h.prixH).toFixed(2)} €</strong></p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-5 mt-5 truc mb-4">
                                <p>
                                    Notre suite allie élégance et confort pour un séjour d’exception. Spacieuse et raffinée, elle comprend un espace salon, 
                                    une chambre luxueuse et une salle de bain moderne. Profitez d’une vue imprenable et de services haut de gamme pour une expérience inoubliable.
                                </p>
                            </div>
                        </div>`;
                    suiteContainer.innerHTML = suiteRow;
                } else if (typeLower.includes("standard")) {
                    standardCards.push(cardHTML);
                } else if (typeLower.includes("confort")) {
                    confortCards.push(cardHTML);
                }
            });

            // Fonction pour grouper les cartes 2 par 2 dans des lignes
            const afficherParLigne = (container, cards) => {
                for (let i = 0; i < cards.length; i += 2) {
                    const row = document.createElement("div");
                    row.classList.add("row");
                    row.innerHTML = cards[i];
                    if (i + 1 < cards.length) {
                        row.innerHTML += cards[i + 1];
                    }
                    container.appendChild(row);
                }
            };

            afficherParLigne(chambresContainer, standardCards);
            afficherParLigne(chambresContainerConfort, confortCards);

                // Rediriger vers l’ancre si présente dans l’URL après le chargement dynamique
            const hash = window.location.hash;
            if (hash) {
                setTimeout(() => {
                    const target = document.querySelector(hash);
                    if (target) {
                        target.scrollIntoView({ behavior: "smooth" });
                    }
                }, 300); // Attente pour s'assurer que le DOM est bien chargé
            }


            // Carrousel des vues
            if (data.vues && data.vues.length > 0) {
                const vuesUniques = [];
                const titresAjoutes = new Set();

                for (const vue of data.vues) {
                    if (!titresAjoutes.has(vue.vue)) {
                        vuesUniques.push(vue);
                        titresAjoutes.add(vue.vue);
                    }
                    if (vuesUniques.length === 4) break;
                }

                vuesCarousel += `
                    <div id="carousel-vues" class="carousel slide mt-4" data-bs-ride="carousel">
                        <div class="carousel-inner">`;

                vuesUniques.forEach((vue, index) => {
                    vuesCarousel += `
                        <div class="carousel-item ${index === 0 ? 'active' : ''}">
                            <img src="${vue.image}" class="d-block w-100" alt="${vue.vue}" style="height: 600px; object-fit: cover;">
                            <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded-3">
                                <h5>${vue.vue}</h5>
                                <p>Supplément : ${parseFloat(vue.supplement).toFixed(2)} €</p>
                            </div>
                        </div>`;
                });

                vuesCarousel += `
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carousel-vues" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon"></span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carousel-vues" data-bs-slide="next">
                            <span class="carousel-control-next-icon"></span>
                        </button>
                    </div>`;

                vuesContainer.innerHTML = vuesCarousel;
            }
        })
        .catch(error => {
            console.error("Erreur lors du chargement des hébergements :", error);
        });
});
