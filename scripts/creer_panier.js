
document.addEventListener("DOMContentLoaded", function () {
    console.log("Script chargé : gestion du panier");
    

    fetch('../backend/lister_panier.php',  {
        credentials: 'include'
      }) //sans credidentials je ne vais pas recevoir les donnees

    .then(res => {
        console.log('HTTP status lister_panier:', res.status);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
    })
    .then(data => {
        console.log('Données lister_panier:', data);
        const { cures = [], chambres = [] } = data;
        const cartCardsContainer = document.getElementById('cart-cards');
        let totalPrix = 0;

        // Afficher les cures
        data.cures.forEach(res => {

            // 1) Colonne responsive
            const carte = document.createElement('div');
            carte.classList.add('col-6', 'col-md-4', 'mb-4');
            carte.id = `carte-cure-${res.id_reservation_cure}`;

             // 2) Card container
            const card = document.createElement('div');
            card.className = 'card shadow';
            card.style.height = '100%';

             // 3) Card body
            const cardBody = document.createElement('div');
            cardBody.className = 'card';

            // --- Image avec texte superposé ---
            const imageContainer = document.createElement('div');
            imageContainer.style.position = 'relative';
            imageContainer.classList.add('mb-3');

            const img = document.createElement('img');
            img.src = res.image ?? '../images/default.png';
            img.className = 'card-img-top img-fluid rounded';
            img.style.height = '230px';       // hauteur fixe pour toutes les vignettes
            img.style.width  = '100%';        // pleine largeur du parent
            img.style.objectFit = 'cover';    // recadrage « cover » pour garder le ratio   
            imageContainer.appendChild(img);

            const span = document.createElement('span');
            span.innerHTML = `<strong>${res.nom_sous_type}</strong>`;
            span.classList.add('spanPanier');
            span.style.position = 'absolute';
            span.style.bottom = '10px';
            span.style.left = '10px';
            span.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
            span.style.color = 'white';
            span.style.padding = '5px 10px';
            span.style.borderRadius = '5px';

            imageContainer.appendChild(span);
            cardBody.appendChild(imageContainer);

            // --- Ligne contenant le prix et le bouton  19 Mai ---
            const lignePrix = document.createElement('div');
            lignePrix.className = 'd-flex justify-content-between align-items-center';

            // --- Prix ---
            const prix = document.createElement('p');
            prix.className ='prixPanier';
            prix.innerHTML = `<strong>Prix :</strong> <span class="prix-item">${parseFloat(res.prix_total).toFixed(2)} €</span>`;
            cardBody.appendChild(prix);

            // --- Bouton Supprimer ---
            const btnContainer = document.createElement('div');
            btnContainer.className = 'mt-auto d-flex justify-content-end gap-2'; //placer le bouton a droite

            /*Ajout 19 Mai*/
            const btn = document.createElement('button');
            btn.className = 'btn btn-supprimer';
            btn.style.color = 'red';
            btn.dataset.id = res.id_reservation_cure;
            btn.dataset.type = 'cure';
            btn.innerHTML = '🗑';
            btn.setAttribute('data-bs-toggle', 'tooltip');
            btn.setAttribute('data-bs-placement', 'top');
            btn.setAttribute('title', 'Supprimer');

            // Ajout au conteneur
            lignePrix.appendChild(prix);
            lignePrix.appendChild(btn);
            cardBody.appendChild(lignePrix);

            card.appendChild(cardBody);
            carte.appendChild(card);
            cartCardsContainer.appendChild(carte);

            // --- Total ---
            totalPrix += parseFloat(res.prix_total);

            const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.forEach(function (tooltipTriggerEl) {
                new bootstrap.Tooltip(tooltipTriggerEl);
        });
   
        });
        
        // Afficher les chambres
    data.chambres.forEach(res => {
        // 1) Colonne responsive
        const carte = document.createElement('div');
        carte.classList.add('col-6', 'col-md-4', 'mb-4');
        carte.id = `carte-chambre-${res.id_reservation_chambre}`;
    
        // 2) Card container
        const card = document.createElement('div');
        card.className = 'card shadow';
        card.style.height = '100%';
    
        // 3) Card body
        const cardBody = document.createElement('div');
        cardBody.className = 'card';
    
        
        // 4) Image + overlay spans
        const imageContainer = document.createElement('div');
        imageContainer.style.position = 'relative';
        imageContainer.classList.add('mb-3');

        // L'image
        const img = document.createElement('img');
        img.src = res.image ?? '../images/standard_simple.jpg';
        img.className = 'card-img-top img-fluid rounded';
        img.style.height = '230px';       // hauteur fixe pour toutes les vignettes
        img.style.width  = '100%';        // pleine largeur du parent
        img.style.objectFit = 'cover';    // recadrage « cover » pour garder le ratio   
        
        imageContainer.appendChild(img);

        // Span du type de chambre (en haut, centré)
        const spanType = document.createElement('span');
        spanType.innerHTML = `<strong>${res.type_chambre}</strong>`;
        spanType.classList.add('spanPanier');
        Object.assign(spanType.style, {
        position: 'absolute',
        top: '10px',
        left: '35%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        color: 'white',
        padding: '5px 10px',
        borderRadius: '5px'
        });
        imageContainer.appendChild(spanType);

        // Span des dates (en bas, centré)
        const spanDates = document.createElement('span');
        spanDates.innerHTML = `<strong>${res.date_arrivee} – ${res.date_depart}</strong>`;
        spanDates.classList.add('spanPanier');
        Object.assign(spanDates.style, {
        position: 'absolute',
        bottom: '10px',
        left: '35%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        color: 'white',
        padding: '5px 10px',
        borderRadius: '5px'
        });
        imageContainer.appendChild(spanDates);

        cardBody.appendChild(imageContainer);

         // --- Ligne contenant le prix et le bouton  19 Mai ---
        const lignePrix = document.createElement('div');
        lignePrix.className = 'd-flex justify-content-between align-items-center';
  
        const prix = document.createElement('p');
        prix.innerHTML = `<strong>Total :</strong> <span class="prix-item">${parseFloat(res.prix_total).toFixed(2)}</span> €`;
        cardBody.appendChild(prix);
    
        // 7) Bouton supprimer aligné en bas
        const btnContainer = document.createElement('div');
        btnContainer.className = 'mt-auto d-flex justify-content-end gap-2';

         /*Ajout 19 Mai*/
        const btn = document.createElement('button');
        btn.className = 'btn btn-supprimer';
        btn.style.color = 'red';
        btn.dataset.id = res.id_reservation_cure;
        btn.dataset.type = 'cure';
        btn.innerHTML = '🗑';
        btn.setAttribute('data-bs-toggle', 'tooltip');
        btn.setAttribute('data-bs-placement', 'top');
        btn.setAttribute('title', 'Supprimer');

        lignePrix.appendChild(prix);
        lignePrix.appendChild(btn);
        cardBody.appendChild(lignePrix);
    
        // 8) Assemblage final
        card.appendChild(cardBody);
        carte.appendChild(card);
        cartCardsContainer.appendChild(carte);
    
        totalPrix += parseFloat(res.prix_total);

        const tooltipTriggerList1 = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList1.forEach(function (tooltipTriggerEl) {
                new bootstrap.Tooltip(tooltipTriggerEl);
        });
    });  


    // Mettre à jour total
    document.getElementById('total-global').textContent = totalPrix.toFixed(2).replace('.', ',');

    // Compter tous les articles
    const totalArticles = data.cures.length + data.chambres.length;
    document.getElementById('panier-count').textContent = totalArticles;

    // 💡 Ajouter suppression
    document.querySelectorAll('.btn-supprimer').forEach(btn => {
        btn.addEventListener('click', function () {
            const id = this.dataset.id;
            const type = this.dataset.type;
            if (!confirm("Voulez-vous vraiment supprimer cette réservation ?")) return;

            fetch('../backend/supprimer_panier.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    supprimer: true,
                    id: id,
                    type: type
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        const carte = document.getElementById(`carte-${type}-${id}`);
                        if (carte) {
                            const prix = parseFloat(carte.querySelector('.prix-item').textContent.replace(',', '.'));
                            carte.remove();

                            // Mettre à jour compteur
                            const countElem = document.getElementById('panier-count');
                            countElem.textContent = parseInt(countElem.textContent) - 1;

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