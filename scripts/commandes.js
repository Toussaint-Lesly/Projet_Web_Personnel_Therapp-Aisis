


document.addEventListener('DOMContentLoaded', () => {
  fetch('../backend/lister_commandes_paiements.php')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('commandesContainer');

    console.log(data);
    container.innerHTML = '';

    data.forEach((commande, index) => {
      let total = 0;
    
      const infos = commande.infos;
    
      // Vérifier et formater la date
      let numeroCommande = '';
      let dateCommande = infos.date_commande;
      if (typeof dateCommande === 'string') {
        numeroCommande = `CMD-${dateCommande.replace(/-/g, '')}-${index + 1}`;
      } else {
        console.warn('Date invalide pour la commande', commande);
        numeroCommande = `CMD-${index + 1}`;
        dateCommande = 'Date inconnue';
      }
    
      // Afficher le nom et prénom
      const clientFirstname = infos.user_firstname || infos.guest_firstname || 'Prénom inconnu';
      const clientName = infos.user_name || infos.guest_name || 'Nom inconnu';
    
      let html = `
        <div class="card mb-3">
          <div class="card-header bg-primary text-white">
            Commande n° <strong>${numeroCommande}</strong> - ${dateCommande}
          </div>
          <div class="card-body">
            <p><strong>Client :</strong> ${clientFirstname} ${clientName}</p>
            <p><strong>Détails de la commande</strong></p>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Prix (€)</th>
                </tr>
              </thead>
              <tbody>
      `;
    
      commande.items.forEach(item => {
        total += parseFloat(item.prix);
        html += `
          <tr>
            <td>${item.type}</td>
            <td>${item.description}</td>
            <td>${parseFloat(item.prix).toFixed(2)}</td>
          </tr>
        `;
      });
    
      html += `
              </tbody>
            </table>
            <p class="text-end"><strong>Total :</strong> ${total.toFixed(2)} €</p>
          </div>
        </div>
      `;
    
      container.innerHTML += html;
    });
  })
  .catch(error => {
    console.error('Erreur lors du chargement des commandes :', error);
  });

});
