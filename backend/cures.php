<?php
require 'db.php'; // Connexion à la base de données

// Récupération des cures avec leurs sous-types
$query = "SELECT c.id_cure, c.nom AS cure_nom, s.nom_sous_type, s.image, s.prix 
          FROM cures c
          JOIN sous_types s ON c.id_cure = s.id_cure";
$stmt = $pdo->prepare($query);
$stmt->execute();
$cures = $stmt->fetchAll(PDO::FETCH_ASSOC);


// Organisation des cures sous forme de tableau associatif
$curesOrganized = [];
foreach ($cures as $cure) {
    $idCure = $cure['id_cure'];
    if (!isset($curesOrganized[$idCure])) {
        $curesOrganized[$idCure] = [
            'nom' => $cure['cure_nom'],
            'options' => []
        ];
    }
    $curesOrganized[$idCure]['options'][] = [
        'nom' => $cure['nom_sous_type'],
        'image' => $cure['image'],
        'prix' => $cure['prix'],
        'link' => "cures_details.php?id=" . $idCure
    ];
}
?>

<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cures</title>
        
        <link href = "../styles/style.css" rel = "stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" 
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
       
        <script src="https://kit.fontawesome.com/14273d579a.js" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script> <!--pour bootstrap-->

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css"> <!--pour les icones-->
        <script src="../scripts/navbar.js" defer></script>
    </head>

    <body class="bg-success bg-opacity-10">
        <header>
            <nav class="navbar text-dark navbar-expand-md bg-light navbar-light bg-opacity-10" style="font-size: 25px;">
                <div class="container-fluid px-5 d-flex justify-content-between align-items-center">
                    
                    <a class="navbar-brand" href="../index.html">
                        <img src="../images/logo1.jpg" alt="logo du site" width="250" height="80">
                    </a>

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                                       
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto">
                            <li class="nav-item">
                                <a class="nav-link text-dark mx-3" href="../index.html">Accueil</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link text-dark mx-3" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Nos cures</a>
                                <ul class="dropdown-menu bg-light" style="width: 400px; text-decoration: none; padding: 10px; font-size: 25px;">
                                    <li><a href="cures.php#cure-détox-et-purification" class="text-dark" style="text-decoration: none;">Cure Détox et Purification</a></li>
                                    <li><a href="cures.php#cure-relaxation-et-anti-stress" class="text-dark" style="text-decoration: none;">Cure Relaxation et Anti-Stress</a></li>
                                    <li><a href="cures.php#cure-revitalisation-et-Énergie" class="text-dark" style="text-decoration: none;">Cure Revitalisation et Énergie</a></li>
                                    <li><a href="cures.php#cure-sommeil-et-relaxation-profonde" class="text-dark" style="text-decoration: none;">Cure Sommeil et Relaxation Profonde</a></li>
                                    <li><a href="cures.php#cure-minceur-et-Équilibre-alimentaire" class="text-dark" style="text-decoration: none;">Cure Minceur et Équilibre Alimentaire</a></li>
                                    <li><a href="cures.php#cure-anti-Âge-et-beauté" class="text-dark" style="text-decoration: none;">Cure Anti-Âge et Beauté</a></li>
                                    <li><a href="cures.php#cure-immunité-et-renforcement-du-corps" class="text-dark" style="text-decoration: none;">Cure Immunité et Renforcement du Corps</a></li>
                                    <li><a href="cures.php#cure-spécial-dos" class="text-dark" style="text-decoration: none;">Cure Spécial Dos</a></li>
                                    <li><a href="cures.php#cure-prévention-santé" class="text-dark" style="text-decoration: none;">Cure Prévention Santé</a></li>
                                    <li><a href="cures.php#cure-remise-en-forme" class="text-dark" style="text-decoration: none;">Cure Remise en Forme</a></li>
                                </ul>
                            </li>
                            
                            <li class="nav-item dropdown">
                                <!-- j'ai enleve dropdown-toggle de la classe nav-link pour cacher la fleche-->
                                <a class="nav-link text-dark mx-3" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Nos chambres</a>
                                <ul class="dropdown-menu bg-light" style="width: 350px; text-decoration: none; padding: 10px; font-size: 25px;">
                                    <li><a href="hebergement.php#chambres_standard" class="text-dark" style="text-decoration: none;">Chambre standard simple</a></li>
                                    <li><a href="hebergement.php#chambres_standard" class="text-dark" style="text-decoration: none;">Chambre standard double</a></li>
                                    <li><a href="hebergement.php#chambres_confort" class="text-dark" style="text-decoration: none;">Chambre confort simple</a></li>
                                    <li><a href="hebergement.php#chambres_confort" class="text-dark" style="text-decoration: none;">Chambre confort double</a></li>
                                    <li><a href="hebergement.php#suite" class="text-dark" style="text-decoration: none;">Suite</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    
                    <form class="d-flex">
                        <a href="#" id="search-icon" class="me-3">
                            <i class="bi bi-search" type="submit" style="font-size: 2rem; color: #333333; cursor: pointer;"></i>
                        </a>
                        <input id="search-bar" class="form-control me-2 d-none" type="search" placeholder="Rechercher..." aria-label="Search"> 
                        <a href="#" id="close-search" class="me-3 d-none">  
                            <i class="bi bi-x" style="font-size: 2rem; color: red; cursor: pointer;"></i>
                        </a>
                        <a href="../vues/login.html" class="me-3">
                            <i class="bi bi-person" style="font-size: 2rem; color: #333333;"></i>
                        </a>
                        <a href="#">
                            <i class="bi bi-cart4" style="font-size: 2rem; color: #333333"></i>
                        </a>
                      </form>
                </div>
            </nav>
        </header>
    <main>
    <section class="my-1">
         <div class="container-fluid">
            <div class="banniere">
                <h2>Therapp-Aisis, un havre de paix ! <br> Rééquilibrer votre énergie, revitalisez votre vie!</h2>
            </div> 
        </div>
    </section>
        <div id="cures-list">
            <?php foreach ($curesOrganized as $cure): ?>
                <section>
                    <div class="container my-5 text-center" style="font-size: 20px;">
                        <div class="row justify-content-center">
                            <!-- <p class="text-center" id ="" style="font-size: 30px;"><strong><?php echo htmlspecialchars($cure['nom']); ?></strong></p> -->
                            <p class="text-center" id="<?php echo strtolower(str_replace(' ', '-', $cure['nom'])); ?>" style="font-size: 30px;">
                                <strong><?php echo htmlspecialchars($cure['nom']); ?></strong>
                            </p>
                            <div class="row">
                                <?php foreach ($cure['options'] as $option): ?>
                                    <div class="col-12 col-sm-6 d-flex justify-content-center">
                                        <div class="card cure-card" style="width: 100%;">
                                            <div class="image-container d-flex justify-content-center">
                                                <img src="<?php echo htmlspecialchars($option['image']); ?>" class="card-img-top" alt="image" style="max-width: 100%; height: 350px;">
                                                <span class="image-info"><strong><?php echo htmlspecialchars($option['nom']); ?></strong></span>
                                            </div>
                                            <div class="card-body">
                                                <p class="card-text">Dès <?php echo htmlspecialchars($option['prix']); ?> €</p>
                                                <a href="<?php echo htmlspecialchars($option['link']); ?>" class="btn btn-outline-primary text-dark">En savoir plus >></a>

                                            </div>
                                        </div>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        </div>
                    </div>
                </section>
            <?php endforeach; ?>
        </div>
        <div class="text-center my-5">
            <a href="../index.html" class="btn btn-outline-primary">Retour à l'accueil</a>
        </div>
        <script src="../scripts/cures.js"></script>
    </main>
    <footer>
            <div class="container-fluid mt-5 text-center bg-secondary bg-opacity-25" style="font-size: 25px;">
                <div class="row">
                    <div class="col-sm-12 col-md-4">
                        <h3>Aide</h3>
                        <hr style="border: 2px solid black; margin-top: 20px;">

                        <!-- <a href="#">Conditions generales de vente</a><br> -->
                        <a href="../vues/a_propos_cures.html">A-propos</a><br>
                    </div>

                    <div class="col-sm-12 col-md-4">
                        <h3>L'entreprise</h3>
                        <hr style="border: 2px solid black; margin-top: 20px;">
                        <a href="#">Nous contacter</a><br>
                        <!-- <a href="#">Avis clients</a> -->
                    </div>

                    <div class = "col-sm-12 col-lg-4 text-center"> <!--les icones orientes a droite-->
                        <h3>Suivre notre actualite</h3>
                        <hr style="border: 2px solid black; margin-top: 20px;">
                        <ul class="list-inline"> <!--les icones sur une seule ligne-->
                            <li class="list-inline-item">
                                <a href = "https://www.instagram.com" target="_blank">
                                    <i class="bi-instagram" style="font-size: 2.5rem; color: black;"></i> 
                                </a>
                            </li>
                            <li class="list-inline-item">
                                <a href = "https://wwww.bi-youtube" target="_blank">
                                    <i class="bi-youtube" style="font-size: 2.5rem; color: black"></i>
                                </a>
                            </li>
                            <li class="list-inline-item">
                                <a href = "https://pinterest.com/" target="_blank">
                                    <i class="bi-pinterest" style="font-size: 2.5rem; color: black"></i>
                                </a>
                            </li>
                            <li class="list-inline-item">
                                <a href = "https://facebook.com/" target="_blank">
                                    <i class="bi-facebook" style="font-size: 2.5rem; color: black"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
</body>
</html>

<!-- /*

<script>
        function searchCure() {
            const searchInput = document.getElementById("searchInput");
            const searchValue = searchInput.value.toLowerCase();
            const cureCards = document.querySelectorAll(".cure-card");
            
            cureCards.forEach(card => {
                const cureName = card.querySelector(".image-info").textContent.toLowerCase();
                if (cureName.includes(searchValue)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        }

        document.getElementById("searchInput").addEventListener("input", searchCure);*/
    </script>*/ -->