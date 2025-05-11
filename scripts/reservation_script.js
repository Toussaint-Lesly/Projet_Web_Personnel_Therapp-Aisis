// Correction générale du fichier JS

function afficherChambre(afficher) {
    const blocChambre = document.getElementById("select_chambre");
    if (afficher) {
        blocChambre.style.display = "block";
    } else {
        blocChambre.style.display = "none";
        alert("Vous avez choisi de ne pas réserver de chambre.");
        location.reload(); // Recharge la page
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

            fetch(`../backend/reservation_cures.php?id_cure=${selectedCure}`)
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

    if (typesList) {
        typesList.addEventListener("change", function(e) {
            if (e.target && e.target.name === "nom_sous_type") {
                const selectedRadio = e.target.value;

                fetch(`../backend/reservation_cures.php?id_cure=${cureSelect.value}`)
                    .then(response => response.json())
                    .then(data => {
                        const selected = data.sous_types.find(t => t.nom_sous_type === selectedRadio);
                        if (selected) {
                            document.getElementById("id_sous_type").value = selected.id_sous_type;
                            document.getElementById("nom_sous_type").value = selected.nom_sous_type;
                            //document.getElementById("description").value = selected.description || "";
                            document.getElementById("prix").value = selected.prix;
                            document.getElementById("prix_base").value = selected.prix;

                            calculerPrixTotal();
                        }
                    });
            }
        });
    }

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
                        input.dataset.typeChambre = vue.type_chambre;
                        input.dataset.prixChambre = vue.prix_base;
                        input.dataset.idCure = vue.id_reservation_cure;

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

    if (vuesList) {
        vuesList.addEventListener("change", function(e) {
            if (e.target && e.target.name === "vue") {
                const selectedVue = e.target.value;
                const selectedTypeChambre = e.target.dataset.typeChambre;
                const selectedPrixChambre = e.target.dataset.prixChambre;
                /*const selectedIdCure = e.target.dataset.idCure;*/
                // Avant le fetch pour réserver chambre
                const selectedIdCure = localStorage.getItem('id_reservation_cure');
                
                fetch(`../backend/reservation_chambre.php?id_hebergement=${selectChambre.value}`)
                    .then(response => response.json())
                    .then(data => {
                        const vue = data.vue_chambre.find(v => v.vue === selectedVue);
                        if (vue) {
                            document.getElementById("supplement").value = vue.supplement;
                            document.getElementById("id_vue_chambre").value = vue.id_vue_chambre || "";
                            document.getElementById("vue").value = vue.vue;
                            document.getElementById("type_chambre").value = selectedTypeChambre || "";
                            document.getElementById("prix_base").value = selectedPrixChambre || "";
                            /*document.getElementById('id_reservation_cure').value = selectedIdCure || "";*/
                            document.getElementById('id_reservation_cure').value =  selectedIdCure;


                            calculerPrixTotal();
                        }
                    });
            }
        });
    }

    function calculerPrixTotal() {
        const prixChambre = parseFloat(document.getElementById("prix_base").value) || 0;
        const supplement = parseFloat(document.getElementById("supplement").value) || 0;
        /*const prixCures = parseFloat(document.getElementById("prix").value) || 0;*/
        const total = prixChambre + supplement;

        document.getElementById("prix_total_input").value = total;

        const divPrix = document.getElementById("prix-total");
        if (divPrix) {
            divPrix.innerHTML = `Prix total estimé : $${total.toFixed(2)}`;
            divPrix.style.display = "block";
        }
    }


    // Gestion formulaire de cure
    const formCure = document.getElementById('form-reservation');
    if (formCure) {
        formCure.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(this);

            fetch('../backend/enregistrer_panier_cure.php', {
                method: 'POST',
                body: formData
            })
            .then(res => res.json()) // 👈 parse la réponse en objet JSON
            .then(data => {
                afficherMessagePourCure(data.message, "success"); // ✅ on utilise data.message ici
                localStorage.setItem('id_reservation_cure', data.id_reservation_cure); // ✅ on utilise data.id_reservation_cure ici
            })
            
            .catch(error => {
                afficherMessagePourCure("❌ Une erreur est survenue pour la réservation de cure.", "error");
                console.error(error);
            });
        });
    }

    // Gestion formulaire de chambre
    const formChambre = document.getElementById('form-reservation-1');
    if (formChambre) {
        formChambre.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(this);

            fetch('../backend/enregistrer_panier_chambre.php', {
                method: 'POST',
                body: formData
            })
            .then(res => res.json()) // ✅ traite la réponse comme du JSON
            .then(data => {
                afficherMessagePourChambre(data.message, "success");
            })
            .catch(error => {
                afficherMessagePourChambre("❌ Une erreur est survenue pour la réservation de chambre.", "error");
                console.error(error);
            });
        });
    }

    // Messages affichés
    function afficherMessagePourCure(msg, type = "success") {
        const msgElem = document.getElementById('message-reservation');
        if (msgElem) {
            msgElem.innerHTML = msg;
            msgElem.className = (type === "success") ? "alert alert-success" : "alert alert-danger";
        }
    }

    function afficherMessagePourChambre(msg, type = "success") {
        const msgElem = document.getElementById('message-reservation-1');
        if (msgElem) {
            msgElem.innerHTML = msg;
            msgElem.className = (type === "success") ? "alert alert-success" : "alert alert-danger";
        }
    }

    // Datepicker jquery
    if (window.jQuery) {
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
        });

        $("#departure-date").on("change", function() {
            const arrival = $("#arrival-date").datepicker("getDate");
            const departure = $(this).datepicker("getDate");
            if (arrival && departure && departure <= arrival) {
                alert("La date de départ doit être après la date d'arrivée.");
                $(this).val("");
            }
        });
    }
});
