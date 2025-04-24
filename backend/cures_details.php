<?php


require 'db.php';

// Récupération de l'ID de la cure depuis l'URL
if (isset($_GET['id'])) {
    $idCure = $_GET['id'];

    // Récupération de la cure spécifique
    $query = "SELECT * FROM cures WHERE id_cure = :idCure";
    $stmt = $pdo->prepare($query);
    $stmt->execute(['idCure' => $idCure]);
    $cure = $stmt->fetch(PDO::FETCH_ASSOC);

    // Récupération de toutes les cures (pour afficher toutes les cures)
    $queryAll = "SELECT * FROM cures";
    $stmtAll = $pdo->prepare($queryAll);
    $stmtAll->execute();
    $allCures = $stmtAll->fetchAll(PDO::FETCH_ASSOC);
} else {
    // Si l'ID n'est pas présent dans l'URL
    die("Cure non trouvée.");
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
                                    <li><a href="../vues/cures.html#cure-detox-et-purification" class="text-dark" style="text-decoration: none;">Cure Détox et Purification</a></li>
                                    <li><a href="../vues/cures.html#cure-relaxation-et-anti-stress" class="text-dark" style="text-decoration: none;">Cure Relaxation et Anti-Stress</a></li>
                                    <li><a href="../vues/cures.html#cure-revitalisation-et-energie" class="text-dark" style="text-decoration: none;">Cure Revitalisation et Énergie</a></li>
                                    <li><a href="../vues/cures.html#cure-sommeil-et-relaxation-profonde" class="text-dark" style="text-decoration: none;">Cure Sommeil et Relaxation Profonde</a></li>
                                    <li><a href="../vues/cures.html#cure-minceur-et-equilibre-alimentaire" class="text-dark" style="text-decoration: none;">Cure Minceur et Équilibre Alimentaire</a></li>
                                    <li><a href="../vues/cures.html#cure-anti-age-et-beaute" class="text-dark" style="text-decoration: none;">Cure Anti-Âge et Beauté</a></li>
                                    <li><a href="../vues/cures.html#cure-immunite-et-renforcement-du-corps" class="text-dark" style="text-decoration: none;">Cure Immunité et Renforcement du Corps</a></li>
                                    <li><a href="../vues/cures.html#cure-special-dos" class="text-dark" style="text-decoration: none;">Cure Spécial Dos</a></li>
                                    <li><a href="../vues/cures.html#cure-prevention-sante" class="text-dark" style="text-decoration: none;">Cure Prévention Santé</a></li>
                                    <li><a href="../vues/cures.html#cure-remise-en-forme" class="text-dark" style="text-decoration: none;">Cure Remise en Forme</a></li>
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
                        <a href="../vues/wishlist.html" class="me-3">
                            <i class="bi bi-heart" style="font-size: 2rem; color: #333333;"></i>
                        </a>   
                        <a href="../vues/afficher_dans_panier.html">
                            <i class="bi bi-cart4" style="font-size: 2rem; color: #333333"></i>
                        </a>
                      </form>
                </div>
            </nav>
        </header>

    <main>
          <!-- Bannière principale -->
        <section class="banniere">
            <div class="container py-5 text-center text-white text-banniere">
                <h1 class="display-4 fw-bold">Therapp-Aisis, un havre de paix</h1>
                <p class="lead mt-3">Rééquilibrez votre énergie, revitalisez votre vie !</p>
                <a href="vues/cures.html" class="btn btn-outline-light btn-lg mt-4">Découvrir notre centre</a>
            </div>
        </section>

        <section class="container py-5 cure-details">
            <h5 class="card-title text-center"><?php echo htmlspecialchars($cure['nom']); ?></h5>
                <!-- Afficher la cure sélectionnée -->
                <div id="cure-<?php echo $cure['id_cure']; ?>" class="row d-flex justify-content-center align-items-center">
                    <div class="col-12 mb-4" style="width: 450px;">
                        <div class="card h-100">
                            <div class="card-body">
                                
                                <p>💡 <strong>Objectifs :</strong> <?php echo htmlspecialchars($cure['objectifs']); ?></p>
                                <p>🕒 <strong>Durée :</strong> <?php echo htmlspecialchars($cure['duree']); ?> jours</p>
                                <p>🔹 <strong>Soins inclus :</strong> <?php echo htmlspecialchars($cure['soins']); ?></p>
                                <p>👤 <strong>Cible :</strong> <?php echo htmlspecialchars($cure['cible']); ?></p>
                                <p>✅ <strong>Résultats :</strong> <?php echo htmlspecialchars($cure['resultats']); ?></p>
                                <div class="text-center">
                                    <a href="../vues/reservation.html" class="center btn btn-outline-primary text-dark">Reserver</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Bouton pour afficher les autres cures -->
                <div class="text-center mt-4">
                        <button id="toggleCuresBtn" class="btn btn-outline-primary">Voir plus >></button>
                </div> 
                <!-- Affichage de toutes les autres cures, cachées par défaut -->
            <div id="allCuresContainer" class="hidden mt-5">
                <div class="row">
                    <?php foreach ($allCures as $otherCure): ?>
                        <div class="col-md-4 mt-4 mb-4 d-flex align-items-stretch"> <!--sur la colonne permet d'étirer chaque carte à la même hauteur dans une ligne Bootstrap.-->
                            <div class="card w-100" style="min-height: 100%;">
                                <h5 class="card-title text-center m-2"><?php echo htmlspecialchars($otherCure['nom']); ?></h5>
                                <div class="card-body d-flex flex-column">
                                    <p>💡 <strong>Objectifs :</strong> <?php echo htmlspecialchars($otherCure['objectifs']); ?></p>
                                    <p>🕒 <strong>Durée :</strong> <?php echo htmlspecialchars($otherCure['duree']); ?> jours</p>
                                    <p>🔹 <strong>Soins inclus :</strong> <?php echo htmlspecialchars($otherCure['soins']); ?></p>
                                    <p>👤 <strong>Cible :</strong> <?php echo htmlspecialchars($otherCure['cible']); ?></p>
                                    <p>✅ <strong>Résultats :</strong> <?php echo htmlspecialchars($otherCure['resultats']); ?></p>
                                    <div class="text-center mt-auto">
                                        <a href="../vues/reservation.html" class="center btn btn-outline-primary text-dark">Réserver</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    <?php endforeach; ?>
                </div>
                <!-- Nouveau bouton pour masquer les cures -->
                <div class="text-center mt-4">
                    <button id="hideCuresBtn" class="btn btn-outline-primary">Masquer les details</button>
                </div>
            </div>
        </section>

        <section>
                        
            <div class="container my-5 fs-5" style="text-align: justify;">
                <h2 class="text-center text-dark mb-5">La Médecine Thérapeutique et le Bien-Être Holistique</h2>
        
                <section class="mb-5">

                    <h3 class="text-dark">Qu'est-ce que la médecine thérapeutique ?</h3>
                    <p>
                        La médecine thérapeutique repose sur une approche holistique du bien-être, visant à harmoniser le corps et l’esprit 
                        à travers des soins ciblés et naturels. Inspirée de pratiques ancestrales et enrichie par des avancées modernes, 
                        elle regroupe différentes méthodes permettant de renforcer la vitalité, d’améliorer la qualité de vie et de prévenir 
                        divers troubles physiques et émotionnels.
                    </p>
                    <p>
                        Chez <strong>Therapp-Aisis</strong>, nous proposons des cures adaptées aux besoins de chacun, intégrant des soins 
                        **relaxants, énergisants, purifiants et revitalisants**. Notre objectif est d’accompagner chaque individu vers un 
                        mieux-être durable grâce à des techniques naturelles et innovantes.
                    </p>
                </section>
        
                <section class="mb-5">
                    <h3 class="text-dark">Les principes fondamentaux de nos cures</h3>
                    <p>
                        Nos programmes de soins s’appuient sur plusieurs axes complémentaires pour offrir une prise en charge complète et efficace :
                    </p>
                    <ul class ="fs-5">
                        <li><strong>La détoxification :</strong> Élimination des toxines accumulées pour revitaliser l’organisme.</li>
                        <li><strong>La relaxation et la gestion du stress :</strong> Techniques de massage et de méditation pour apaiser le mental.</li>
                        <li><strong>Le renforcement du corps :</strong> Soins énergétiques et nutritionnels pour booster l’immunité et la vitalité.</li>
                        <li><strong>La beauté et la régénération :</strong> Traitements anti-âge et soins de la peau pour un éclat naturel.</li>
                        <li><strong>La remise en forme :</strong> Activités physiques et suivi personnalisé pour retrouver un équilibre physique.</li>
                    </ul>
                </section>
        
                <section class="mb-5">
                    <h3 class="text-dark">Pourquoi suivre une cure bien-être ?</h3>
                    <p>
                        Nos cures bien-être sont conçues pour répondre à des objectifs variés, allant de la détente profonde à l’amélioration 
                        de la condition physique et mentale. Selon vos besoins, vous pourrez bénéficier des bienfaits suivants :
                    </p>
                    <ul class ="fs-5">
                        <li>Réduction du stress et amélioration du sommeil.</li>
                        <li>Renforcement du système immunitaire et regain d’énergie.</li>
                        <li>Élimination des toxines et amélioration de la digestion.</li>
                        <li>Affinement de la silhouette et rééquilibrage alimentaire.</li>
                        <li>Prévention des douleurs chroniques et optimisation de la mobilité.</li>
                    </ul>
                </section>
        
                <section class="mb-5">
                    <h3 class="text-dark">Nos méthodes et techniques de soins</h3>
                    <p>
                        Pour garantir des résultats optimaux, nous utilisons une approche globale combinant plusieurs techniques thérapeutiques :
                    </p>
                    <ul class ="fs-5">
                        <li><strong>Massothérapie :</strong> Massages relaxants, énergétiques et thérapeutiques pour soulager les tensions et dynamiser le corps.</li>
                        <li><strong>Thérapies naturelles :</strong> Utilisation d’huiles essentielles, de tisanes et de soins à base d’ingrédients naturels.</li>
                        <li><strong>Hydrothérapie :</strong> Bains thérapeutiques et enveloppements pour favoriser la circulation et la purification du corps.</li>
                        <li><strong>Nutrition bien-être :</strong> Conseils alimentaires et programmes détox pour rééquilibrer l’organisme.</li>
                    </ul>
                </section>
        
                <section class="mb-5">
                    <h3 class="text-dark">Un cadre idéal pour une expérience de bien-être unique</h3>
                    <p>
                        Situé en Jamaïque, <strong>Therapp-Aisis</strong> offre un cadre paisible où chaque visiteur peut profiter d’un 
                        environnement propice à la détente et au ressourcement. Nos espaces sont conçus pour maximiser l’expérience 
                        de bien-être, en s’inspirant des meilleures pratiques du monde entier tout en respectant l’authenticité de notre 
                        environnement tropical.
                    </p>
                    <p>
                        Nos soins sont dispensés par des experts en bien-être, qui adaptent chaque cure en fonction des besoins et 
                        des attentes individuelles. Que vous recherchiez une pause relaxante, un regain d’énergie ou un rééquilibrage complet, 
                        nous vous accompagnons tout au long de votre parcours bien-être.
                    </p>
                </section>
        
                <section class="mb-5">
                    <h3 class="text-dark">Comment maximiser les bienfaits de votre cure ?</h3>
                    <p>
                        Pour tirer le meilleur parti de votre séjour chez <strong>Therapp-Aisis</strong>, nous vous recommandons de suivre 
                        quelques conseils simples :
                    </p>
                    <ul class ="fs-5">
                        <li><strong>Planifiez vos soins à l’avance :</strong> Un programme personnalisé garantit une meilleure efficacité des traitements.</li>
                        <li><strong>Adoptez une routine bien-être :</strong> Intégrez des moments de relaxation et d’activité physique dans votre journée.</li>
                        <li><strong>Misez sur une alimentation saine :</strong> Optez pour une alimentation équilibrée pour soutenir les bienfaits des soins.</li>
                        <li><strong>Écoutez votre corps :</strong> Prenez le temps de vous reposer et de vous reconnecter à vos sensations.</li>
                    </ul>
                </section>
        
                <section class="mb-5">
                    <h3 class="text-dark">Prolonger les effets du bien-être au quotidien</h3>
                    <p>
                        Une fois votre cure terminée, il est essentiel de maintenir un mode de vie équilibré pour prolonger ses bienfaits. 
                        Des rituels simples comme les massages réguliers, la méditation, une bonne hydratation et une alimentation équilibrée 
                        permettent de préserver l’harmonie entre le corps et l’esprit. 
                    </p>
                    <p>
                        Chez <strong>Therapp-Aisis</strong>, nous vous donnons les clés pour intégrer ces pratiques dans votre quotidien, afin 
                        que votre bien-être soit une démarche continue et non une simple parenthèse.
                    </p>
                </section>
        
                <div class="text-center my-5">
                    <a href="../index.html" class="btn btn-outline-primary">Retour à l'accueil</a>
                </div>

            </div>
        </section>
    </main>

    <section class="py-5 bg-dark">
            <footer class="bg-dark text-light pt-5 pb-4 mt-5">
                <div class="container text-center text-md-start">
                    <div class="row">
                        <!-- Aide -->
                        <div class="col-md-4 mb-4">
                            <h5 class="text-uppercase fw-bold">Aide</h5>
                            <hr class="mb-4" style="width: 150px; border-top: 3px solid #fff;">
                            <a href="./vues/a_propos_cures.html" class="text-light d-block mb-2">À propos</a>
                        </div>
            
                        <!-- L'entreprise -->
                        <div class="col-md-4 mb-4">
                            <h5 class="text-uppercase fw-bold">L'entreprise</h5>
                            <hr class="mb-4" style="width: 150px; border-top: 3px solid #fff;">
                            <a href="#" class="text-light d-block mb-2">Nous contacter</a>
                        </div>
            
                        <!-- Réseaux sociaux -->
                        <div class="col-md-4 mb-4">
                            <h5 class="text-uppercase fw-bold">Suivez-nous</h5>
                            <hr class="mb-4" style="width: 150px; border-top: 3px solid #fff;">
                            <div class="d-flex justify-content-center justify-content-md-start gap-3">
                                <a href="https://instagram.com" target="_blank" class="text-light fs-4"><i class="bi bi-instagram"></i></a>
                                <a href="https://youtube.com" target="_blank" class="text-light fs-4"><i class="bi bi-youtube"></i></a>
                                <a href="https://pinterest.com" target="_blank" class="text-light fs-4"><i class="bi bi-pinterest"></i></a>
                                <a href="https://facebook.com" target="_blank" class="text-light fs-4"><i class="bi bi-facebook"></i></a>
                            </div>
                        </div>
                        <p>&copy; 2025 Therapp-Aisis. Tous droits réservés.</p>
                    </div>
                </div>
            </footer>
        </section>   
    <script src="../scripts/cures_details.js"></script>
</body>
</html>