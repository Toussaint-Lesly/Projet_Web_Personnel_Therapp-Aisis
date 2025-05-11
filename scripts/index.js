document.addEventListener("DOMContentLoaded", async function () { //asunc pour reconnaitre await
    
    //badge

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


        //connexion
    const icone = document.getElementById("iconeConnexion");
    const popup = document.getElementById("popupConnexion");

    let popupTimeout;

    // Afficher la popup quand la souris entre sur l’icône
    icone.addEventListener("mouseenter", () => {
        clearTimeout(popupTimeout);
        popup.style.display = "block";
    });

    // Garder visible quand la souris entre dans la popup
    popup.addEventListener("mouseenter", () => {
        clearTimeout(popupTimeout);
        popup.style.display = "block";
    });

    // Cacher quand la souris quitte l’icône ou la popup
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

    fetch('backend/user_connexion.php', {
        credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
        const popup = document.getElementById('popupConnexion');
        
        if (data.status === 'connected') {
            // 1) Mettre à jour la popup
            /*text-align: justify;*/
            popup.querySelector('.popup-header').innerHTML = `
            <div style="font-size: 0.90rem;"> 
                Bienvenue <strong>${data.username}</strong>, votre moment de détente commence ici. Ressentez l’harmonie dès maintenant !
            </div>
        `;
        
            const p = popup.querySelector('.popup-header p');
            if (p) p.remove();
            const btn = popup.querySelector('.btn-connexion');
            if (btn) btn.remove();
    
            const ul = popup.querySelector('.popup-links ul');
            ul.insertAdjacentHTML('beforeend', `
                <li>
                    <a href="backend/logout.php" id="logout-link" style="text-decoration: none; color: #333333">
                        <i class="bi bi-box-arrow-right" style="font-size: 1.5rem; color: #333333"></i> Se déconnecter
                    </a>
                </li>
            `);
    
            // 2) Modifier le texte dans l'icône "Se connecter"
            const texteConnexion = document.getElementById('texteConnexion');
            if (texteConnexion) {
                texteConnexion.textContent = `Bonjour ${data.username} !` ;
            }
        }
    })
    .catch(err => console.error('Impossible de récupérer l’utilisateur :', err));


    // Récupération des favoris
    const res = await fetch('backend/get_favoris.php', { credentials: 'include' });
    const data = res.ok ? await res.json() : [];
    const favorisIds = data.reduce((ids, cure) => {
        cure.options.forEach(opt => {
        if (!ids.includes(opt.id_cure)) ids.push(opt.id_cure);
        });
        return ids;
    }, []);
    
    // Mise à jour de l'icône de la navbar
    const navHeart = document.querySelector('#navbar-heart');
        if (navHeart) {
            const hasFav = favorisIds.length > 0;
            navHeart.classList.toggle('bi-heart-fill', hasFav);
            navHeart.classList.toggle('bi-heart', !hasFav);
            navHeart.style.color = hasFav ? 'red' : '';
        }

  
  
    // Fonction de mise à jour du compteur
    function updateCartBadge() {
        console.log("Tentative de récupération du nombre d'articles dans le panier...");
        fetch('backend/compter_reservation.php', { credentials: 'include' })
            .then(res => {
            console.log("Réponse reçue du serveur:", res);
            if (!res.ok) throw new Error("Erreur réseau lors de la récupération.");
            return res.json();
            })
            .then(data => {
            console.log("Données JSON reçues:", data);
            if (typeof data.count !== 'undefined') {
                panierCountElem.textContent = data.count;
                panierCountElem.style.display = data.count > 0 ? 'inline-block' : 'none';
                console.log("Compteur mis à jour avec :", data.count);
            } else {
                console.warn("Le champ 'count' est manquant dans la réponse JSON.");
            }
            })
            .catch(err => {
            console.error("Erreur MAJ compteur panier:", err);
            });
    }
  
    // Appel initial + optionnel : réactualisation périodique tous les x ms
    updateCartBadge();
    setInterval(updateCartBadge, 60 * 1000); //refresh chaque minute
});    

function toggleDetails(cure) {
    const detail = document.getElementById("details-" + cure);
    detail.style.display = (detail.style.display === "none") ? "block" : "none";
}