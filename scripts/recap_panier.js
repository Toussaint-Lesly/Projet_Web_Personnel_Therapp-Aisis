/*
window.addEventListener('DOMContentLoaded', () => {
    fetch('../backend/lister_panier.php')  // Récupère les données du panier via l'API
      .then(res => res.json())
      .then(data => {
        console.log(data.cures);  // Affiche le tableau des cures
        console.log(data.chambres);  // Affiche le tableau des chambres

        if (!data.success) {
          // Si aucune donnée n'est retournée ou en cas d'erreur, afficher un message
          document.getElementById('contenuPanier').innerHTML = "<p>Votre panier est vide.</p>";
          return;
        }
  
        let html = "<ul>";  // Créer la liste des articles dans le panier
        let total = 0;  // Initialiser le total
  
        // Affichage des cures
        data.cures.forEach(c => {
          html += `<li><strong>Cure :</strong> ${c.nom_sous_type} - ${c.prix} €</li>`;
          total += parseFloat(c.prix);  // Ajouter le prix total de la cure
        });
  
        // Affichage des chambres
        data.chambres.forEach(ch => {
          html += `<li><strong>Chambre :</strong> ${ch.type_chambre} avec vue ${ch.vue} - ${ch.prix_total} €</li>`;
          total += parseFloat(ch.prix_total);  // Ajouter le prix total de la chambre
        });
  
       // ...
        html += "</ul>";  // Fermer la liste HTML

        document.getElementById('contenuPanier').innerHTML = html;

        // Afficher la div qui contient le panier (si données reçues)
        document.getElementById('select_chambre').style.display = 'block';

        // Afficher le total global
        document.getElementById('totalGlobal').textContent = "Total : " + total.toFixed(2) + " €";

      })
      .catch(err => {
        // Si une erreur se produit lors de la récupération des données
        document.getElementById('contenuPanier').innerHTML = "<p>Erreur lors du chargement du panier.</p>";
      });
  });
  */


  window.addEventListener('DOMContentLoaded', () => {
    fetch('../backend/lister_panier.php')
      .then(res => res.json())
      .then(data => {
        if (!data.success) {
          document.getElementById('contenuPanier').innerHTML = "<p>Votre panier est vide.</p>";
          return;
        }
  
        let total = 0;
  
        let html = `
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Type</th>
                <th>Détail</th>
                <th>Prix (€)</th>
              </tr>
            </thead>
            <tbody>
        `;
  
        // Ajout des cures
        data.cures.forEach(c => {
          html += `
            <tr>
              <td>Cure</td>
              <td>${c.nom_sous_type}</td>
              <td>${parseFloat(c.prix).toFixed(2)}</td>
            </tr>
          `;
          total += parseFloat(c.prix);
        });
  
        // Ajout des chambres
        data.chambres.forEach(ch => {
          html += `
            <tr>
              <td>Chambre</td>
              <td>${ch.type_chambre} - ${ch.vue}</td>
              <td>${parseFloat(ch.prix_total).toFixed(2)}</td>
            </tr>
          `;
          total += parseFloat(ch.prix_total);
        });
  
        html += `
            </tbody>
          </table>
        `;
  
        document.getElementById('contenuPanier').innerHTML = html;
        document.getElementById('select_chambre').style.display = 'block';
        document.getElementById('totalGlobal').textContent = "Total : " + total.toFixed(2) + " €";
      })
      .catch(err => {
        document.getElementById('contenuPanier').innerHTML = "<p>Erreur lors du chargement du panier.</p>";
        console.error(err);
      });
  });
  