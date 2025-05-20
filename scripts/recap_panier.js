

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
          <table class="table table-bordered entete-tableau">
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
  