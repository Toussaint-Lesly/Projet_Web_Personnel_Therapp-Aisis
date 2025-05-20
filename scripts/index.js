
document.addEventListener("DOMContentLoaded", async function () {
    // Badge panier
    const panierCountElem = document.getElementById('panier-count');
    if (!panierCountElem) {
        console.log("Élément #panier-count introuvable sur la page.");
        return;
    }

    function updateCartBadge() {
        console.log("Tentative de récupération du nombre d'articles dans le panier...");
        fetch('backend/compter_reservation.php', { credentials: 'include' })
            .then(res => {
                if (!res.ok) throw new Error("Erreur réseau lors de la récupération.");
                return res.json();
            })
            .then(data => {
                if (typeof data.count !== 'undefined') {
                    panierCountElem.textContent = data.count;
                    panierCountElem.style.display = data.count > 0 ? "inline-block" : "none";
                }
            })
            .catch(err => {
                console.error("Erreur MAJ compteur panier:", err);
            });
    }

    updateCartBadge();
    setInterval(updateCartBadge, 60 * 1000); // actualisation chaque minute

    // Gestion de la popup de connexion

    const icone = document.getElementById("iconeConnexion");
    const popup = document.getElementById("popupConnexion");
    const closeBtn = document.getElementById("closeConnexion");

if (icone && popup) {
    let isMobile = window.matchMedia("(hover: none)").matches;

    // CAS MOBILE — toggle au clic
    if (isMobile) {
        icone.addEventListener("click", (e) => {
            e.stopPropagation();
            popup.style.display = popup.style.display === "block" ? "none" : "block";
        });

        // Fermer au clic ailleurs
        document.addEventListener("click", function (event) {
            if (!popup.contains(event.target) && !icone.contains(event.target)) {
                popup.style.display = "none";
            }
        });
    }

    // CAS DESKTOP — apparition au survol
    else {
        let popupTimeout;

        icone.addEventListener("mouseenter", () => {
            clearTimeout(popupTimeout);
            popup.style.display = "block";
        });

        popup.addEventListener("mouseenter", () => {
            clearTimeout(popupTimeout);
        });

        icone.addEventListener("mouseleave", () => {
            popupTimeout = setTimeout(() => {
                popup.style.display = "none";
            }, 300);
        });

        popup.addEventListener("mouseleave", () => {
            popupTimeout = setTimeout(() => {
                popup.style.display = "none";
            }, 300);
        });
    }

    // Bouton X pour fermer (commun aux deux)
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            popup.style.display = "none";
        });
    }
}


    // Vérification utilisateur connecté
    fetch('backend/user_connexion.php', { credentials: 'include' })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'connected') {
                const popupHeader = popup.querySelector('.popup-header');
                popupHeader.innerHTML = `
                    <div style="font-size: 0.90rem;"> 
                        Bienvenue <strong>${data.username}</strong>, votre moment de détente commence ici. Ressentez l’harmonie dès maintenant !
                    </div>
                `;

                const p = popupHeader.querySelector('p');
                if (p) p.remove();

                const btn = popup.querySelector('.btn-connexion');
                if (btn) btn.remove();

                const ul = popup.querySelector('.popup-links');
                ul.insertAdjacentHTML('beforeend', `
                    <li>
                        <a href="backend/logout.php" id="logout-link" style="text-decoration: none; color: #333333">
                            <i class="bi bi-box-arrow-right" style="font-size: 1.4em;"></i> Se déconnecter
                        </a>
                    </li>
                `);

                const texteConnexion = document.getElementById('texteConnexion');
                if (texteConnexion) {
                    texteConnexion.textContent = `Bonjour ${data.username} !`;
                }
            }
        })
        .catch(err => console.error('Impossible de récupérer l’utilisateur :', err));

    // Favoris
    try {
        const res = await fetch('backend/get_favoris.php', { credentials: 'include' });
        const data = res.ok ? await res.json() : [];
        const favorisIds = data.reduce((ids, cure) => {
            cure.options.forEach(opt => {
                if (!ids.includes(opt.id_cure)) ids.push(opt.id_cure);
            });
            return ids;
        }, []);

        const navHeart = document.querySelector('#navbar-heart');
        if (navHeart) {
            const hasFav = favorisIds.length > 0;
            navHeart.classList.toggle('bi-heart-fill', hasFav);
            navHeart.classList.toggle('bi-heart', !hasFav);
            navHeart.style.color = hasFav ? 'red' : '';
        }
    } catch (e) {
        console.error("Erreur lors de la récupération des favoris :", e);
    }
});

// Fonction externe pour le bouton "Voir plus"
function toggleDetails(cure) {
    const detail = document.getElementById("details-" + cure);
    if (detail) {
        detail.style.display = (detail.style.display === "none" || detail.style.display === "") ? "block" : "none";
    }
}
