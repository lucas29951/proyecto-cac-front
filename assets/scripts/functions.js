
// Función para cargar eventos en la página principal
function cargarEventos() {
    const eventosContainer = document.querySelector(".events .row");
    eventosContainer.innerHTML = "";

    eventos.forEach(evento => {
        const eventoHTML = `
            <div class="col">
                <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${evento.imgenUrl}" class="img-fluid rounded-start h-100" alt="${evento.titulo}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${evento.titulo}</h5>
                                <p class="card-text"><small class="text-muted">Fecha y hora: ${evento.fechaHora}</small></p>
                                <p class="card-text"><small class="text-muted">Ubicación: ${evento.ubicacion}</small></p>
                                <p class="card-text"><small class="text-muted">Precio: $${evento.precio}</small></p>
                                <a href="./details.html" class="btn btn-primary comprar-btn" data-evento='${JSON.stringify(evento)}'>Comprar</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        eventosContainer.innerHTML += eventoHTML;
    });

    document.querySelectorAll(".comprar-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            const evento = JSON.parse(event.target.getAttribute("data-evento"));
            console.log("Evento Seleccionado: " + evento);
            localStorage.setItem("eventoSeleccionado", JSON.stringify(evento));
        });
    });
}



// Función para cargar eventos recibidos en la página principal
function cargarLista(listaEventos) {
    const eventosContainer = document.querySelector(".events .row");
    eventosContainer.innerHTML = "";

    listaEventos.forEach(evento => {
        const imagenEvento = imagenes.find(imagen => imagen.id === evento.imagenId);
        const eventoHTML = `
            <div class="col">
                <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${imagenEvento.url}" class="img-fluid rounded-start h-100" alt="${evento.titulo}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${evento.titulo}</h5>
                                <p class="card-text"><small class="text-muted">Fecha y hora: ${evento.fechaHora}</small></p>
                                <p class="card-text"><small class="text-muted">Ubicación: ${evento.ubicacion}</small></p>
                                <p class="card-text"><small class="text-muted">Precio: $${evento.precio}</small></p>
                                <a href="./details.html" class="btn btn-primary comprar-btn" data-evento='${JSON.stringify(evento)}'>Comprar</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        eventosContainer.innerHTML += eventoHTML;
    });

    document.querySelectorAll(".comprar-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            const evento = JSON.parse(event.target.getAttribute("data-evento"));
            localStorage.setItem("eventoSeleccionado", JSON.stringify(evento));
        });
    });
}

// Función para filtrar eventos por categoría
function filtrarPorCategoria(categoria) {
    const eventosFiltrados = eventos.filter(evento => evento.categoria === categoria);
    cargarLista(eventosFiltrados);
}

// Función para ordenar eventos por criterio
function ordenarEventos(criterio) {
    let eventosOrdenados = eventos;
    switch (parseInt(criterio)) {
        case 1: // ordenAlfabetico
            eventosOrdenados.sort((a, b) => a.titulo.localeCompare(b.titulo));
            break;
        case 2: // porFecha
            eventosOrdenados.sort((a, b) => new Date(a.fechaHora) - new Date(b.fechaHora));
            break;
        case 3: // mayorPrecio
            eventosOrdenados.sort((a, b) => b.precio - a.precio);
            break;
        case 4: // menorPrecio
            eventosOrdenados.sort((a, b) => a.precio - b.precio);
            break;
        default:
            break;
    }
    cargarLista(eventosOrdenados);
}

// Función para buscar eventos por palabra clave
function buscarEventos(palabraClave) {
    const eventosEncontrados = eventos.filter(evento =>
        evento.titulo.toLowerCase().includes(palabraClave.toLowerCase()) //||
    );
    cargarLista(eventosEncontrados);
}

