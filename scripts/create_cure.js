/* js/index.js */

document.addEventListener("DOMContentLoaded", () => {
  main();
});

async function main() {
    try {
      const favorisIds = await fetchFavoris();
      const curesData = await fetchCures();
      renderCures(curesData, favorisIds);
    } catch (err) {
      console.error('Erreur dans main:', err);
    }
}

// 1) Récupère les favoris de l'utilisateur
async function fetchFavoris() {
    const API_FAVS = '../backend/get_favoris.php';
    try {
      const res = await fetch(API_FAVS, { credentials: 'include' });
      if (!res.ok) throw new Error('Erreur lors du chargement des favoris');
      const data = await res.json();
      // Extraire tous les id_cure uniques
      return data.reduce((ids, cure) => {
        cure.options.forEach(opt => {
          if (!ids.includes(opt.id_sous_type)) ids.push(opt.id_sous_type); // j'ai change id_cure en id_sous_type
        });
        return ids;
      }, []);
    } catch (err) {
      console.warn(err);
      return [];
    }
}

// 2) Récupère les données des cures
async function fetchCures() {
    const API_CURES = '../backend/get_cure.php';
    const res = await fetch(API_CURES);
    if (!res.ok) throw new Error('Erreur lors du chargement des cures');
    return await res.json();
}

// 3) Génère et affiche les sections pour chaque cure
function renderCures(data, favorisIds) {
    const curesList = document.getElementById('cures-list');
    curesList.innerHTML = ''; // clear existing content

    Object.values(data).forEach(cure => {
      const section = createCureSection(cure, favorisIds);
      curesList.appendChild(section);
    });
}

// 4) Crée une section complète pour une cure
function createCureSection(cure, favorisIds) {
    const section = document.createElement('section');
    const container = createContainer();

    const titleRow = createTitleRow(cure.nom);
    container.appendChild(titleRow);

    const cardRow = document.createElement('div');
    cardRow.className = 'row';

    cure.options.forEach(option => {
      const col = document.createElement('div');
      col.className = 'col-6 mt-4 mb-4 d-flex align-items-stretch';

      const card = createCard(option, favorisIds);
      col.appendChild(card);
      cardRow.appendChild(col);
    });

    container.appendChild(cardRow);
    section.appendChild(container);
    return section;
}

function createContainer() {
    const container = document.createElement('div');
    container.className = 'container my-5 text-center';
    container.style.fontSize = '1.25em';
    return container;
}

function createTitleRow(name) {
    const titleRow = document.createElement('div');
    titleRow.className = 'row justify-content-center';

    const title = document.createElement('h2');
    title.className = 'text-center extra'; // Ajoute une classe
    const slug = slugify(name);
    title.id = slug;
    title.innerHTML = `${name}`;

    titleRow.appendChild(title);
    return titleRow;
}


// 5) Crée la carte d'une option
function createCard(option, favorisIds) {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.width = '100%';
    card.style.borderRadius = '0.625em';

    const imageContainer = document.createElement('div');
    imageContainer.className = 'image-container d-flex justify-content-center';

    const img = document.createElement('img');
    img.src = option.image;
    img.className = 'card-img-top';
    img.alt = option.nom;
    img.style.maxWidth = '100%';
    img.style.height = '350px';

    const span = document.createElement('span');
    span.className = 'image-info';
    span.innerHTML = `<strong>${option.nom}</strong>`;

    imageContainer.append(img, span);

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const price = document.createElement('p');
    price.className = 'card-text';
    price.innerHTML = `Dès <strong>${option.prix} €</strong>`;

    const btnRow = document.createElement('div');
    btnRow.className = 'd-flex justify-content-between align-items-center';

    const btn = document.createElement('a');
    btn.href = option.link;
    btn.className = 'btn btn-outline-secondary text-dark';
    btn.textContent = 'En savoir plus >>';

    const heart = createHeartIcon(option.id_sous_type, favorisIds, option);

    btnRow.append(btn, heart);
    cardBody.append(price, btnRow);
    card.append(imageContainer, cardBody);

    return card;
}

// 6) Création et gestion de l'icône cœur
function createHeartIcon(idCure, favorisIds, option) {
    const heart = document.createElement('i');
    heart.classList.add('bi', 'heart-icon');
    heart.dataset.id = idCure;
    heart.style.cursor = 'pointer';
    heart.style.fontSize = '1.5em';

    updateHeartAppearance(heart, favorisIds.includes(idCure));

    heart.addEventListener('click', () => {
      const isFav = favorisIds.includes(idCure);
      if (!isFav) {
        favorisIds.push(idCure);
        ajouterAuxFavoris(option);
      } else {
        favorisIds = favorisIds.filter(i => i !== idCure);
        retirerDesFavoris(idCure);
      }
      updateHeartAppearance(heart, !isFav);
    });

    return heart;
}

function updateHeartAppearance(heartEl, filled) {
    heartEl.classList.toggle('bi-heart-fill', filled);
    heartEl.classList.toggle('bi-heart', !filled);
    heartEl.style.color = filled ? 'red' : 'skyblue';
}

// utilitaire slugify (inchangé)
function slugify(text) {
    return text.toString().toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
}

const hash = window.location.hash;
    if (hash) {
        function waitForElement(selector, callback, interval = 100, timeout = 5000) {
            const startTime = Date.now();
            const checkExist = setInterval(() => {
                const element = document.querySelector(selector);
                if (element) {
                    clearInterval(checkExist);
                    callback(element);
                } else if (Date.now() - startTime > timeout) {
                    clearInterval(checkExist);
                    console.warn(`Élément ${selector} introuvable après ${timeout}ms`);
                }
        }, interval);
    }

waitForElement(hash, (target) => {
    console.log("Scroll vers :", hash);
    target.scrollIntoView({ behavior: 'smooth' });
    });
}

// page favoris
// Fonction pour ajouter une cure aux favoris
function ajouterAuxFavoris(option) {
    const prix = parseFloat(option.prix);

    console.log("🧪 Vérification des champs:");
    console.log("id_cure:", option.id_cure, typeof option.id_cure);
    console.log("id_sous_type:", option.id_sous_type, typeof option.id_sous_type);
    console.log("nom_sous_type:", option.nom_sous_type, typeof option.nom_sous_type);
    console.log("prix:", option.prix, typeof option.prix);
    console.log("parseFloat(prix):", prix, isNaN(prix));


    if (!option.id_cure || !option.id_sous_type || !option.nom_sous_type || isNaN(prix)) {
        console.error("❌ Données manquantes ou invalides dans l'option :", option);
        return;
    }

  const favorisData = {
      id_cure: option.id_cure,
      id_sous_type: option.id_sous_type,
      nom_sous_type: option.nom_sous_type,
      prix: prix,
      image: option.image,
    };

  fetch('../backend/enregistrer_favoris.php', {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(favorisData),
      credentials: "include"
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          console.log('✅ Cure ajoutée aux favoris');
      } else {
          console.error('❌ Erreur lors de l\'ajout aux favoris', data.message);
      }
  })
  .catch(error => {
      console.error('❌ Erreur de communication avec le serveur', error);
  });
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
