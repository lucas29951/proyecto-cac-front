

async function getApiData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}


function createCards(results, search) {
    const eventosContainer = document.querySelector(".events .row");
    eventosContainer.innerHTML = "";
    for (let i = 0; i < results.length; i++) {
        eventosContainer.innerHTML += templates[search](results[i]);
    }
    document.querySelectorAll(".comprar-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            const evento = JSON.parse(button.getAttribute("data-evento"));
            localStorage.setItem("eventoSeleccionado", JSON.stringify(evento));

            if(event.target.classList.contains("link-card")){
                localStorage.setItem("eventoSeleccionado", JSON.stringify(evento));
            }
        });
    });
}


async function createEventosContainer(search) {
    const result = await getApiData(api[search]);
    createCards(result, search);
}


async function searchEvents(keyWord) {
    const result = await getApiData(api["eventos"]);
    const eventosEncontrados = result.filter(evento =>
        evento.titulo.toLowerCase().includes(keyWord.toLowerCase())
    );
    createCards(eventosEncontrados,"eventos");
}


async function filterEvents(categoria){
    const result = await getApiData(api["eventos"]);
    const eventosFiltrados = result.filter(evento => evento.categoria === categoria);
    createCards(eventosFiltrados,"eventos");
}


async function orderEvents(order){
    const result = await getApiData(api["eventos"]);
    switch (parseInt(order)) {
        case 1:
            result.sort((a, b) => a.titulo.localeCompare(b.titulo));
            break;
        case 2:
            result.sort((a, b) => new Date(a.fechaHora) - new Date(b.fechaHora));
            break;
        case 3:
            result.sort((a, b) => b.precio - a.precio);
            break;
        case 4:
            result.sort((a, b) => a.precio - b.precio);
            break;
        default:
            break;
    }
    createCards(result, "eventos")
}
