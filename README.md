# Therapp-Aisis

**Therapp-Aisis** est une application web de réservation pour un centre thérapeutique et hôtelier. Elle permet aux utilisateurs de consulter les prestations de cures, les hébergements, et de réserver un séjour avec ou sans compte utilisateur.

---

## 🌐 Technologies utilisées

- **Frontend :** HTML5, CSS3, JavaScript (vanilla)
- **Backend :** PHP 8.x
- **Base de données :** PostgreSQL 13+
- **Serveur Web :** Apache2
- **OS recommandé :** Ubuntu 22.04 ou Debian-like

---

## 📦 Pré-requis

Assurez-vous que votre système dispose des composants suivants :

```bash
sudo apt update
sudo apt install apache2 php libapache2-mod-php php-pgsql postgresql postgresql-contrib
```


## ⚙️ Configuration PostgreSQL

### 1. Connexion au terminal PostgreSQL

```bash
sudo -u postgres psql
```

### 2. Création d’un utilisateur PostgreSQL

```sql
CREATE USER therapp_user WITH PASSWORD 'votre_mot_de_passe';
```

### 3. Création de la base de données

```sql
CREATE DATABASE therapp_db OWNER therapp_user;
```

### 4. Connexion à la base et création des tables

```bash
\c therapp_db
```

```sql
CREATE TABLE utilisateurs (
    id SERIAL PRIMARY KEY,
    pseudo VARCHAR(50),
    mot_de_passe VARCHAR(255)
);

-- Ajoute ici les autres tables : cures, sous_types, hebergement, vue_chambre, etc.
```

### 5. Accorder les droits

```sql
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO therapp_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO therapp_user;

GRANT USAGE, SELECT ON SEQUENCE utilisateurs_id_seq TO therapp_user;
GRANT USAGE, SELECT ON sequence reservation_id_reservation_seq TO therapp_user;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE utilisateurs TO therapp_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE vue_chambre TO therapp_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE hebergement TO therapp_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE sous_types TO therapp_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE cures TO therapp_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE reservation TO therapp_user;

```

---

## 🌍 Configuration Apache2

### 1. Activer PHP et Apache

```bash
sudo a2enmod php8.1
sudo systemctl restart apache2
sudo systemctl status apache2
```

### 2. Copier le projet dans `/var/www/html`

```bash
sudo cp -r Therapp-Aisis /var/www/html/
```

### 3. Vérifier les droits

```bash
sudo chown -R www-data:www-data /var/www/html/therapp-aisis
sudo chmod -R 755 /var/www/html/therapp-aisis
```

---

## 🔐 Configuration du fichier `connexion_bdd.php`

Dans `backend/db.php` :

```php
<?php
try {
    $pdo = new PDO("pgsql:host=localhost;dbname=therapp_db", "therapp_user", "votre_mot_de_passe");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Erreur de connexion : " . $e->getMessage();
    die();
}
?>
```

---

## 🚀 Lancer le projet

1. Ouvre ton navigateur et va sur :  
   `http://localhost/therapp-aisis/index.html`

2. Vérifie que les données s'affichent correctement (images, cures, hébergements...).

3. Tu peux tester les réservations via les formulaires HTML → PHP.

---

## 🧪 Données de test (optionnel)

Insère quelques données pour tester :

```sql
INSERT INTO hebergement (type, prixH, imageH) VALUES
('Chambre Standard', 79.90, 'assets/images/chambre_standard.jpg'),
('Chambre Confort', 109.90, 'assets/images/chambre_confort.jpg'),
('Suite Luxe', 189.90, 'assets/images/suite.jpg');
```

---

## 🛠️ Dépannage

- **Erreur 500 Apache** : vérifie les permissions des fichiers et les logs `sudo journalctl -xe` ou `/var/log/apache2/error.log`.
- **Problème de connexion DB** : assure-toi que le mot de passe, le nom de la base et l'utilisateur sont corrects.
- **CORS ou fetch échoue** : vérifie que les fichiers PHP sont dans le bon dossier et accessibles via Apache.

---

## 👤 Auteur

**Lesly Jumelle Toussaint**  
Projet personnel réalisé dans le cadre de l’apprentissage en développement web et data.

---

## 📃 Licence

Ce projet est libre pour une utilisation personnelle et éducative. Toute utilisation commerciale nécessite une autorisation préalable.
