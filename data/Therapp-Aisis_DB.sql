
-- Suppression des anciennes tables si elles existent
DROP TABLE IF EXISTS utilisateurs CASCADE;
DROP TABLE IF EXISTS cures CASCADE;
DROP TABLE IF EXISTS sous_types CASCADE;
DROP TABLE IF EXISTS hebergement CASCADE;
DROP TABLE IF EXISTS vue_chambre CASCADE;
DROP TABLE IF EXISTS reservation_cure CASCADE;
DROP TABLE IF EXISTS reservation_chambre CASCADE;
DROP TABLE IF EXISTS favoris CASCADE;
DROP TABLE IF EXISTS paiements CASCADE;
DROP TABLE IF EXISTS commandes CASCADE;
DROP TABLE IF EXISTS commandes_details CASCADE;

-- Création des tables

CREATE TABLE utilisateurs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
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
    prix DECIMAL(10,2) NOT NULL CHECK (prix >= 0),
    image VARCHAR(255),
    FOREIGN KEY (id_cure) REFERENCES cures(id_cure) ON DELETE CASCADE
);

CREATE INDEX idx_sous_type_cure ON sous_types(id_cure);

CREATE TABLE hebergement (
    id_hebergement SERIAL PRIMARY KEY,  
    type_chambre TEXT NOT NULL,
    prix_base DECIMAL(10,2) NOT NULL CHECK (prix_base >= 0),
    image VARCHAR(255)
);

CREATE INDEX idx_hebergement_type ON hebergement(type_chambre);

CREATE TABLE vue_chambre (
    id_vue_chambre SERIAL PRIMARY KEY,  
    id_hebergement INT NOT NULL,  
    vue VARCHAR(255) NOT NULL,
    supplement DECIMAL(10,2) DEFAULT 0 CHECK (supplement >= 0),
    image VARCHAR(255),
    FOREIGN KEY (id_hebergement) REFERENCES hebergement(id_hebergement) ON DELETE CASCADE
);

CREATE INDEX idx_vue_chambre_hebergement ON vue_chambre(id_hebergement);

CREATE TABLE reservation_cure (
    id_reservation_cure SERIAL PRIMARY KEY,
    statut VARCHAR(100) DEFAULT 'En attente',
    user_id INT NULL,
    session_id VARCHAR(128) NULL,
    id_cure INT NOT NULL,
    id_sous_type INT NOT NULL,
    nom_sous_type VARCHAR(255) NOT NULL,
    prix DECIMAL(10,2) NOT NULL CHECK (prix >= 0),
    prix_total DECIMAL(10,2) NOT NULL CHECK (prix_total >= 0),
    FOREIGN KEY (user_id) REFERENCES utilisateurs(id) ON DELETE CASCADE,
    FOREIGN KEY (id_cure) REFERENCES cures(id_cure) ON DELETE CASCADE,
    FOREIGN KEY (id_sous_type) REFERENCES sous_types(id_sous_type) ON DELETE CASCADE
);

CREATE INDEX idx_res_cure_user_id ON reservation_cure(user_id);
CREATE INDEX idx_res_cure_session_id ON reservation_cure(session_id);

CREATE TABLE reservation_chambre (
    id_reservation_chambre SERIAL PRIMARY KEY,
    statut VARCHAR(100) DEFAULT 'En attente',
    user_id INT NULL,
    session_id VARCHAR(128) NULL,
    id_reservation_cure INT NOT NULL,
    id_hebergement INT NOT NULL,
    type_chambre TEXT NOT NULL,
    prix_base DECIMAL(10,2) NOT NULL CHECK (prix_base >= 0),
    id_vue_chambre INT NULL,
    vue TEXT NULL,
    supplement DECIMAL(10,2) DEFAULT 0 CHECK (supplement >= 0),
    date_arrivee DATE NOT NULL,
    date_depart DATE NOT NULL,
    prix_total DECIMAL(10,2) NOT NULL CHECK (prix_total >= 0),
    FOREIGN KEY (user_id) REFERENCES utilisateurs(id) ON DELETE CASCADE,
    FOREIGN KEY (id_reservation_cure) REFERENCES reservation_cure(id_reservation_cure) ON DELETE CASCADE,
    FOREIGN KEY (id_hebergement) REFERENCES hebergement(id_hebergement) ON DELETE CASCADE,
    FOREIGN KEY (id_vue_chambre) REFERENCES vue_chambre(id_vue_chambre) ON DELETE SET NULL
);

CREATE INDEX idx_res_chambre_user_id ON reservation_chambre(user_id);
CREATE INDEX idx_res_chambre_session_id ON reservation_chambre(session_id);

CREATE TABLE favoris (
    id_favoris SERIAL PRIMARY KEY,
    user_id INT NULL,
    session_id VARCHAR(255) DEFAULT NULL,
    id_cure INT NOT NULL,
    id_sous_type INT NOT NULL,
    nom_sous_type VARCHAR(255) NOT NULL,
    prix DECIMAL(10,2) NOT NULL CHECK (prix >= 0),
    prix_total DECIMAL(10,2) NULL CHECK (prix_total >= 0),
    FOREIGN KEY (user_id) REFERENCES utilisateurs(id) ON DELETE CASCADE,
    FOREIGN KEY (id_cure) REFERENCES cures(id_cure) ON DELETE CASCADE,
    FOREIGN KEY (id_sous_type) REFERENCES sous_types(id_sous_type) ON DELETE CASCADE
);

CREATE INDEX idx_favoris_user_id ON favoris(user_id);
CREATE INDEX idx_favoris_cure ON favoris(id_cure);

CREATE TABLE paiements (
    id SERIAL PRIMARY KEY,
    user_id INT NULL,
    session_id VARCHAR(255) NULL,
    prenom VARCHAR(100) NOT NULL,
    nom VARCHAR(100) NOT NULL,
    telephone VARCHAR(20) NOT NULL,
    email VARCHAR(150) NOT NULL,
    adresse_postale TEXT NOT NULL,
    ville VARCHAR(100) NOT NULL,
    code_postal VARCHAR(20) NOT NULL,
    date_enregistrement TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES utilisateurs(id) ON DELETE SET NULL
);

CREATE TABLE commandes (
    id_commande SERIAL PRIMARY KEY,
    user_id INT NULL,
    session_id VARCHAR(255) NULL,
    type VARCHAR(50) NOT NULL, -- 'cure' ou 'chambre'
    prix DECIMAL(10,2) NOT NULL CHECK (prix >= 0),
    date_commande DATE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES utilisateurs(id) ON DELETE SET NULL
);

CREATE TABLE commandes_details (
    id SERIAL PRIMARY KEY,
   -- id_commande INT NOT NULL, -- 🔥 Liaison obligatoire avec commandes*/
    user_id INT NULL,
    session_id VARCHAR(255) NULL,
    type VARCHAR(50) NOT NULL, -- 'cure' ou 'chambre'
    details JSONB NOT NULL,
    date_enregistrement TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- FOREIGN KEY (id_commande) REFERENCES commandes(id_commande) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES utilisateurs(id) ON DELETE SET NULL
);


GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE reservation_cure TO "www-data";
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE reservation_chambre TO "www-data";
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE favoris TO "www-data";
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE utilisateurs TO "www-data";
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE commandes TO "www-data";
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE hebergement TO "www-data";
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE vue_chambre TO "www-data";
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE sous_types TO "www-data";
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE cures TO "www-data";
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE paiements TO "www-data";
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE commandes_details TO "www-data";
GRANT USAGE, SELECT ON SEQUENCE favoris_id_favoris_seq TO "www-data";
GRANT USAGE, SELECT ON SEQUENCE cures_id_cure_seq TO "www-data";
GRANT USAGE, SELECT ON SEQUENCE hebergement_id_hebergement_seq TO "www-data";
GRANT USAGE, SELECT ON SEQUENCE sous_types_id_sous_type_seq TO "www-data";
GRANT USAGE, SELECT ON SEQUENCE paiements_id_seq TO "www-data";
GRANT USAGE, SELECT ON SEQUENCE commandes_details_id_seq TO "www-data";
GRANT USAGE, SELECT ON SEQUENCE utilisateurs_id_seq TO "www-data";
GRANT USAGE, SELECT ON SEQUENCE commandes_id_commande_seq TO "www-data";
GRANT USAGE, SELECT ON SEQUENCE reservation_chambre_id_reservation_chambre_seq TO "www-data";
GRANT USAGE, SELECT ON SEQUENCE reservation_cure_id_reservation_cure_seq TO "www-data";
GRANT USAGE, SELECT ON SEQUENCE vue_chambre_id_vue_chambre_seq TO "www-data";

-- Insérer des données dans la table cures

INSERT INTO utilisateurs (name, firstname, tel, email, mot_de_passe, role)
VALUES ('Admin', 'Principal', '+0000000000', 'admin@gmail.com', '$2y$10$MAhPgj.HpHc40e7QE/jgdejCBkjoXQtBErXo4T2CeODwS5rqxRFHa', 'admin');


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
    ((SELECT id_cure FROM cures WHERE nom = 'Cure Relaxation et Anti-Stress'), 'Relaxation par l’hydrothérapie (bains bouillonnants, douches sensorielles)', 140, '../images/douche_sensorielle.jpeg'),
    ((SELECT id_cure FROM cures WHERE nom = 'Cure Revitalisation et Énergie'), 'Revitalisation par les super-aliments (jus détox, compléments naturels)', 170, '../images/revitalisante.jpg'),
    ((SELECT id_cure FROM cures WHERE nom = 'Cure Revitalisation et Énergie'), 'Revitalisation par la luminothérapie (exposition à la lumière, soins énergétiques)', 160, '../images/luminotherapie.jpeg'),
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
 
--- Creer un utilisateur "www-data"
--- GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE reservation_cure TO "www-data";
--- GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE reservation_chambre TO "www-data";
--- GRANT USAGE, SELECT ON SEQUENCE favoris_id_favoris_seq TO "www-data";
--- GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE favoris TO "www-data";
--- GRANT USAGE, SELECT ON SEQUENCE reservation_chambre_id_reservation_chambre_seq TO "www-data";
--- GRANT USAGE, SELECT ON SEQUENCE reservation_cure_id_reservation_cure_seq TO "www-data";
--- GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE utilisateurs TO "www-data";
--- GRANT USAGE, SELECT ON SEQUENCE utilisateurs_id_seq TO "www-data";
--- GRANT USAGE, SELECT ON SEQUENCE commandes_id_commande_seq TO "www-data";
--- GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE commandes TO "www-data";
--- GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE hebergement TO "www-data";
--- GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE vue_chambre TO "www-data";
--- GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE sous_types TO "www-data";
--- GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE cures TO "www-data";
--- GRANT USAGE, SELECT ON SEQUENCE paiements_id_seq TO "www-data";
--- GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE paiements TO "www-data";
--- GRANT USAGE, SELECT ON SEQUENCE commandes_details_id_seq TO "www-data";
--- GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE commandes_details TO "www-data";




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

-- google-chrome --user-data-dir=/tmp/ChromeTest
/*

Pourquoi paiements et commandes utilisent session_id
Les utilisateurs peuvent :

naviguer, ajouter au panier,

réserver sans être connectés (mode invité),

et se connecter à la fin pour payer ou sauvegarder.

Donc, session_id permet de suivre leurs actions avant qu'ils aient un user_id.
*/


