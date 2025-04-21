window.addEventListener('DOMContentLoaded', () => {
    // Fonction pour transformer les noms en ID fiables
    function slugify(text) {
        return text.toString().toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // enlève les accents
            .replace(/[^a-z0-9]+/g, '-') // remplace tout sauf lettres/chiffres par tirets
            .replace(/^-+|-+$/g, ''); // supprime les tirets au début/fin
    }

    fetch('../backend/cures.php')
        .then(response => response.json())
        .then(data => {

            console.log("Données reçues :", data);

            const curesList = document.getElementById('cures-list');

            for (const [id, cure] of Object.entries(data)) {
                const section = document.createElement('section');

                const container = document.createElement('div');
                container.className = 'container my-5 text-center';
                container.style.fontSize = '20px';

                const titleRow = document.createElement('div');
                titleRow.className = 'row justify-content-center';

                const title = document.createElement('p');
                title.className = 'text-center';
                title.style.fontSize = '30px';

                const slug = slugify(cure.nom); // Génère l'ID proprement
                title.id = slug;

                title.innerHTML = `<strong>${cure.nom}</strong>`;

                titleRow.appendChild(title);
                container.appendChild(titleRow);

                const cardRow = document.createElement('div');
                cardRow.className = 'row';

                cure.options.forEach(option => {
                    const col = document.createElement('div');
                    col.className = 'col-12 col-sm-6 d-flex justify-content-center';

                    const card = document.createElement('div');
                     //j'ai change cure-card en card
                    card.className = 'card';
                    card.style.width = '100%';
                    card.style.borderRadius = '10px';

                    const imageContainer = document.createElement('div');
                    imageContainer.className = 'image-container d-flex justify-content-center';

                    const img = document.createElement('img');
                    img.src = option.image;
                    img.className = 'card-img-top';
                    img.alt = 'image';
                    img.style.maxWidth = '100%';
                    img.style.height = '350px';

                    const span = document.createElement('span');
                    span.className = 'image-info';
                    span.innerHTML = `<strong>${option.nom}</strong>`;

                    imageContainer.appendChild(img);
                    imageContainer.appendChild(span);

                    const cardBody = document.createElement('div');
                    cardBody.className = 'card-body';

                    const price = document.createElement('p');
                    price.className = 'card-text';
                    price.textContent = `Dès ${option.prix} €`;

                    const btn = document.createElement('a');
                    btn.href = option.link;
                    btn.className = 'btn btn-outline-primary text-dark';
                    btn.textContent = 'En savoir plus >>';

                    cardBody.appendChild(price);
                    cardBody.appendChild(btn);

                    card.appendChild(imageContainer);
                    card.appendChild(cardBody);
                    col.appendChild(card);
                    cardRow.appendChild(col);
                });

                container.appendChild(cardRow);
                section.appendChild(container);
                curesList.appendChild(section);

                console.log("Créé :", '#cure-' + slug);
            }

            // Scroll vers l'ancre après création de tout le contenu
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

        })
        .catch(error => {
            console.error('Erreur lors du chargement des cures :', error);
        });
});
