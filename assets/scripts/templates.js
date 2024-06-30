
const templates = {
    eventapi: (evento) => `<div class="col">
    <a href="./details.html" class="comprar-btn link-card" data-evento='${JSON.stringify(evento)}'>
    <div class="card mb-3">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${evento.imagen}" class="img-fluid rounded-start h-100" alt="${evento.titulo}">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${evento.titulo}</h5>
                    <p class="card-text"><small class="text-muted">Fecha y hora: ${evento.fechaHora}</small></p>
                </div>
                <div class="card-footer">
                <a href="./details.html" class="btn btn-primary comprar-btn" data-evento='${JSON.stringify(evento)}'>Comprar</a>
                </div>
            </div>
        </div>
    </div>
    </a>
</div>`,
}