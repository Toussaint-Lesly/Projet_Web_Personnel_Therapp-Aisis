

document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("cures-list");

    const cures = [
        {
            id: "detox",
            title: "Cure Détox et Purification",
            options: [
                {
                    name: "Détox aux fruits et légumes",
                    price: "$120.00",
                    id: "dropdown-detoxl",
                    image: "../images/detox_1.png",
                    link: "details.html#detox"
                },
                {
                    name: "Détox aux thés (infusions purifiantes, drainage lymphatique)",
                    price: "$100.00",
                    id: "dropdown-detox",
                    image: "../images/detox1_1.png",
                    link: "details.html#detox"
                }
            ]
        },

        {
            id: "relaxation",
            title: "Cure Relaxation et Anti-Stress",
            options: [
                {
                    name: "Relaxation par l’aromathérapie (diffusion d’huiles essentielles, massages relaxants)",
                    price: "$150.00",
                    id: "dropdown-relaxation",
                    image: "../images/antiStress.jpg",
                    link: "details.html#stress"
                },
                {
                    name: "Relaxation par l’hydrothérapie (bains bouillonnants, douches sensorielles)",
                    price: "$140.00",
                    id: "dropdown-relaxation",
                    image: "../images/bains_chaudes.jpeg",
                    link: "details.html#stress"
                }
            ]
        },

        {
            id: "revitalisation",
            title: "Cure Revitalisation et Énergie",
            options: [
                {
                    name: "Revitalisation par les super-aliments (jus détox, compléments naturels)",
                    price: "$120.00",
                    id: "dropdown-revitalisation",
                    image: "../images/revitalisante.jpg",
                    link: "details.html#revitalisation"
                },
                {
                    name: "Revitalisation par la luminothérapie</strong> (exposition à la lumière, soins énergétiques)",
                    price: "$120.00",
                    id: "dropdown-revitalisation",
                    image: "../images/detox1_1.png",
                    link: "details.html#revitalisation"
                }
            ]
        },

        {
            id: "sommeil",
            title: "Cure Sommeil et Relaxation Profonde",
            options: [
                {
                    name: "Sommeil réparateur par la sophrologie</strong> (séances de relaxation guidée, respiration)",
                    price: "$140.00",
                    id: "dropdown-sommeil",
                    image: "../images/sommeil.jpg",
                    link: "details.html#relaxation"
                },
                {
                    name: "Sommeil profond par la phytothérapie</strong> (infusions calmantes, huiles relaxantes)",
                    price: "$130.00",
                    id: "dropdown-sommeil",
                    image: "../images/sommeil1.jpg",
                    link: "details.html#relaxation"
                }
            ]
        },

        {
            id: "forme",
            title: "Cure remise en forme",
            options: [
                {
                    name: "Remise en forme par le sport et le mouvement</strong>(séances de fitness, yoga, pilates, renforcement musculaire)",
                    price: "$110.00",
                    id: "dropdown-forme",
                    image: "../images/yoga.jpg",
                    link: "details.html#forme"
                },
                {
                    name: "Remise en forme par la récupération et la relaxation (massages tonifiants, hydrothérapie, bains reminéralisants)",
                    price: "$100.00",
                    id: "dropdown-forme",
                    image: "../images/massage.jpg",
                    link: "details.html#forme"
                }
            ]
        },

        {
            id: "antiage",
            title: "Cure Anti-Âge et Beauté",
            options: [
                {
                    name: "Anti-âge par la nutrition (antioxydants, compléments pour la peau)",
                    price: "$220.00",
                    id: "dropdown-anti-age",
                    image: "../images/aliments-immunite_anti-age.jpg",
                    link: "details.html#antiage"
                },
                {
                    name: "Anti-âge par les soins du visage (masques naturels, hydratation profonde)",
                    price: "$200.00",
                    id: "dropdown-anti-age",
                    image: "../images/antiage.jpeg",
                    link: "details.html#antiage"
                }
            ]
        },

        {
            id: "immunite",
            title: "Cure Immunité et Renforcement du Corps",
            options: [
                {
                    name: "Immunité avec la naturopathie (plantes médicinales, probiotiques)",
                    price: "$120.00",
                    id: "dropdown-immunite",
                    image: "../images/naturopathie.jpeg",
                    link: "details.html#immunite"
                },
                {
                    name: "Immunité avec le sauna et le hammam (sudation, élimination des toxines)",
                    price: "$100.00",
                    id: "dropdown-immunite",
                    image: "../images/sauna.jpeg",
                    link: "details.html#immunite"
                }
            ]
        },

        {
            id: "dos",
            title: "Cure Spécial Dos",
            options: [
                {
                    name: "Soulagement du dos par l’hydrothérapie (bains chauds, jets d’eau ciblés)",
                    price: "$150.00",
                    id: "dropdown-dos",
                    image: "../images/bains_chaudes.jpeg",
                    link: "details.html#dos"
                },
                {
                    name: "Soulagement du dos par la kinésithérapie (massages thérapeutiques, exercices posturaux)",
                    price: "$150.00",
                    id: "dropdown-dos",
                    image: "../images/kinesytherapie.jpeg",
                    link: "details.html#dos"
                }
            ]
        },

        {
            id: "sante",
            title: "Cure Prévention Santé",
            options: [
                {
                    name: "Prévention santé par la micronutrition (vitamines, minéraux, alimentation adaptée)",
                    price: "$180.00",
                    id: "dropdown-sante",
                    image: "../images/micronutrition.jpeg",
                    link: "details.html#sante"
                },
                {
                    name: "Prévention santé par l’activité physique douce (marche, stretching, qi gong)",
                    price: "$200.00",
                    id: "dropdown-santes",
                    image: "../images/sante_douce.jpeg",
                    link: "details.html#sante"
                }
            ]
        },

        {
            id: "minceur",
            title: "Cure Minceur et Équilibre Alimentaire",
            options: [
                {
                    name: "Minceur avec diététique personnalisée (coaching alimentaire, repas équilibrés)",
                    price: "$110.00",
                    id: "dropdown-minceur",
                    image: "../images/detox_minceur.jpeg",
                    link: "details.html#minceur"
                },
                {
                    name: "Minceur avec activité physique douce (yoga, pilates, drainage lymphatique)",
                    price: "$180.00",
                    id: "dropdown-minceur",
                    image: "../images/yoga1.jpg",
                    link: "details.html#minceur"
                }
            ]
        }
    ];

    cures.forEach(cure => {
        // Création de la section
        const section = document.createElement("section");
        section.innerHTML = `
            <div class="container my-5 text-center" style="font-size: 20px;">
                <div class="row justify-content-center">
                    <p class="text-center" style="font-size: 30px;"><strong>${cure.title}</strong></p>
                    <div class="row">
                        ${cure.options.map(option => `
                            <div class="col-12 col-sm-6 d-flex justify-content-center">
                                <div class="card" style="width: 100%;">
                                    <div class="image-container d-flex justify-content-center">
                                        <img id = "${option.id}" src="${option.image}" class="card-img-top" alt="image" style="max-width: 100%; height: 350px;">
                                        <span class="image-info"><strong>${option.name}</strong></span>
                                    </div>
                                    <div class="card-body">
                                        <p class="card-text">Dès ${option.price}</p>
                                        <a href="${option.link}" class="btn btn-outline-primary text-dark">En savoir plus >></a>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        container.appendChild(section);
    });
});
