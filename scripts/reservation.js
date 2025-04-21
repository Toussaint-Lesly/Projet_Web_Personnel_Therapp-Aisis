function afficherChambre(afficher) {
    const blocChambre = document.getElementById("select_chambre");
    if (afficher) {
        blocChambre.style.display = "block";
    } else {
        blocChambre.style.display = "none";
        alert("Vous avez choisi de ne pas réserver de chambre.");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const cureSelect = document.getElementById("cure");
    const typesList = document.getElementById("types-list");
    const typesContainer = document.getElementById("types-container");

    const selectChambre = document.getElementById("chambre");
    const vuesContainer = document.getElementById("types-vues");
    const vuesList = document.getElementById("vue_chambres");

    if (cureSelect) {
        cureSelect.addEventListener("change", function () {
            const selectedCure = cureSelect.value;
            if (!selectedCure) return;

            fetch(`../backend/reservation.php?id_cure=${selectedCure}`) //j'ai change cure en id_cure pour tester
                .then(response => response.json())
                .then(data => {
                    typesList.innerHTML = '';
                    if (data.error) return console.error("Erreur : ", data.error);

                    data.sous_types.forEach(type => {
                        const div = document.createElement("div");
                        div.classList.add("radio-container");

                        const input = document.createElement("input");
                        input.type = "radio";
                        input.name = "nom_sous_type";
                        input.value = type.nom_sous_type;

                        const label = document.createElement("label");
                        label.textContent = `${type.nom_sous_type} - $ ${type.prix}`;

                        div.appendChild(input);
                        div.appendChild(label);
                        typesList.appendChild(div);
                    });

                    typesContainer.style.display = "block";
                })
                .catch(err => console.error("Erreur AJAX :", err));
        });
    }

    typesList.addEventListener("change", function(e) {
        if (e.target && e.target.name === "nom_sous_type") {
            const selectedRadio = e.target.value;

            fetch(`../backend/reservation.php?id_cure=${cureSelect.value}`) //j'ai change cure en id_cure pour tester
                .then(response => response.json())
                .then(data => {
                    const selected = data.sous_types.find(t => t.nom_sous_type === selectedRadio);
                    if (selected) {
                        document.getElementById("id_sous_type").value = selected.id_sous_type;
                        document.getElementById("nom_sous_type").value = selected.nom_sous_type;
                        document.getElementById("description").value = selected.description || "";
                        document.getElementById("prix").value = selected.prix;
                        document.getElementById("prix_base").value = selected.prix; //changer prix en prix_base
                    }
                });
        }
    });
   
    if (selectChambre) {
        selectChambre.addEventListener("change", function () {
            const selectedChambre = selectChambre.value;
            if (!selectedChambre) return;

            fetch(`../backend/reservation_chambre.php?id_hebergement=${selectedChambre}`)
                .then(response => response.json())
                .then(data => {
                    vuesList.innerHTML = '';
                    if (data.error) return console.error("Erreur : ", data.error);

                    data.vue_chambre.forEach(vue => {
                        const div = document.createElement("div");
                        div.classList.add("radio-container");

                        const input = document.createElement("input");
                        input.type = "radio";
                        input.name = "vue";
                        input.value = vue.vue;
                        input.dataset.typeChambre = vue.type_chambre;  // On stocke type_chambre ici !
                        input.dataset.prixChambre = vue.prix_base;  // On stocke prix_chambre ici !

                        const label = document.createElement("label");
                        label.textContent = `${vue.vue} - supplément $ ${vue.supplement}`;

                        div.appendChild(input);
                        div.appendChild(label);
                        vuesList.appendChild(div);
                    });

                    vuesContainer.style.display = "block";
                })
                .catch(err => console.error("Erreur AJAX :", err));
        });
    }

    vuesList.addEventListener("change", function(e) {
        if (e.target && e.target.name === "vue") {
            const selectedVue = e.target.value;
            const selectedTypeChambre = e.target.dataset.typeChambre; // Récupéré depuis l’attribut
            const selectedPrixChambre = e.target.dataset.prixChambre; // Récupéré depuis l’attribut
    
            fetch(`../backend/reservation_chambre.php?id_hebergement=${selectChambre.value}`)
                .then(response => response.json())
                .then(data => {
                    const vue = data.vue_chambre.find(v => v.vue === selectedVue);
                    if (vue) {
                        document.getElementById("supplement").value = vue.supplement;
                        document.getElementById("id_vue_chambre").value = vue.id_vue_chambre || "";
                        document.getElementById("vue").value = vue.vue;
                        document.getElementById("type_chambre").value = selectedTypeChambre || "";
                        document.getElementById("prix_base").value = selectedPrixChambre || ""; //ajout pour reccuperer le prix chambre
    
                        calculerPrixTotal();
                    }
                });
        }
    });
    

    function calculerPrixTotal() {
        const prixBase = parseFloat(document.getElementById("prix_base").value) || 0;
        const supplement = parseFloat(document.getElementById("supplement").value) || 0;
        const prixCures = parseFloat(document.getElementById("prix").value) || 0;
        const total = prixBase + supplement + prixCures;

        document.getElementById("prix_total_input").value = total;

        const divPrix = document.getElementById("prix-total");
        if (divPrix) {
            divPrix.innerHTML = `Prix total estimé : $${total.toFixed(2)}`;
            divPrix.style.display = "block";
        }
    }

    // Datepicker avec vérification
    $("#arrival-date, #departure-date").datepicker({
        dateFormat: "dd/mm/yy",
        minDate: 0,
        showAnim: "slideDown",
        showOtherMonths: true,
        selectOtherMonths: true,
        onClose: function(selectedDate) {
            if (this.id === "arrival-date") {
                $("#departure-date").datepicker("option", "minDate", selectedDate);
            }
        }
    }).datepicker("widget").css("max-width", "400px");

    $("#departure-date").on("change", function() {
        const arrival = $("#arrival-date").datepicker("getDate");
        const departure = $(this).datepicker("getDate");

        if (arrival && departure && departure <= arrival) {
            alert("La date de départ doit être après la date d'arrivée.");
            $(this).val("");
        }
    });



    //message apres ajout dans panier
  
    document.getElementById('form-reservation').addEventListener('submit', function (event) {
        event.preventDefault(); // ⚠️ Bloque l'envoi classique du formulaire
    
        const formData = new FormData(this);
    
        fetch('../backend/enregistrer_panier.php', {
            method: 'POST',
            body: formData
        })
        .then(res => res.text()) 
        .then(message => {
            afficherMessage(message); // Affiche le retour PHP dans la même page
        })
        .catch(error => {
            afficherMessage("❌ Une erreur est survenue.");
            console.error(error);
        });
    }); 
    
    function afficherMessage(msg, type = "success") {
        const msgElem = document.getElementById('message-reservation');
        msgElem.innerHTML = msg;
        msgElem.className = type === "success" ? "alert alert-success" : "alert alert-danger";
    }   
    
});
