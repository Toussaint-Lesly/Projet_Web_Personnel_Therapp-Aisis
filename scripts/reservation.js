document.addEventListener("DOMContentLoaded", function() {
    console.log("Le script est chargé !");
    
    // Récupérer le nom du fichier de la page actuelle
    const currentPage = window.location.pathname.split("/").pop();
    console.log("Page actuelle :", currentPage);

    // Script spécifique à la page de réservation
    if (currentPage === "reservation.html") {
        initReservationPage();
    }

    // Script spécifique à la page select_chambre.html
    if (currentPage === "select_chambre.html") {
        initSelectChambrePage();
    }
});

// -------------------
// Fonction pour la page de réservation (cure)
// -------------------
function initReservationPage() {
    console.log("Chargement du script pour la réservation");

    const cureSelect = document.getElementById("cure");
    const typesContainer = document.getElementById("types-container");
    const typesList = document.getElementById("types-list");

    // Définition des sous-types de chaque cure
    const sousTypes = {
        "detox": ["Détox aux thés. Prix : $100. Duree : 3 a 7 jours.", "Détox aux fruits et légumes. Prix : $120. Duree 3 a 7 jours."],
        "relaxation": ["Relaxation par l’aromathérapie. Prix : $140. Duree 5 a 10 jours.", "Relaxation par l’hydrothérapie. Prix : $150. Duree 5 a 10 jours."],
        "revitalisation": ["Revitalisation par les super-aliments. Prix : $120. Duree 4 a 7 jours.", "Revitalisation par la luminothérapie. Prix : $120. Duree 4 a 7 jours."],
        "sommeil": ["Sommeil réparateur par la sophrologie. Prix : $140. Duree : 6 a 10 jours.", "Sommeil profond par la phytothérapie. Prix : $130. Duree 6 a 10 jours."],
        "minceur": ["Minceur avec diététique personnalisée. Prix : $110. Duree 7 a 14 jours.", "Minceur avec activité physique douce. Prix : $180. Duree 7 a 14 jours."],
        "antiage": ["Anti-âge par la nutrition. Prix : $220. Duree 5 a 10 jours.", "Anti-âge par les soins du visage. Prix : $200. Duree 5 a 10 jours."],
        "immunite": ["Immunité avec la naturopathie. Prix : $120. Duree : 6 a 12 jours.", "Immunité avec le sauna et le hammam. Prix : $110. Duree 6 a 12 jours."],
        "dos": ["Soulagement du dos par l’hydrothérapie. Prix : $150. Duree 5 a 10 jours.", "Soulagement du dos par la kinésithérapie Prix : $150. Duree 5 a 10 jours."],
        "sante": ["Prévention santé par la micronutrition. Prix : $180. Duree 7 a 14 jours.", "Prévention santé par l’activité physique douce. Prix : $200. Duree 7 a 14 jours."],
        "forme": ["Remise en forme par le sport et le mouvement. Prix : $110. Duree : 5 a 7 jours.", "Remise en forme par la récupération et la relaxation. Prix : $100. Duree 5 a 7 jours."]  
    };

    // Afficher dynamiquement les sous-types selon la cure sélectionnée
    if (cureSelect) {
        cureSelect.addEventListener("change", function() {
            const selectedCure = cureSelect.value;
            typesList.innerHTML = ""; // Vider la liste précédente

            if (selectedCure && sousTypes[selectedCure]) {
                sousTypes[selectedCure].forEach(type => {
                    const checkbox = document.createElement("input");
                    checkbox.type = "radio";
                    checkbox.name = "sous_type_cure";
                    checkbox.value = type;

                    const label = document.createElement("label");
                    label.textContent = type;

                    const div = document.createElement("div");
                    div.classList.add("radio-container");
                    div.appendChild(checkbox);
                    div.appendChild(label);

                    typesList.appendChild(div);
                });

                typesContainer.style.display = "block";
            } else {
                typesContainer.style.display = "none";
            }
        });
    }
}
// -------------------
// Fonction pour la page select_chambre.html (sélection de chambre)
// -------------------
function initSelectChambrePage() {
    console.log("Chargement du script pour la sélection des chambres");

    const chambreSelect = document.getElementById("chambre");
    const typesVues = document.getElementById("types-vues");
    const typesList1 = document.getElementById("types-");

    $("#arrival-date, #departure-date").datepicker({
        dateFormat: "dd/mm/yy",
        minDate: 0,
        showAnim: "slideDown",
        showOtherMonths: true,
        selectOtherMonths: true
    }).datepicker("widget").css("max-width", "400px");

    // Définition des vues de chaque type de chambre
    const sousTypes = {
        "standardSimple": ["Vue sur mer", "Vue sur parc", "Vue sur piscine", "Vue sur jardin"],
        "standardDouble": ["Vue sur mer", "Vue sur parc", "Vue sur piscine", "Vue sur jardin"],
        "confortSimple": ["Vue sur mer", "Vue sur parc", "Vue sur piscine", "Vue sur jardin"],
        "confortDouble": ["Vue sur mer", "Vue sur parc", "Vue sur piscine", "Vue sur jardin"],
        "suite": ["Vue sur mer", "Vue sur parc", "Vue sur piscine", "Vue sur jardin"]
    };

    // Afficher dynamiquement les vues selon la chambre sélectionnée
    if (chambreSelect) {
        chambreSelect.addEventListener("change", function() {
            const selectedChambre = chambreSelect.value;
            typesList1.innerHTML = ""; // Vider la liste précédente

            if (selectedChambre && sousTypes[selectedChambre]) {
                sousTypes[selectedChambre].forEach(type => {
                    const checkbox = document.createElement("input");
                    checkbox.type = "radio";
                    checkbox.name = "vue_chambre";
                    checkbox.value = type;

                    const label = document.createElement("label");
                    label.textContent = type;

                    const div = document.createElement("div");
                    div.classList.add("radio-container");
                    div.appendChild(checkbox);
                    div.appendChild(label);

                    typesList1.appendChild(div);
                });

                typesVues.style.display = "block";
            } else {
                typesVues.style.display = "none";
            }
        });
    }
}

// -------------------
// Fonction pour la page reservation cure 
// -------------------

function submitForm() {
    const cure = document.getElementById("cure").value;
    const sousType = document.querySelector('input[name="sous_type_cure"]:checked');

    if (!cure) {
        alert("Veuillez sélectionner une cure.");
        return;
    }
    if (!sousType) {
        alert("Veuillez choisir un type de cure.");
        return;
    }

    alert(`Vous avez réservé : ${cure} - ${sousType.value}`);
}

// -------------------
// Fonction pour la page select_chambre 
// -------------------

function submitForm1() {
   
    const chambre = document.getElementById("chambre").value;
    const sousType1 = document.querySelector('input[name="vue_chambre"]:checked');

    if (!chambre) {
        alert("Veuillez sélectionner une chambre.");
        return;
    }
    if (!sousType1) {
        alert("Veuillez choisir une vue.");
        return;
    }

    alert(`Vous avez réservé : ${chambre} - ${sousType1.value}`);
}

