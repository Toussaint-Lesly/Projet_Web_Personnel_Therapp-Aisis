
-- Suppression des anciennes tables si elles existent
DROP TABLE IF EXISTS utilisateurs CASCADE;
DROP TABLE IF EXISTS cures CASCADE;
DROP TABLE IF EXISTS sous_types CASCADE;
DROP TABLE IF EXISTS hebergement CASCADE;
DROP TABLE IF EXISTS vue_chambre CASCADE;
DROP TABLE IF EXISTS reservation CASCADE;

-- Création des tables

CREATE TABLE utilisateurs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    firstname VARCHAR(255),
    tel VARCHAR(20),
    role VARCHAR(50) DEFAULT 'utilisateur',
    email VARCHAR(255) UNIQUE NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL
);

CREATE TABLE cures (
    id_cure SERIAL PRIMARY KEY,  
    nom VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    duree VARCHAR(50) NOT NULL,
    objectifs TEXT NOT NULL,
    soins TEXT NOT NULL,
    cible TEXT NOT NULL,
    resultats TEXT NOT NULL
);

CREATE TABLE sous_types (
    id_sous_type SERIAL PRIMARY KEY,  
    id_cure INT NOT NULL,  
    nom_sous_type VARCHAR(255) NOT NULL,
    prix DECIMAL(10,2) NOT NULL,
    image VARCHAR(255),
    FOREIGN KEY (id_cure) REFERENCES cures(id_cure) ON DELETE CASCADE
);


CREATE TABLE hebergement (
    id_hebergement SERIAL PRIMARY KEY,  
    type_chambre TEXT NOT NULL,
    prix_base DECIMAL(10,2) NOT NULL CHECK (prix_base >= 0),
    image VARCHAR(255)
);


CREATE TABLE vue_chambre (
    id_vue_chambre SERIAL PRIMARY KEY,  
    id_hebergement INT NOT NULL,  
    vue VARCHAR(255) NOT NULL,
    supplement DECIMAL(10,2) DEFAULT 0 CHECK (supplement >= 0),
    image VARCHAR(255),
    FOREIGN KEY (id_hebergement) REFERENCES hebergement(id_hebergement) ON DELETE CASCADE
);


CREATE TABLE reservation (
    id_reservation SERIAL PRIMARY KEY,
    statut VARCHAR(100) DEFAULT 'En attente',

    -- Infos personnelles
    --- nom VARCHAR(100) NOT NULL,
    --- prenom VARCHAR(100) NOT NULL,
    --- telephone VARCHAR(20),
    --- email VARCHAR(150),
    --- adresse VARCHAR(255),

    -- Références (pour intégrité) + copies locales des valeurs affichées
    id_cure INT NOT NULL,
    description TEXT NOT NULL,   -- Copie figée de la description
    id_sous_type INT NOT NULL,
    nom_sous_type VARCHAR(255) NOT NULL,
    prix  DECIMAL(10,2) NOT NULL, -- Prix de la cure sélectionnée

    id_hebergement INT NULL,
    type_chambre TEXT NULL,       -- Copie du type de chambre
    prix_base DECIMAL(10,2) NULL,

    id_vue_chambre INT NULL,
    vue TEXT NULL,                         -- Copie de la vue choisie
    supplement DECIMAL(10,2) DEFAULT 0,

  

    -- Dates
    date_arrivee DATE NOT NULL,
    date_depart DATE NOT NULL,
    --- date_reservation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Prix total
    prix_total DECIMAL(10,2) NOT NULL,

    -- Clés étrangères
    FOREIGN KEY (id_cure) REFERENCES cures(id_cure) ON DELETE CASCADE,
    FOREIGN KEY (id_sous_type) REFERENCES sous_types(id_sous_type) ON DELETE CASCADE,
    FOREIGN KEY (id_hebergement) REFERENCES hebergement(id_hebergement) ON DELETE CASCADE,
    FOREIGN KEY (id_vue_chambre) REFERENCES vue_chambre(id_vue_chambre) ON DELETE SET NULL
);


-- Insérer des données dans la table cures

INSERT INTO utilisateurs (name, firstname, tel, email, mot_de_passe, role)
VALUES ('Admin', 'Principal', '+0000000000', 'admin@gmail.com', '$2y$10$c7OsE2cRgVs61wgbDhvI4.T4SmaWMk3CnWakV0vQfBoKv0UA3GIj6', 'admin');


INSERT INTO cures (nom, description, duree, objectifs, soins, cible, resultats) VALUES 
    ('Cure Détox et Purification', 
     'Programme de purification du corps avec des soins naturels.', 
     '3 à 7 jours', 
     'Éliminer les toxines et revitaliser l’organisme.', 
     'Massages drainants, tisanes détox, séances de sauna, bains aux huiles essentielles.', 
     'Idéal pour ceux qui ressentent de la fatigue, des troubles digestifs ou un excès de stress.',
     'Sensation de légèreté, digestion améliorée, peau plus éclatante.'
     ),

    ('Cure Revitalisation et Énergie',
     'Boostez votre énergie et luttez contre la fatigue avec des soins revitalisants.',
     '4 à 7 jours',
     'Booster l’énergie et restaurer la vitalité.',
     'Hydrothérapie, exercices énergétiques, massages tonifiants, nutrition revitalisante.',
     'Ceux qui ressentent une baisse d’énergie, une fatigue chronique ou une récupération lente.',
     'Plus d’énergie au quotidien, meilleure concentration, réduction de la fatigue.'
     ),

    ( 
     'Cure Sommeil et Relaxation Profonde',
     'Améliorez votre sommeil grâce à des thérapies naturelles et des techniques de relaxation.',
     '6 à 10 jours',
     'Éliminer les toxines et revitaliser l’organisme.',
     'Séances de relaxation, luminothérapie, massages aux huiles apaisantes, tisanes relaxantes.',
     'Ceux qui souffrent d’insomnie, de sommeil perturbé ou de réveils nocturnes fréquents.',
     'Endormissement plus rapide, sommeil profond et réparateur, réduction du stress.'
    ),

    (
     'Cure Minceur et Équilibre Alimentaire',
     'Affinez votre silhouette avec un programme combinant nutrition et soins spécifiques.',
     '7 à 14 jours',
     'Perte de poids durable et équilibre nutritionnel.',
     'Coaching diététique, massages amincissants, exercices physiques, soins drainants.',
     'Ceux qui souhaitent perdre du poids de manière saine et durable.',
     'Silhouette affinée, meilleures habitudes alimentaires, bien-être général.'
    ),

    (
     'Cure Anti-Âge et Beauté',
     'Préservez votre jeunesse et votre éclat avec des soins anti-âge et raffermissants.',
     '5 à 10 jours',
     'Préserver la jeunesse de la peau et revitaliser l’organisme.',
     'Soins du visage, gommages, massages raffermissants, compléments antioxydants.',
     'Personnes souhaitant lutter contre le vieillissement cutané et retrouver une peau éclatante.',
     'Peau plus ferme, teint éclatant, ralentissement du vieillissement cellulaire.'
    ),


    (
     'Cure Immunité et Renforcement du Corps',
     'Renforcez vos défenses naturelles avec un programme ciblé sur l’immunité.',
     '6 à 12 jours',
     'Stimuler les défenses immunitaires et renforcer l’organisme.',
     'Nutrition fortifiante, exercices doux, compléments naturels, séances de relaxation.',
     'Idéal pour les personnes souvent malades ou en convalescence.',
     'Système immunitaire renforcé, meilleure résistance aux infections.'
    ),
           
    (
     'Cure Spécial Dos',
     'Soulagez vos douleurs dorsales et améliorez votre posture avec des soins thérapeutiques.',
     '6 à 10 jours',
     'Soulager les douleurs dorsales et améliorer la posture.',
     'Massages thérapeutiques, ostéopathie, séances de stretching, hydrothérapie.',
     'Ceux qui souffrent de douleurs lombaires, cervicales ou de tensions musculaires.',
     'Moins de douleurs, meilleure posture, soulagement durable.'
    ),

    (
     'Cure Prévention Santé',
     'Affinez votre silhouette avec un programme combinant nutrition et soins spécifiques.',
     '7 à 14 jours',
     'Prévenir les maladies chroniques et améliorer l’état général.',
     'Bilan santé, suivi nutritionnel, exercices adaptés, thérapies naturelles.',
     'Personnes soucieuses de leur santé et souhaitant prévenir les risques de maladies',
     'Meilleure forme physique et mentale, prévention des maladies chroniques.'
    ),

    (
     'Cure Remise en Forme',
     'Préservez votre santé et votre bien-être général avec un programme préventif personnalisé.',
     '5 à 10 jours',
     'Retrouver un corps tonique et une bonne condition physique.',
     'Séances de fitness, massages revitalisants, suivi nutritionnel, stretching',
     'Ceux qui veulent retrouver la forme après une période de fatigue ou d’inactivité.',
     'Corps plus tonique, regain d’énergie, meilleure endurance.'
    ),
       
    ('Cure Relaxation et Anti-Stress', 
     'Programme de détente et de relaxation pour réduire le stress.', 
     '5 à 10 jours', 
     'Réduire le stress et retrouver un bien-être intérieur.', 
     'Massages relaxants, méditation guidée, sophrologie, bains aromathérapeutiques.', 
     'Idéal pour ceux qui ressentent de la fatigue, des troubles digestifs ou un excès de stress.', 
     'Apaisement mental, réduction des tensions musculaires, sommeil réparateur.'
     );

-- Insérer des données dans la table sous_types

INSERT INTO sous_types (id_cure, nom_sous_type, prix, image) VALUES 
    ((SELECT id_cure FROM cures WHERE nom = 'Cure Détox et Purification'), 'Détox aux thés (infusions purifiantes, drainage lymphatique)', 150, '../images/detox1_1.png'),
    ((SELECT id_cure FROM cures WHERE nom = 'Cure Détox et Purification'), 'Détox aux fruits et légumes', 130, '../images/detox_1.png'),
    ((SELECT id_cure FROM cures WHERE nom = 'Cure Relaxation et Anti-Stress'), 'Relaxation par l’aromathérapie (diffusion d’huiles essentielles, massages relaxants)', 150, '../images/antiStress.jpg'),
    ((SELECT id_cure FROM cures WHERE nom = 'Cure Relaxation et Anti-Stress'), 'Relaxation par l’hydrothérapie (bains bouillonnants, douches sensorielles)', 140, '../images/bains_chaudes.jpeg'),
    ((SELECT id_cure FROM cures WHERE nom = 'Cure Revitalisation et Énergie'), 'Revitalisation par les super-aliments (jus détox, compléments naturels)', 170, '../images/revitalisante.jpg'),
    ((SELECT id_cure FROM cures WHERE nom = 'Cure Revitalisation et Énergie'), 'Revitalisation par la luminothérapie (exposition à la lumière, soins énergétiques)', 160, '../images/detox1_1.png'),
    ((SELECT id_cure FROM cures WHERE nom = 'Cure Sommeil et Relaxation Profonde'), 'Sommeil réparateur par la sophrologie (séances de relaxation guidée, respiration)', 190, '../images/sommeil.jpg'),
    ((SELECT id_cure FROM cures WHERE nom = 'Cure Sommeil et Relaxation Profonde'), 'Sommeil profond par la phytothérapie (infusions calmantes, huiles relaxantes)', 130, '../images/sommeil1.jpg'),
    ((SELECT id_cure FROM cures WHERE nom = 'Cure Remise en Forme'), 'Remise en forme par le sport et le mouvement (séances de fitness, yoga, pilates, renforcement musculaire)', 180, '../images/yoga.jpg'),
    ((SELECT id_cure FROM cures WHERE nom = 'Cure Remise en Forme'), 'Remise en forme par la récupération et la relaxation (massages tonifiants, hydrothérapie, bains reminéralisants)', 200, '../images/massage.jpg'),        
    ((SELECT id_cure FROM cures WHERE nom = 'Cure Anti-Âge et Beauté'), 'Anti-âge par la nutrition (antioxydants, compléments pour la peau)', 200, '../images/aliments-immunite_anti-age.jpg'),
    ((SELECT id_cure FROM cures WHERE nom = 'Cure Anti-Âge et Beauté'), 'Anti-âge par les soins du visage (masques naturels, hydratation profonde)', 220, '../images/antiage.jpeg'),
    ((SELECT id_cure FROM cures WHERE nom = 'Cure Immunité et Renforcement du Corps'), 'Immunité avec la naturopathie (plantes médicinales, probiotiques)', 120, '../images/naturopathie.jpeg'),
    ((SELECT id_cure FROM cures WHERE nom = 'Cure Immunité et Renforcement du Corps'), 'Immunité avec le sauna et le hammam (sudation, élimination des toxines)', 100, '../images/sauna.jpeg'),
    ((SELECT id_cure FROM cures WHERE nom = 'Cure Spécial Dos'), 'Soulagement du dos par l’hydrothérapie (bains chauds, jets d’eau ciblés)', 150, '../images/bains_chaudes.jpeg'),
    ((SELECT id_cure FROM cures WHERE nom = 'Cure Spécial Dos'), 'Soulagement du dos par la kinésithérapie (massages thérapeutiques, exercices posturaux)', 150, '../images/kinesytherapie.jpeg'),
    ((SELECT id_cure FROM cures WHERE nom = 'Cure Prévention Santé'), 'Prévention santé par la micronutrition (vitamines, minéraux, alimentation adaptée)', 180, '../images/micronutrition.jpeg'),
    ((SELECT id_cure FROM cures WHERE nom = 'Cure Prévention Santé'), 'Prévention santé par l’activité physique douce (marche, stretching, qi gong)', 200, '../images/sante_douce.jpeg'),
    ((SELECT id_cure FROM cures WHERE nom = 'Cure Minceur et Équilibre Alimentaire'), 'Minceur avec diététique personnalisée (coaching alimentaire, repas équilibrés)', 110, '../images/detox_minceur.jpeg'),
    ((SELECT id_cure FROM cures WHERE nom = 'Cure Minceur et Équilibre Alimentaire'), 'Minceur avec activité physique douce (yoga, pilates, drainage lymphatique)', 180, '../images/yoga1.jpg');


-- Insérer des données dans la table hebergement

INSERT INTO hebergement (type_chambre, prix_base, image) VALUES
('Chambre standard simple', 80.00, '../images/standard_simple.jpg'),
('Chambre standard double', 110.00, '../images/standard_double.jpg'),
('Chambre confort simple', 100.00, '../images/confort_simple.jpg'),
('Chambre confort double', 130.00, '../images/confort_double.jpg'),
('Suite', 200.00, '../images/suite.jpg');

-- Vues pour la chambre 1 (standard simple)
INSERT INTO vue_chambre (id_hebergement, vue, supplement, image) VALUES
(1, 'Vue sur plage', 30.00, '../images/mer.jpg'),
(1, 'Vue sur piscine', 20.00, '../images/vu_piscine.jpg'),
(1, 'Vue sur jardin', 10.00, '../images/jardin.jpg'),
(1, 'Vue sur parc', 15.00, '../images/park.jpg');


-- Vues pour la chambre 2 (standard double)
INSERT INTO vue_chambre (id_hebergement, vue, supplement, image) VALUES
(2, 'Vue sur plage', 35.00, '../images/mer.jpg'),
(2, 'Vue sur piscine', 25.00, '../images/vu_piscine.jpg'),
(2, 'Vue sur jardin', 15.00, '../images/jardin.jpg'),
(2, 'Vue sur parc', 20.00, '../images/park.jpg');

-- Vues pour la chambre 3 (confort simple)
INSERT INTO vue_chambre (id_hebergement, vue, supplement, image) VALUES
(3, 'Vue sur plage', 40.00, '../images/mer.jpg'),
(3, 'Vue sur piscine', 30.00, '../images/vu_piscine.jpg'),
(3, 'Vue sur jardin', 20.00, '../images/jardin.jpg'),
(3, 'Vue sur parc', 25.00, '../images/park.jpg');

-- Vues pour la chambre 4 (confort double)
INSERT INTO vue_chambre (id_hebergement, vue, supplement, image) VALUES
(4, 'Vue sur plage', 45.00, '../images/mer.jpg'),
(4, 'Vue sur piscine', 35.00, '../images/vu_piscine.jpg'),
(4, 'Vue sur jardin', 25.00, '../images/jardin.jpg'),
(4, 'Vue sur parc', 30.00, '../images/park.jpg');

-- Vues pour la suite
INSERT INTO vue_chambre (id_hebergement, vue, supplement, image) VALUES
(5, 'Vue sur plage', 50.00, '../images/mer.jpg'),
(5, 'Vue sur piscine', 40.00, '../images/vu_piscine.jpg'),
(5, 'Vue sur jardin', 30.00, '../images/jardin.jpg'),
(5, 'Vue sur parc', 35.00, '../images/park.jpg');



--- Importer mon fichir dans la base de donnees therapp_db:
--- psql -U postgres -d therapp_db -f /home/lesly/Documents/Therapp_Aisis_Projet/data/Therapp-Aisis_DB.sql


--- acceder a la base de donnees therapp_db :
--- psql -U postgres -d therapp_db

--- Voir les tables de la base :
--- \dt
 
--- Creer u utilisateur "www-data"
--- Donner privilege  et les droits sur les tables 
--- GRANT ALL PRIVILEGES ON DATABASE therapp_db TO "www-data";
--- GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE cures TO "www-data";
--- GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE hebergements TO "www-data";
--- GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE sous_types TO "www-data";
--- GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE vue_chambre TO "www-data";
--- GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE utilisateurs TO "www-data";
--- GRANT USAGE, SELECT ON SEQUENCE utilisateurs_id_seq TO "www-data";




/*
Therapp_Aisis_Projet/
├── backend/
│   └── reservation.php,.....         <-- fichier PHP
├── vues/
│   └── reservation.html , ....       <-- page HTML visible par l’utilisateur
├── Scripts/
│   └── reservation.js , ....         <-- script JS lié à reservation.html
├── data/
│   └── Therapp-Aisis_DB.sql    <-- fichier PHP
├── styles/
│   └── style.css               <-- page css
├── images/
│   └── ......                  <-- les images
___index.html
*/