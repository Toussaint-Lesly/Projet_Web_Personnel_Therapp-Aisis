
DROP TABLE IF EXISTS prestations CASCADE;
DROP TABLE IF EXISTS contient_soins CASCADE;
DROP TABLE IF EXISTS soins CASCADE;
DROP TABLE IF EXISTS contient_etapes CASCADE;
DROP TABLE IF EXISTS etapes CASCADE;
DROP TABLE IF EXISTS tarif_prestations CASCADE;
DROP TABLE IF EXISTS saisons CASCADE;
DROP TABLE IF EXISTS utilisateur CASCADE;
DROP TABLE IF EXISTS tarif_hebergements CASCADE;
DROP TABLE IF EXISTS type_chambre CASCADE;
DROP TABLE IF EXISTS reservation_cure CASCADE;
DROP TABLE IF EXISTS reservation_hebergement CASCADE;

-- Creation des tables---


CREATE TABLE prestations (
    code_prestation VARCHAR(5) PRIMARY KEY,
    nom_prestation VARCHAR(50) NOT NULL,
    objectif TEXT NOT NULL,
    duree_min INT NOT NULL,
    duree_max INT NOT NULL,
    soins_inclus TEXT NOT NULL,
    critere TEXT,
    public_cible TEXT,
    resultats TEXT
);

INSERT INTO prestations (code_prestation, nom_prestation, objectif, duree_min, duree_max, soins_inclus, critere, public_cible, resultats) VALUES
('P001', 'Cure Détox', 'Éliminer les toxines', 3, 7, 'Massages, tisanes, sauna', 'Fatigue', 'Personnes stressées', 'Vitalité accrue'),
('P002', 'Cure Relaxation', 'Réduire le stress', 5, 10, 'Massages, méditation, bains aromatiques', 'Stress', 'Personnes anxieuses', 'Apaisement mental'),
('P003', 'Cure Revitalisation', 'Booster l’énergie', 4, 7, 'Hydrothérapie, fitness, nutrition', 'Fatigue', 'Fatigue chronique', 'Plus d’énergie'),
('P004', 'Cure Sommeil', 'Améliorer le sommeil', 6, 10, 'Relaxation, luminothérapie, huiles', 'Insomnie', 'Troubles du sommeil', 'Sommeil réparateur'),
('P005', 'Cure Minceur', 'Perte de poids durable', 7, 14, 'Coaching, massages, sport', 'Tour de taille', 'Perte de poids', 'Silhouette affinée'),
('P006', 'Cure Anti-Âge', 'Préserver la jeunesse', 5, 10, 'Soins visage, antioxydants', 'Vieillissement', 'Personnes âgées', 'Peau raffermie'),
('P007', 'Cure Immunité', 'Renforcer l’organisme', 6, 12, 'Nutrition, relaxation, compléments', 'Faible immunité', 'Personnes souvent malades', 'Moins d’infections'),
('P008', 'Cure Dos', 'Soulager les douleurs dorsales', 5, 10, 'Massages, ostéopathie, stretching', 'Douleurs', 'Tensions musculaires', 'Meilleure posture'),
('P009', 'Cure Prévention Santé', 'Prévenir les maladies', 7, 14, 'Bilan, thérapies naturelles', 'Prévention', 'Personnes soucieuses de leur santé', 'État général amélioré'),
('P010', 'Cure Remise en Forme', 'Retrouver tonus et endurance', 5, 10, 'Fitness, massages, stretching', 'Forme physique', 'Fatigue passagère', 'Regain d’énergie');


CREATE TABLE soins (
	code_soin varchar(5) primary key,
    libelle_soins varchar(100) not null,
    duree_soins interval not null,
    effectifs_max numeric(2) 
);

INSERT INTO soins (code_soin, libelle_soins, duree_soins, effectifs_max) VALUES
('S001', 'Massage relaxant', '00:45:00', 3), ('S002', 'Hydrothérapie', '00:30:00', 2),
('S003', 'Enveloppement d’algues', '00:50:00', 1), ('S004', 'Méditation guidée', '00:20:00', 5),
('S005', 'Luminothérapie', '00:30:00', 4), ('S006', 'Coaching diététique', '01:00:00', 2),
('S007', 'Ostéopathie', '00:45:00', 1), ('S008', 'Cryothérapie', '00:25:00', 2),
('S009', 'Massage tonifiant', '00:50:00', 3), ('S010', 'Séance de fitness', '01:00:00', 6);

CREATE TABLE contient_soins (
	code_prestation varchar(5),
	code_soin varchar(5),
	occurence numeric(2),
	constraint PK_2 primary key (code_prestation, code_soin) 
);

INSERT INTO contient_soins (code_prestation, code_soin, occurence) VALUES
('P001', 'S001', 2), -- Cure Détox inclut 2 massages relaxants
('P001', 'S002', 1), -- Cure Détox inclut 1 séance d’hydrothérapie
('P002', 'S004', 3), -- Cure Relaxation inclut 3 séances de méditation
('P002', 'S005', 2), -- Cure Relaxation inclut 2 séances de luminothérapie
('P003', 'S006', 1), -- Cure Revitalisation inclut 1 coaching diététique
('P003', 'S009', 2), -- Cure Revitalisation inclut 2 massages tonifiants
('P004', 'S007', 1), -- Cure Sommeil inclut 1 séance d’ostéopathie
('P005', 'S010', 4), -- Cure Minceur inclut 4 séances de fitness
('P006', 'S008', 1), -- Cure Anti-Âge inclut 1 cryothérapie
('P007', 'S003', 2); -- Cure Immunité inclut 2 enveloppements d’algues

CREATE TABLE etapes (
	code_etape varchar(5) primary key,
	duree time not null,
	desc_etape varchar(100)
);

INSERT INTO etapes (code_etape, duree, desc_etape) VALUES
('E001', '00:10:00', 'Détente du patient avant le soin'),
('E002', '00:15:00', 'Échauffement musculaire'),
('E003', '00:20:00', 'Application d’huiles essentielles'),
('E004', '00:10:00', 'Massage thérapeutique'),
('E005', '00:30:00', 'Phase de relaxation profonde'),
('E006', '00:20:00', 'Hydrothérapie et bain thermal'),
('E007', '00:25:00', 'Séance de luminothérapie'),
('E008', '00:10:00', 'Respiration guidée et méditation'),
('E009', '00:15:00', 'Application de boues marines'),
('E010', '00:20:00', 'Finalisation et conseils post-soin');

CREATE TABLE contient_etapes (
	code_soin varchar(5),
	code_etape varchar(5),
    numero_etape numeric(2),
	constraint PK_3 primary key (code_soin, code_etape) 
);

INSERT INTO contient_etapes (code_soin, code_etape, numero_etape) VALUES
('S001', 'E001', 1), -- Massage relaxant commence par détente
('S001', 'E003', 2), -- Puis application d’huiles essentielles
('S001', 'E004', 3), -- Puis massage thérapeutique
('S002', 'E006', 1), -- Hydrothérapie commence directement avec le bain thermal
('S004', 'E008', 1), -- Méditation commence par respiration guidée
('S005', 'E007', 1), -- Luminothérapie commence immédiatement
('S006', 'E009', 1), -- Coaching diététique commence avec application de boues
('S007', 'E002', 1), -- Ostéopathie commence par échauffement
('S009', 'E010', 3), -- Massage tonifiant se termine par conseils post-soin
('S010', 'E005', 2); -- Fitness se termine par relaxation profonde

CREATE TABLE tarif_prestations (
	code_prestation varchar(5),
	nom_saison varchar(40),
	prix_prestation numeric(3),
	constraint PK_4 primary key (code_prestation, nom_saison) 
);


INSERT INTO tarif_prestations (code_prestation, nom_saison, prix_prestation) VALUES
('P001', 'Hiver', 250), ('P002', 'Printemps', 300), ('P003', 'Été', 400),
('P004', 'Automne', 350), ('P005', 'Hiver', 450), ('P006', 'Printemps', 500),
('P007', 'Été', 550), ('P008', 'Automne', 400), ('P009', 'Hiver', 600), ('P010', 'Printemps', 500);

CREATE TABLE saisons (
    nom_saison varchar(40) primary key,
    date_debut date,
    date_fin date
);

INSERT INTO saisons (nom_saison, date_debut, date_fin) VALUES
('Hiver', '2024-01-01', '2024-03-31'), ('Printemps', '2024-04-01', '2024-06-30'),
('Été', '2024-07-01', '2024-09-30'), ('Automne', '2024-10-01', '2024-12-31');

CREATE TABLE utilisateur (
    id serial primary key,
    pseudo varchar(25),
    password text,
    email varchar(100) UNIQUE NOT NULL
);

INSERT INTO utilisateur (pseudo, password, email) VALUES
('user1', 'pass123', 'email1'), ('user2', 'securepass', 'email5'), ('user3', 'mypassword', 'email8'),
('user4', 'hashpass', 'email2'), ('user5', 'pass456', 'email6'), ('user6', 'data123', 'email9'),
('user7', 'pgpass', 'email3'), ('user8', 'userpass', 'email7'), ('user9', 'testpass', 'email10'),
('user10', 'hello123', 'email4');

CREATE TABLE tarif_hebergements (
	nom_saison varchar(40) not null,
	id_type_chambre varchar(6),
	prix_hebergement numeric(3),
	constraint PK_5 primary key (nom_saison, id_type_chambre) 
);

INSERT INTO tarif_hebergements (nom_saison, id_type_chambre, prix_hebergement) VALUES
('Hiver', 'CH1', 120),
('Hiver', 'CH2', 150),
('Printemps', 'CH3', 180),
('Printemps', 'CH4', 200),
('Été', 'CH5', 250),
('Été', 'CH6', 300),
('Automne', 'CH7', 220),
('Automne', 'CH8', 280),
('Hiver', 'CH9', 170),
('Printemps', 'CH10', 130);

CREATE TABLE type_chambre (
	id_type_chambre varchar(6) primary key,
	desc_type_chambre varchar (100),
    nb_personnes INT,
    desc_vu_chambre varchar (20)
);

INSERT INTO type_chambre (id_type_chambre, desc_type_chambre, nb_personnes, desc_vu_chambre) VALUES
('CH1', 'Chambre simple', 1, 'Vue mer'),
('CH2', 'Chambre double', 2, 'Vue jardin'),
('CH3', 'Suite luxe', 3, 'Vue mer'),
('CH4', 'Bungalow', 4, 'Vue tropicale'),
('CH5', 'Chambre économique', 1, 'Vue rue'),
('CH6', 'Chambre familiale', 4, 'Vue jardin'),
('CH7', 'Penthouse', 2, 'Vue panoramique'),
('CH8', 'Chalet privé', 6, 'Vue montagne'),
('CH9', 'Chambre classique', 2, 'Vue mer'),
('CH10', 'Studio cosy', 2, 'Vue rue');

CREATE TABLE reservation_cure (
    id_reservation_cure SERIAL PRIMARY KEY,
    id_utilisateur INT NOT NULL,
    code_prestation VARCHAR(5) NOT NULL,
    date_reservation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    statut VARCHAR(20) DEFAULT 'en attente',
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id),
    FOREIGN KEY (code_prestation) REFERENCES prestations(code_prestation)
);

INSERT INTO reservation_cure (id_utilisateur, code_prestation, date_reservation, statut) VALUES
(1, 'P001', '2024-06-01', 'Confirmée'), (2, 'P002', '2024-06-05', 'En attente'),
(3, 'P003', '2024-07-10', 'Annulée'), (4, 'P004', '2024-07-15', 'Confirmée'),
(5, 'P005', '2024-08-01', 'En attente'), (6, 'P006', '2024-08-05', 'Confirmée'),
(7, 'P007', '2024-09-01', 'Confirmée'), (8, 'P008', '2024-09-10', 'Annulée'),
(9, 'P009', '2024-10-01', 'Confirmée'), (10, 'P010', '2024-10-05', 'En attente');

CREATE TABLE reservation_hebergement (
    id_reservation_hebergement SERIAL PRIMARY KEY,
    id_reservation_cure INT NOT NULL,
    id_type_chambre VARCHAR(3) NOT NULL,
    date_debut DATE NOT NULL,
    date_fin DATE NOT NULL,
    statut VARCHAR(20) DEFAULT 'en attente',
    FOREIGN KEY (id_reservation_cure) REFERENCES reservation_cure(id_reservation_cure) ON DELETE CASCADE,
    FOREIGN KEY (id_type_chambre) REFERENCES type_chambre(id_type_chambre)
);

INSERT INTO reservation_hebergement (id_reservation_cure, id_type_chambre, date_debut, date_fin, statut) VALUES
(1, 'CH1', '2024-06-01', '2024-06-07', 'Confirmée'),
(2, 'CH2', '2024-06-05', '2024-06-10', 'En attente'),
(4, 'CH3', '2024-07-15', '2024-07-20', 'Confirmée'),
(6, 'CH4', '2024-08-05', '2024-08-12', 'Confirmée'),
(7, 'CH5', '2024-09-01', '2024-09-08', 'Confirmée'),
(9, 'CH6', '2024-10-01', '2024-10-14', 'Confirmée'),
(3, 'CH2', '2024-07-12', '2024-07-18', 'Annulée'),
(5, 'CH4', '2024-08-02', '2024-08-07', 'Confirmée'),
(8, 'CH1', '2024-09-11', '2024-09-18', 'Annulée'),
(10, 'CH3', '2024-10-06', '2024-10-12', 'En attente');


ALTER TABLE contient_soins
    ADD CONSTRAINT code_prestation_ref_prestations_fkey FOREIGN KEY (code_prestation) REFERENCES prestations(code_prestation);


ALTER TABLE contient_soins
    ADD CONSTRAINT code_soin_ref_soins_fkey FOREIGN KEY (code_soin) REFERENCES soins(code_soin);


ALTER TABLE tarif_prestations
    ADD CONSTRAINT code_prestation_ref_prestations_fkey FOREIGN KEY (code_prestation) REFERENCES prestations(code_prestation);


ALTER TABLE contient_etapes
    ADD CONSTRAINT code_soin_ref_soins_fkey FOREIGN KEY (code_soin) REFERENCES soins(code_soin);


ALTER TABLE contient_etapes
    ADD CONSTRAINT code_etape_ref_etapes_fkey FOREIGN KEY (code_etape) REFERENCES etapes(code_etape);


ALTER TABLE tarif_prestations
    ADD CONSTRAINT nom_saison_ref_saisons_fkey FOREIGN KEY (nom_saison) REFERENCES saisons(nom_saison);


ALTER TABLE tarif_hebergements
    ADD CONSTRAINT nom_saison_ref_saisons_fkey FOREIGN KEY (nom_saison) REFERENCES saisons(nom_saison);


ALTER TABLE tarif_hebergements
    ADD CONSTRAINT id_type_chambre_ref_type_chambre_fkey FOREIGN KEY (id_type_chambre) REFERENCES type_chambre(id_type_chambre);


CREATE VIEW prix_chere AS (
	SELECT DISTINCT nom_prestation, nom_saison, prix_prestation FROM prestations NATURAL JOIN tarif_prestations NATURAL JOIN saisons  ORDER BY prix_prestation DESC LIMIT 3	
);


--- Importer mon fichir dans la base de donnees therapp_db:
--- psql -U postgres -d therapp_db -f /home/lesly/Documents/Therapp_Aisis_Projet/data/Therapp-Aisis_DB.sql


--- acceder a la base de donnees therapp_db :
--- psql -U postgres -d therapp_db

--- Voir les tables de la base :
--- \dt

--- Node js
--- Tester la connexion : node db.js
--- tester la base de donnees avec Node Js : node test_db.js
