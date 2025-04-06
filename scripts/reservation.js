document.addEventListener("DOMContentLoaded", function() {
    const cureSelect = document.getElementById("cure");
    const typesList = document.getElementById("types-list");
    const typesContainer = document.getElementById("types-container");

    if (cureSelect) {
        cureSelect.addEventListener("change", function () {
            const selectedCure = cureSelect.value;

            if (!selectedCure) return;  // Si aucune cure n'est sélectionnée

            console.log("Cure sélectionnée:", selectedCure);

            fetch(`../backend/reservation.php?cure=${selectedCure}`)
                .then(response => response.json())
                .then(data => {
                    typesList.innerHTML = '';

                    if (data.error) {
                        console.error("Erreur : ", data.error);
                        return;
                    }

                    data.sous_types.forEach(type => {
                        const div = document.createElement("div");
                        div.classList.add("radio-container");

                        const input = document.createElement("input");
                        input.type = "radio";
                        input.name = "sous_type_cure";
                        input.value = type.nom_sous_type;

                        const label = document.createElement("label");
                        label.textContent = `${type.nom_sous_type} - ${type.prix} €`;

                        div.appendChild(input);
                        div.appendChild(label);
                        typesList.appendChild(div);
                    });

                    typesContainer.style.display = "block";
                })
                .catch(err => {
                    console.error("Erreur lors de la requête AJAX :", err);
                });
        });
    }
});