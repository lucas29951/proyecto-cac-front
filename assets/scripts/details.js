
document.addEventListener("DOMContentLoaded", () => {
    const evento = JSON.parse(localStorage.getItem("eventoSeleccionado"));
    console.log(evento);
    if (evento) {
        document.querySelector(".banner-event img").src = evento.imagen;
        document.querySelector(".banner-event img").alt = evento.titulo;
        // document.querySelector(".info-event h5").textContent = `Fecha de Realización: ${new Date(evento.fechaHora).toLocaleString()}`;
        document.querySelector(".info-event .name-event").textContent = evento.titulo;
        document.querySelector(".info-event .description").textContent = evento.descripcion;
        document.querySelector(".info-event .date-time").textContent = new Date(evento.fechaHora).toLocaleString();
        document.querySelector(".info-event .ubication").innerHTML = `${evento.ubicacion}`;
        document.querySelector(".buy-ticket .price").textContent = `Precio de Entrada $${evento.precio}`;
    }
});