document.addEventListener("DOMContentLoaded", function () {
            const cures = [
                // Cure Détox et Purification
                {
                    code: 'CURE01',
                    id: 'detox', 
                    nom: 'Cure Détox et Purification',
                    description: 'Éliminez les toxines et revitalisez votre organisme avec des soins drainants et naturels.',
                    duree: '3 à 7 jours',
                    objectifs: 'Éliminer les toxines et revitaliser l’organisme.',
                    soins: 'Massages drainants, tisanes détox, séances de sauna, bains aux huiles essentielles.',
                    qui: 'Idéal pour ceux qui ressentent de la fatigue, des troubles digestifs ou un excès de stress.',
                    resultats: 'Sensation de légèreté, digestion améliorée, peau plus éclatante.',
                },

                // Cure Relaxation et Anti-Stress

                {
                    code: 'CURE02',
                    id: 'stress', 
                    nom: 'Cure Relaxation et Anti-Stress',
                    description: 'Retrouvez un bien-être profond avec des massages relaxants et des séances de méditation.',
                    duree: '5 à 10 jours',
                    objectifs: 'Réduire le stress et retrouver un bien-être intérieur.',
                    soins: 'Massages relaxants, méditation guidée, sophrologie, bains aromathérapeutiques.',
                    qui: 'Idéal pour ceux qui ressentent de la fatigue, des troubles digestifs ou un excès de stress',
                    resultats: 'Apaisement mental, réduction des tensions musculaires, sommeil réparateur.',
                },

                // Cure Revitalisation et Énergie

                {
                    code: 'CURE03',
                    id: 'revitalisation', 
                    nom: 'Cure Revitalisation et Énergie',
                    description: 'Boostez votre énergie et luttez contre la fatigue avec des soins revitalisants.',
                    duree: '4 à 7 jours',
                    objectifs: 'Booster l’énergie et restaurer la vitalité.',
                    soins: 'Hydrothérapie, exercices énergétiques, massages tonifiants, nutrition revitalisante.',
                    qui: 'Ceux qui ressentent une baisse d’énergie, une fatigue chronique ou une récupération lente.',
                    resultats: 'Plus d’énergie au quotidien, meilleure concentration, réduction de la fatigue.',
                },

                 // Cure Sommeil et Relaxation Profonde
                 {
                    code: 'CURE04',
                    id: 'relaxation', 
                    nom: 'Cure Sommeil et Relaxation Profonde',
                    description: 'Améliorez votre sommeil grâce à des thérapies naturelles et des techniques de relaxation.',
                    duree: '6 à 10 jours',
                    objectifs: 'Éliminer les toxines et revitaliser l’organisme.',
                    soins: 'Séances de relaxation, luminothérapie, massages aux huiles apaisantes, tisanes relaxantes.',
                    qui: 'Ceux qui souffrent d’insomnie, de sommeil perturbé ou de réveils nocturnes fréquents.',
                    resultats: 'Endormissement plus rapide, sommeil profond et réparateur, réduction du stress.',
                 },

                // Cure Minceur et Équilibre Alimentaire

                {
                    code: 'CURE05',
                    id: 'minceur', 
                    nom: 'Cure Minceur et Équilibre Alimentaire',
                    description: ' Affinez votre silhouette avec un programme combinant nutrition et soins spécifiques.',
                    duree: '7 à 14 jours',
                    objectifs: 'Perte de poids durable et équilibre nutritionnel.',
                    soins: 'Coaching diététique, massages amincissants, exercices physiques, soins drainants.',
                    qui: 'Ceux qui souhaitent perdre du poids de manière saine et durable.',
                    resultats: ' Silhouette affinée, meilleures habitudes alimentaires, bien-être général.',
                },

                // Cure Anti-Âge et Beauté

                {
                    code: 'CURE06',
                    id: 'antiage', 
                    nom: 'Cure Anti-Âge et Beauté',
                    description: 'Préservez votre jeunesse et votre éclat avec des soins anti-âge et raffermissants.',
                    duree: '5 à 10 jours',
                    objectifs: 'Préserver la jeunesse de la peau et revitaliser l’organisme.',
                    soins: 'Soins du visage, gommages, massages raffermissants, compléments antioxydants.',
                    qui: 'Personnes souhaitant lutter contre le vieillissement cutané et retrouver une peau éclatante.',
                    resultats: 'Peau plus ferme, teint éclatant, ralentissement du vieillissement cellulaire.',
                },

                  // Cure Immunité et Renforcement du Corps 

                  {
                    code: 'CURE07',
                    id: 'immunite', 
                    nom: 'Cure Immunité et Renforcement du Corps ',
                    description: 'Renforcez vos défenses naturelles avec un programme ciblé sur l’immunité.',
                    duree: '6 à 12 jours',
                    objectifs: 'Stimuler les défenses immunitaires et renforcer l’organisme.',
                    soins: 'Nutrition fortifiante, exercices doux, compléments naturels, séances de relaxation.',
                    qui: 'Idéal pour les personnes souvent malades ou en convalescence.',
                    resultats: 'Système immunitaire renforcé, meilleure résistance aux infections.',
                },

                 // Cure Spécial Dos
                 {
                    code: 'CURE08',
                    id: 'dos', 
                    nom: 'Cure Spécial Dos',
                    description: 'Soulagez vos douleurs dorsales et améliorez votre posture avec des soins thérapeutiques.',
                    duree: '6 à 10 jours',
                    objectifs: 'Soulager les douleurs dorsales et améliorer la posture.',
                    soins: 'Massages thérapeutiques, ostéopathie, séances de stretching, hydrothérapie.',
                    qui: 'Ceux qui souffrent de douleurs lombaires, cervicales ou de tensions musculaires.',
                    resultats: 'Moins de douleurs, meilleure posture, soulagement durable.',
                 },

                // Cure Prévention Santé 

                {
                    code: 'CURE09',
                    id: 'sante', 
                    nom: 'Cure Prévention Santé',
                    description: ' Affinez votre silhouette avec un programme combinant nutrition et soins spécifiques.',
                    duree: '7 à 14 jours',
                    objectifs: 'Prévenir les maladies chroniques et améliorer l’état général.',
                    soins: 'Bilan santé, suivi nutritionnel, exercices adaptés, thérapies naturelles.',
                    qui: 'Personnes soucieuses de leur santé et souhaitant prévenir les risques de maladies',
                    resultats: 'Meilleure forme physique et mentale, prévention des maladies chroniques.',
                },

                // Cure Remise en Forme

                {
                    code: 'CURE10',
                    id: 'forme', 
                    nom: 'Cure Remise en Forme',
                    description: 'Préservez votre santé et votre bien-être général avec un programme préventif personnalisé.',
                    duree: '5 à 10 jours',
                    objectifs: 'Retrouver un corps tonique et une bonne condition physique.',
                    soins: 'Séances de fitness, massages revitalisants, suivi nutritionnel, stretching',
                    qui: 'Ceux qui veulent retrouver la forme après une période de fatigue ou d’inactivité.',
                    resultats: 'Corps plus tonique, regain d’énergie, meilleure endurance.',
                }
               
            ];

            const curesList = document.getElementById('cures-list');

            if (!curesList) {
                console.error('Erreur : l\'élément avec l\'ID "cures-list" n\'a pas été trouvé.');
                return;
            }

            cures.forEach(cure => {
                const cureElement = document.createElement('div');
                cureElement.classList.add('col-12', 'col-md-6', 'col-lg-4', 'mb-4'); 

                const cureHtml = `
                    <div class="card shadow-sm h-100">
                        <div class="card-body">
                            <h5 id = "${(cure.id)}" class="card-title text-center">${cure.nom}</h5>
                            <p class="card-text" style="font-size: 20px; color: #333333; font-weight: normal;">${cure.description}</p>
                            <p>💡 <strong>Objectifs :</strong> ${cure.objectifs}</p>
                            <p>🕒 <strong>Durée :</strong> ${cure.duree} jours</p>
                            <p>🔹 <strong>Soins inclus :</strong> ${cure.soins}</p>
                            <p>👤 <strong>Pour qui :</strong> ${cure.qui}</p>
                            <p>✅ <strong> Résultats :</strong> ${cure.resultats}</p>
                            <a href="reservation.html" class="btn btn-primary">Reserver</a>
                        </div>
                    </div>
                `;

                cureElement.innerHTML = cureHtml;
                curesList.appendChild(cureElement);
            });
        });
   


