
const detailsContainer = document.getElementById('details-group');

document.addEventListener("DOMContentLoaded", () => {
    const evento = JSON.parse(localStorage.getItem("eventoSeleccionado"));

    if (evento) {
        document.querySelector(".banner-event img").src = evento.imagen;
        document.querySelector(".banner-event img").alt = evento.titulo;
        document.querySelector(".info-event .name-event").textContent = evento.titulo;
        document.querySelector(".info-event .description").textContent = evento.descripcion;
        document.querySelector(".info-event .date-time").textContent = new Date(evento.fechaHora).toLocaleString();
        document.querySelector(".info-event .ubication").innerHTML = `${evento.ubicacion}`;
        document.querySelector(".buy-ticket .price").textContent = `Precio de Entrada $${evento.precio}`;
    }
});

document.getElementById('btn-compra').addEventListener('click', async (event) => {
    event.preventDefault();

    const userLogged = JSON.parse(localStorage.getItem('user'));
    const eventSelected = JSON.parse(localStorage.getItem('eventoSeleccionado'));

    let cantidad = 1;
    let total = eventSelected.precio * cantidad;

    if (!userLogged || !eventSelected) {
        alert("Error: No se encontro informacion del usuario o evento.");
        return;
    }

    const newTicket = {
        user_id: userLogged.id,
        event_id: eventSelected.id,
        quantity: cantidad,
        total_price: total
    }

    try {
        const response = await fetch('https://proyecto-cac-back.onrender.com/api/tickets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userLogged.accessToken}`
            },
            body: JSON.stringify(newTicket)
        });

        if(!response.ok) {
            throw new Error('Error al crear el ticket.');
        }

        alert("Compra Realizada!");
        window.location.href = './profile.html';
    } catch (error) {
        console.error('Error: ' + error);
        alert('Hubo un problema al realizar la compra. Por favor, intentelo de nuevo.');
    }
});