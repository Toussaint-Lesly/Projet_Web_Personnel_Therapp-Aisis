document.addEventListener("DOMContentLoaded", () => {
    creerCarteFavori();
  });
  
  function creerCarteFavori() {
    fetch('../backend/get_favoris.php')
      .then(res => res.json())
      .then(data => {
        const favorisContainer = document.getElementById('favoris-container');
        if (!favorisContainer) return console.error("#favoris-container introuvable");
  
        if (data.length === 0) {
          favorisContainer.innerHTML = "<p>Vous n'avez aucun favori pour le moment.</p>";
          return;
        }
  
        data.forEach(cure => {
          const section = creerSectionCure(cure);
          favorisContainer.appendChild(section);
        });
        // ➕ Ajoute cet appel après avoir affiché les cartes
        mettreAJourTotalFavoris(data);
      })
      .catch(err => console.error('Erreur chargement favoris :', err));
  }
  
  function creerSectionCure(cure) {
    const section = document.createElement('section');
    const container = creerContainer();
    container.appendChild(creerTitleRow(cure.nom));
  
    const cardRow = document.createElement('div');
    cardRow.className = 'row';
  
    if (Array.isArray(cure.options) && cure.options.length) {
      cure.options.forEach(option => {
        const col = creerColonneOption(option);
        cardRow.appendChild(col);
      });
    } else {
      const msg = document.createElement('p');
      msg.textContent = 'Aucune option disponible pour cette cure.';
      cardRow.appendChild(msg);
    }
  
    container.appendChild(cardRow);
    section.appendChild(container);
    return section;
  }
  
  function creerContainer() {
    const c = document.createElement('div');
    c.className = 'container my-5 text-center';
    c.style.fontSize = '20px';
    return c;
  }
  

function creerTitleRow(titre) {
  const row = document.createElement('div');
  row.className = 'row justify-content-center mb-4';

  const title = document.createElement('h2');
  title.className = 'nom-cure'; // ✅ classe à cibler en CSS
  title.innerHTML = `<strong>${titre}</strong>`;

  row.appendChild(title);

  return row;
}


  function creerColonneOption(option) {
    const col = document.createElement('div');
    col.className = 'col-12 mb-4';
  
    // Ligne interne
    const innerRow = document.createElement('div');
    innerRow.className = 'row g-2';
  
    // Colonne gauche : la carte
    const leftCol = document.createElement('div');
    leftCol.className = 'col-5 d-flex';
  
    const card = document.createElement('div');
    card.className = 'card flex-fill shadow';
    card.style.borderRadius = '10px';
    card.style.position = 'relative';
  
    // Image + overlay
    const imgCont = document.createElement('div');
    imgCont.classList.add('image-container', 'position-relative', 'mb-2');

    /*imgCont.style.height = '350px';
    imgCont.style.overflow = 'hidden';*/

    const img = document.createElement('img');
    img.src = option.image;
    img.className = 'card-img-top';
    img.alt = option.nom;
    img.style.maxWidth = '100%';
    img.style.height = '350px';
    img.style.objectFit = 'cover';
    imgCont.appendChild(img);

    const spanType = document.createElement('span');
    spanType.className = 'image-info';
    spanType.innerHTML = `<strong>${option.nom_sous_type}</strong>`;

    imgCont.appendChild(spanType);
  
    const body = creerCardBody(option);
  
    card.append(imgCont, body);
    leftCol.appendChild(card);
  
    // Colonne droite : avis clients
    const rightCol = document.createElement('div');
    rightCol.className = 'col-7 d-flex flex-column';
  
    const avisContainer = document.createElement('div');
    avisContainer.className = 'border rounded d-flex flex-column';
    avisContainer.style.height = '100%';
  
    // Header avis
    const header = document.createElement('div');
    header.className = 'p-2 border-bottom avis';
    header.innerHTML = '<strong>Avis clients</strong>';
    avisContainer.appendChild(header);
  
    // Zone scrollable
    const scrollZone = document.createElement('div');
    scrollZone.className = 'p-2 flex-grow-1 overflow-auto avis';
    scrollZone.style.maxHeight = '240px';
  
    if (Array.isArray(option.avis) && option.avis.length) {
      option.avis.forEach(a => {
        const bloc = document.createElement('div');
        bloc.className = 'mb-2';
        bloc.innerHTML = `
          <p class="mb-1"><em>« ${a.commentaire} »</em></p>
          <small class="text-muted">— ${a.auteur}</small>
        `;
        scrollZone.appendChild(bloc);
      });
    } else {
      scrollZone.innerHTML = '<p class="text-center text-muted">Aucun avis</p>';
    }
    avisContainer.appendChild(scrollZone);
  
    // Footer pour ajouter un avis
    const footer = document.createElement('div');
    footer.className = 'p-2 border-top text-center';
    footer.innerHTML = '<button class="btn btn-sm btn-outline-primary">+ Ajouter un avis</button>';
    avisContainer.appendChild(footer);
  
    rightCol.appendChild(avisContainer);
  
    // Assemblage
    innerRow.append(leftCol, rightCol);
    col.appendChild(innerRow);
    return col;
  }
  
  
  function creerCardBody(option) {
    const body = document.createElement('div');
    body.className = 'card-body';
  
    // Prix
    const prix = document.createElement('p');
    prix.className = 'card-text';
    /*prix.style.align-text = 'justify';*/
    prix.innerHTML = `<strong>${option.prix} €</strong>`;
    body.appendChild(prix);
    
    // Lignes de boutons
    const btnRow = document.createElement('div');
    btnRow.className = 'mt-auto d-flex justify-content-between align-items-center';

    // création du bouton
    const btnRes = document.createElement('button');
    btnRes.type = 'button';
    btnRes.className = 'btn btn-sm btn-outline-primary me-2 align-self-center';
    btnRes.textContent = 'Réserver';
    btnRes.addEventListener('click', function (e) {
      e.preventDefault();
      ajouterAuPanierCure(option);
      retirerDesFavoris(option.id_sous_type || option.id_cure);
      supprimerCarteFavori(this.closest('.card'));
    });

    // icône poubelle
    const delIcon = document.createElement('i');
    delIcon.className = 'bi bi-trash text-danger fs-5'; // fs-5 pour taille icône optionnelle
    delIcon.style.cursor = 'pointer';
    delIcon.addEventListener('click', () => {
      retirerDesFavoris(option.id_sous_type || option.id_cure);
      supprimerCarteFavori(delIcon.closest('.card'));
    });

    btnRow.append(btnRes, delIcon);
    body.appendChild(btnRow);
  
    return body;
  }


function supprimerCarteFavori(carteElement) {
  if (carteElement && carteElement.parentNode) {
      carteElement.parentNode.removeChild(carteElement);
  }
}


function mettreAJourTotalFavoris(data) {
  let total = 0;

  data.forEach(cure => {
    if (Array.isArray(cure.options)) {
      cure.options.forEach(option => {
        total += parseFloat(option.prix) || 0;
      });
    }
  });

  const totalElement = document.getElementById('total-global');
  if (totalElement) {
    totalElement.textContent = total.toFixed(2);
  }
}


// Fonction pour retirer une cure des favoris
function retirerDesFavoris(idSousType) {
  fetch('../backend/supprimer_favoris.php', {
      method: 'POST',
      body: JSON.stringify({ id_sous_type: idSousType }),
      headers: { 'Content-Type': 'application/json' }
  })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              console.log('Cure retirée des favoris');
          } else {
              console.error('Erreur lors du retrait des favoris', data.message);
          }
      })
      .catch(error => {
          console.error('Erreur de communication avec le serveur', error);
      });
  }

// Fonction pour ajouter une cure au reservation_cure
function ajouterAuPanierCure(option) {
  // Construire les params encodés
  const params = new URLSearchParams({ /*absolument necessaire*/
    nom_sous_type: option.nom_sous_type,
    prix:          option.prix,
    id_cure:       option.id_cure,
    id_sous_type:  option.id_sous_type,
    statut:        'panier',
    prix_total:    option.prix
  });

  console.log("Envoi enregistrer_panier_cure:", params.toString());

  fetch('../backend/enregistrer_panier_cure.php', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString() /*absolument necessaire*/
  })
    .then(r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    })
    .then(data => {
        if (!data.success) {
          throw new Error(data.message || 'Erreur inconnue');
        }

    // 3) Mise à jour du badge du panier
      const badge = document.getElementById('panier-count');
      if (badge) {
        const count = parseInt(badge.textContent, 10) || 0;
        badge.textContent = count + 1;
        badge.style.display = (count + 1) > 0 ? 'inline-block' : 'none';
      }

      // 4) Stocker l'ID de la réservation pour pouvoir la supprimer
      option.id_reservation_cure = data.id_reservation_cure;

      // 5) Feedback utilisateur
      console.log(`✅ Cure ajoutée au panier (réservation #${data.id_reservation_cure})`);
      // ou affichage d’un toast/snackbar dans ton UI
  })
    .catch(err => {
      console.error('Erreur ajout au panier :', err);
      alert(`Impossible d’ajouter la cure au panier : ${err.message}`);
  });
}