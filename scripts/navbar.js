document.addEventListener("DOMContentLoaded", function () {
    const searchIcon = document.getElementById("search-icon");
    const searchBar = document.getElementById("search-bar");
    const closeSearch = document.getElementById("close-search");

    searchIcon.addEventListener("click", function () {
        searchBar.classList.remove("d-none"); // Affiche le champ de recherche
        closeSearch.classList.remove("d-none"); // Affiche l'icône de fermeture
        searchIcon.classList.add("d-none"); // Masque l'icône de recherche
    });

    closeSearch.addEventListener("click", function () {
        searchBar.classList.add("d-none"); // Masque le champ de recherche
        closeSearch.classList.add("d-none"); // Masque l'icône de fermeture
        searchIcon.classList.remove("d-none"); // Réaffiche l'icône de recherche
    });
});
