<?php

// Organisation des données dans un tableau structuré
$hebergementsOrganized = [];
foreach ($hebergements as $hebergement) {
    $idhebergement = $hebergement['id_hebergement'];
    if (!isset($hebergementsOrganized[$idhebergement])) {
        $hebergementsOrganized[$idhebergement] = [
            'type' => isset($hebergement['type_chambre']) ? $hebergement['type_chambre'] : 'Inconnu', // Alias correct
            'imageH' => isset($hebergement['image']) ? $hebergement['image'] : 'default_image.jpg', // Alias correct
            'prixH' => isset($hebergement['prix_base']) ? $hebergement['prix_base'] : 0.00, // Alias correct
        ];
    }
}

require 'db.php'; // Connexion à la base de données

// Requête SQL pour récupérer les données de la table 'hebergement'
$query = "SELECT * FROM hebergement";

$stmt = $pdo->prepare($query);
$stmt->execute();
$hebergements = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Organisation des données dans un tableau structuré pour les hébergements
$hebergementsOrganized = [];
foreach ($hebergements as $hebergement) {
    $idhebergement = $hebergement['id_hebergement'];
    if (!isset($hebergementsOrganized[$idhebergement])) {
        $hebergementsOrganized[$idhebergement] = [
            'type' => isset($hebergement['type_chambre']) ? $hebergement['type_chambre'] : 'Inconnu', // Alias correct
            'imageH' => isset($hebergement['image']) ? $hebergement['image'] : 'default_image.jpg', // Alias correct
            'prixH' => isset($hebergement['prix_base']) ? $hebergement['prix_base'] : 0.00, // Alias correct
            'vues' => [] // Tableau pour stocker les vues de chaque chambre
        ];
    }
}

// Récupérer les vues de chambre et leurs suppléments
$query_vues = "SELECT v.id_hebergement, v.vue, v.image, v.supplement 
               FROM vue_chambre v 
               JOIN hebergement h ON v.id_hebergement = h.id_hebergement";
$stmt_vues = $pdo->prepare($query_vues);
$stmt_vues->execute();
$vues = $stmt_vues->fetchAll(PDO::FETCH_ASSOC);

// Organiser les données des vues de chambre
foreach ($vues as $vue) {
    $idhebergement = $vue['id_hebergement'];
    if (isset($hebergementsOrganized[$idhebergement])) {
        $hebergementsOrganized[$idhebergement]['vues'][] = [
            'vue' => $vue['vue'],
            'image' => $vue['image'],
            'supplement' => $vue['supplement']
        ];
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hebergements</title>
        
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

        <section>
            <div class = "container my-5 align-items-center">
                <div class = "row align-items-center">
                    <div class = "col-sm-12 col-md-6" style="text-align: justify; font-size: 30px;">
                        <p>
                            Que vous veniez pour une cure ou simplement pour un moment de détente, nos chambres allient confort et sérénité. 
                            Chaque espace est pensé pour votre bien-être, avec des vues imprenables sur la mer, les jardins luxuriants, 
                            la piscine scintillante ou le parc verdoyant. Profitez d’un cadre apaisant, d’un accès direct aux soins et d’un service attentif pour un séjour ressourçant. 
                            Quelle que soit votre préférence, chambre standard, confort ou suite élégante vous bénéficierez du meilleur en termes de confort et de services.
                        </p>
                    </div>
                    <div class="col-sm-12 col-md-6">
                            <img src="../images/hotel.jpg" class="img-fluid" alt="" style="height: 500px; object-fit: cover; width: 100%;">
                    </div>
                </div>
            </div>
        </section> 

        <div class="container my-5" id="hebergements_list">
                <h2 class="text-center mb-4">Nos hébergements</h2>

                <!-- Bloc CHAMBRES STANDARD -->
                <div id="chambres_standard" class="row">
                    <?php 
                    $typesAffiches = [];
                    foreach ($hebergementsOrganized as $heb): 
                        if (
                            in_array($heb['type'], ['Chambre standard simple', 'Chambre standard double']) &&
                            !in_array($heb['type'], $typesAffiches)
                        ):
                            $typesAffiches[] = $heb['type']; ?>
                            <div class="col-12 col-md-6 mt-5 mb-4 d-flex justify-content-center">
                                <div class="card chambre_card" style="width: 100%;">
                                    <img src="<?php echo htmlspecialchars($heb['imageH']); ?>" class="card-img-top" alt="image de chambre" style="height: 350px; object-fit: cover;">
                                    <div class="card-body text-center">
                                        <h5 class="card-title"><?php echo htmlspecialchars($heb['type']); ?></h5>
                                        <p class="card-text">À partir de <strong><?php echo number_format($heb['prixH'], 2); ?> €</strong></p>
                                    </div>
                                </div>
                            </div>
                    <?php endif; endforeach; ?>
                </div>

                <!-- Bloc CHAMBRES CONFORT -->
                <div id="chambres_confort" class="row">
                    <?php 
                    foreach ($hebergementsOrganized as $heb): 
                        if (
                            in_array($heb['type'], ['Chambre confort simple', 'Chambre confort double']) &&
                            !in_array($heb['type'], $typesAffiches)
                        ):
                            $typesAffiches[] = $heb['type']; ?>
                            <div class="col-12 col-md-6 mt-5 mb-4 d-flex justify-content-center">
                                <div class="card chambre_card" style="width: 100%;">
                                    <img src="<?php echo htmlspecialchars($heb['imageH']); ?>" class="card-img-top" alt="image de chambre" style="height: 350px; object-fit: cover;">
                                    <div class="card-body text-center">
                                        <h5 class="card-title"><?php echo htmlspecialchars($heb['type']); ?></h5>
                                        <p class="card-text">À partir de <strong><?php echo number_format($heb['prixH'], 2); ?> €</strong></p>
                                    </div>
                                </div>
                            </div>
                    <?php endif; endforeach; ?>
                </div>

                <!-- Bloc SUITE -->
                <div id="suite" class="row">
                    <?php 
                    foreach ($hebergementsOrganized as $heb): 
                        if ($heb['type'] === 'Suite' && !in_array($heb['type'], $typesAffiches)):
                            $typesAffiches[] = $heb['type']; ?>
                            <div class="col-12 col-md-6 mt-5 mb-4 d-flex justify-content-center">
                                <div class="card chambre_card" style="width: 100%;">
                                    <img src="<?php echo htmlspecialchars($heb['imageH']); ?>" class="card-img-top" alt="image de chambre" style="height: 350px; object-fit: cover;">
                                    <div class="card-body text-center">
                                        <h5 class="card-title"><?php echo htmlspecialchars($heb['type']); ?></h5>
                                        <p class="card-text">À partir de <strong><?php echo number_format($heb['prixH'], 2); ?> €</strong></p>
                                    </div>
                                </div>
                            </div>

                            <!-- Texte descriptif de la suite -->
                            <div class="col-12 col-md-6 mt-5 mb-4" style="text-align: justify; font-size: 30px;">
                                <p>
                                    Notre suite allie élégance et confort pour un séjour d’exception. Spacieuse et raffinée, elle comprend un espace salon, 
                                    une chambre luxueuse et une salle de bain moderne. Profitez d’une vue imprenable et de services haut de gamme pour une expérience inoubliable.
                                </p>
                            </div>
                    <?php endif; endforeach; ?>
                </div>
        </div>

                    
        <div class="container my-5" id="vue_list">
            <h2 class="text-center mb-4">Categories des vues</h2>
            <div class="row">
                <div class="col-12">
                    <!-- Carrousel unique pour les vues -->
                    <div id="carousel-vues" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            <?php
                            // Limiter à 4 vues dans le carrousel
                            $vueCount = 0;
                            $maxVues = 4;
                            $first = true; // Indicateur pour la première vue (active)
                            foreach ($hebergementsOrganized as $heb):
                                foreach ($heb['vues'] as $vue):
                                    if ($vueCount >= $maxVues) break; // Limiter à 4 vues
                                    $isActive = $first ? 'active' : ''; // La première vue est active
                                    $first = false; // La première vue ne sera plus active pour les suivantes
                            ?>
                                    <div class="carousel-item <?php echo $isActive; ?>">
                                        <img src="<?php echo htmlspecialchars($vue['image']); ?>" style ="width : 100%; height : 800px" alt="<?php echo htmlspecialchars($vue['vue']); ?>">
                                        <div class="carousel-caption d-none d-md-block">
                                            <h5><?php echo htmlspecialchars($vue['vue']); ?></h5> <!-- Affiche la vue -->
                                            <p>Supplément : <?php echo number_format($vue['supplement'], 2); ?> €</p>
                                        </div>
                                    </div>
                            <?php
                                    $vueCount++;
                                endforeach;
                            endforeach;
                            ?>
                        </div>
                        <!-- Contrôles du carrousel -->
                        <button class="carousel-control-prev" type="button" data-bs-target="#carousel-vues" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carousel-vues" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center my-5">
            <a href="../index.html" class="btn btn-outline-primary">Retour à l'accueil</a>
        </div>
    </main>

    <footer>
        <div class="container-fluid mt-5 text-center bg-secondary bg-opacity-25" style="font-size: 25px;">
            <div class="row">
                <div class="col-sm-12 col-md-4">
                    <h3>Aide</h3>
                    <hr style="border: 2px solid black; margin-top: 20px;">
                    <a href="../vues/a_propos_cures.html">A-propos</a><br>
                </div>

                <div class="col-sm-12 col-md-4">
                    <h3>L'entreprise</h3>
                    <hr style="border: 2px solid black; margin-top: 20px;">
                    <a href="#">Nous contacter</a><br>
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
    <script src="../scripts/cures.js"></script>
</body>
</html>


