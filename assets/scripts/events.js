

document.addEventListener("DOMContentLoaded", createEventosContainer("eventos"));


document.querySelector("#search-input").addEventListener("keypress", (event) => {
    if (event.key === 'Enter') {
        const palabraClave = event.target.value.trim();
        searchEvents(palabraClave);
    }
});


document.querySelectorAll(".categorie-link").forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const categoria = link.textContent.trim();
        filterEvents(categoria);
    });
});


document.querySelector("#orders-select").addEventListener("change", (event) => {
    const criterio = event.target.value;
    orderEvents(criterio);
});
