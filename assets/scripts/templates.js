
const templates = {
    eventos: (evento) => `<div class="col">
    <div class="card mb-3">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${evento.imgen}" class="img-fluid rounded-start h-100" alt="${evento.titulo}">
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
</div>`,
}