
// Event listeners para cargar los eventos
document.addEventListener("DOMContentLoaded", cargarEventos(eventos));


// Event listeners para ordenar los eventos segun X criterio
document.querySelector("#orders-select").addEventListener("change", (event) => {
    const criterio = event.target.value;
    ordenarEventos(criterio);
});


// Event listeners para filtrar los eventos por categoria
document.querySelectorAll(".categorie-link").forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const categoria = link.textContent.trim();
        filtrarPorCategoria(categoria);
    });
});


// Event listeners para buscar eventos
document.querySelector("#search-input").addEventListener("keypress", (event) => {
    if (event.key === 'Enter') {
        const palabraClave = event.target.value.trim();
        buscarEventos(palabraClave);
    }
});
