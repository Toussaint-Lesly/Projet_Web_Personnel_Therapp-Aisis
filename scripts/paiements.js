document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-section');

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    let valide = true;

    if (valide) {
      let formData = new FormData(form);
      fetch("../backend/paiements.php", {
          method: "POST",
          body: formData
      })
      .then(response => response.text()) // d'abord on prend du texte
      .then(text => {
          console.log("Réponse brute :", text); // pour debug
          return JSON.parse(text); // on tente ensuite de parser
      })
      .then(data => {
          if (data.success) {
              alert("Réservation confirmée ! Un email vous a été envoyé.");
              window.location.href = data.redirect;
          } else {
              alert("Erreur : " + data.message);
          }
      })
      .catch(error => {
          console.error("Erreur AJAX :", error);
          alert("Une erreur s’est produite lors de la réservation.");
      });
      
    }
    
  });
});

