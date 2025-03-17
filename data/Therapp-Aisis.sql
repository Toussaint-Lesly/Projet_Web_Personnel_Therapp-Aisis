-- Suppression des tables si elles existent
DROP TABLE IF EXISTS prestations CASCADE;
DROP TABLE IF EXISTS contient_objectifs CASCADE;
DROP TABLE IF EXISTS objectifs_prestations CASCADE;
DROP TABLE IF EXISTS contient_soins CASCADE;
DROP TABLE IF EXISTS soins CASCADE;
DROP TABLE IF EXISTS criteres CASCADE;
DROP TABLE IF EXISTS contient_etapes CASCADE;
DROP TABLE IF EXISTS periode CASCADE;
DROP TABLE IF EXISTS etapes CASCADE;
DROP TABLE IF EXISTS tarif_prestations CASCADE;
DROP TABLE IF EXISTS saisons CASCADE;
DROP TABLE IF EXISTS tarif_hebergements CASCADE;
DROP TABLE IF EXISTS vu_chambre CASCADE;
DROP TABLE IF EXISTS type_chambre CASCADE;
DROP TABLE IF EXISTS utilisateur CASCADE;

-- Création des tables
CREATE TABLE prestations (
    code_prestation VARCHAR(5) PRIMARY KEY,
    type_prestation VARCHAR(30) NOT NULL,
    nom_prestation VARCHAR(30) NOT NULL,
    desc_prestation TEXT
);

CREATE TABLE contient_objectifs (
    code_prestation VARCHAR(5),
    code_objectifs VARCHAR(5),
    CONSTRAINT PK_1 PRIMARY KEY (code_prestation, code_objectifs),
    CONSTRAINT code_prestation_ref_prestations_fkey FOREIGN KEY (code_prestation) REFERENCES prestations(code_prestation) ON DELETE CASCADE,
    CONSTRAINT code_objectifs_ref_objectifs_prestations_fkey FOREIGN KEY (code_objectifs) REFERENCES objectifs_prestations(code_objectifs)
);

CREATE TABLE objectifs_prestations (
    code_objectifs VARCHAR(5) PRIMARY KEY,
    desc_objectifs VARCHAR(60) NOT NULL
);

CREATE TABLE contient_soins (
    code_prestation VARCHAR(5),
    code_soin VARCHAR(5),
    occurence NUMERIC(2),
    CONSTRAINT PK_2 PRIMARY KEY (code_prestation, code_soin),
    CONSTRAINT code_prestation_ref_prestations_fkey FOREIGN KEY (code_prestation) REFERENCES prestations(code_prestation) ON DELETE CASCADE,
    CONSTRAINT code_soin_ref_soins_fkey FOREIGN KEY (code_soin) REFERENCES soins(code_soin)
);

CREATE TABLE soins (
    code_soin VARCHAR(5) PRIMARY KEY,
    libelle_soins VARCHAR(100) NOT NULL,
    duree_soins INTERVAL NOT NULL,
    effectifs_max NUMERIC(2)
);

CREATE TABLE criteres (
    code_criteres VARCHAR(6) PRIMARY KEY,
    libelle_criteres VARCHAR(75) NOT NULL,
    code_prestation VARCHAR(5),
    CONSTRAINT code_prestation_ref_prestations_fkey FOREIGN KEY (code_prestation) REFERENCES prestations(code_prestation)
);

CREATE TABLE contient_etapes (
    code_soin VARCHAR(5),
    code_etape VARCHAR(5),
    numero_etape NUMERIC(2),
    CONSTRAINT PK_3 PRIMARY KEY (code_soin, code_etape),
    CONSTRAINT code_soin_ref_soins_fkey FOREIGN KEY (code_soin) REFERENCES soins(code_soin),
    CONSTRAINT code_etape_ref_etapes_fkey FOREIGN KEY (code_etape) REFERENCES etapes(code_etape)
);

CREATE TABLE etapes (
    code_etape VARCHAR(5) PRIMARY KEY,
    duree TIME NOT NULL CHECK (duree > '00:00:00'),
    desc_etape VARCHAR(100)
);

CREATE TABLE tarif_prestations (
    code_prestation VARCHAR(5),
    nom_saison VARCHAR(40),
    prix_prestation NUMERIC(3) CHECK (prix_prestation >= 0),
    CONSTRAINT PK_4 PRIMARY KEY (code_prestation, nom_saison),
    CONSTRAINT code_prestation_ref_prestations_fkey FOREIGN KEY (code_prestation) REFERENCES prestations(code_prestation),
    CONSTRAINT nom_saison_ref_saisons_fkey FOREIGN KEY (nom_saison) REFERENCES saisons(nom_saison)
);

CREATE TABLE saisons (
    nom_saison VARCHAR(40) PRIMARY KEY
);

CREATE TABLE periode (
    date_debut DATE PRIMARY KEY,
    date_fin DATE,
    nom_saison VARCHAR(40),
    CONSTRAINT nom_saison_ref_saisons_fkey FOREIGN KEY (nom_saison) REFERENCES saisons(nom_saison)
);

CREATE TABLE utilisateur (
    id SERIAL PRIMARY KEY,
    pseudo VARCHAR(25),
    password TEXT
);

CREATE TABLE tarif_hebergements (
    nom_saison VARCHAR(40) NOT NULL,
    id_type_chambre VARCHAR(3),
    id_vu_chambre VARCHAR(3),
    prix_hebergement NUMERIC(3) CHECK (prix_hebergement >= 0),
    CONSTRAINT PK_5 PRIMARY KEY (nom_saison, id_type_chambre, id_vu_chambre),
    CONSTRAINT nom_saison_ref_saisons_fkey FOREIGN KEY (nom_saison) REFERENCES saisons(nom_saison),
    CONSTRAINT id_type_chambre_ref_type_chambre_fkey FOREIGN KEY (id_type_chambre) REFERENCES type_chambre(id_type_chambre),
    CONSTRAINT id_vu_chambre_ref_vu_chambre_fkey FOREIGN KEY (id_vu_chambre) REFERENCES vu_chambre(id_vu_chambre)
);

CREATE TABLE vu_chambre (
    id_vu_chambre VARCHAR(12) PRIMARY KEY,
    desc_vu_chambre VARCHAR(20)
);

CREATE TABLE type_chambre (
    id_type_chambre VARCHAR(3) PRIMARY KEY,
    desc_type_chambre VARCHAR(100),
    nb_personnes INT
);

-- Ajout des index pour optimiser les performances
CREATE INDEX idx_prestation ON prestations(code_prestation);
CREATE INDEX idx_tarif_saison ON tarif_prestations(nom_saison);
CREATE INDEX idx_contient_objectifs ON contient_objectifs(code_prestation, code_objectifs);

-- Création des vues
CREATE VIEW critere_taille AS (
    SELECT code_prestation FROM prestations NATURAL JOIN criteres WHERE libelle_criteres = 'Tour de taille'
);

CREATE VIEW prix_chere AS (
    SELECT DISTINCT ON (prix_prestation) nom_prestation, nom_saison, prix_prestation 
    FROM prestations 
    NATURAL JOIN tarif_prestations 
    NATURAL JOIN saisons  
    ORDER BY prix_prestation DESC 
    LIMIT 3
);
