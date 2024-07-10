

async function getApiData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}


function createCards(results) {
    const eventosContainer = document.querySelector(".events .row");
    eventosContainer.innerHTML = "";
    for (let i = 0; i < results.length; i++) {
        eventosContainer.innerHTML += templates["eventos"](results[i]);
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
    const result = await getApiData(api[search]+"/events");
    createCards(result);
}


async function searchEvents(keyWord) {
    const result = await getApiData(api["eventapi"]+"/events");
    const eventosEncontrados = result.filter(evento =>
        evento.titulo.toLowerCase().includes(keyWord.toLowerCase())
    );
    createCards(eventosEncontrados);
}


async function filterEvents(categoria){
    const categories = await getApiData(api["eventapi"]+"/categories");
    let categorieID = -1;
    let found = 0;
    for (let i = 0; i < categories.length && found == 0; i++) {
        if (categories[i].name === categoria) {
            categorieID = categories[i].id;
            found = 1;
        }
    }
    const result = await getApiData(api["eventapi"]+"/events");
    const eventosFiltrados = result.filter(evento => evento.category_id === categorieID);
    createCards(eventosFiltrados,"eventapi");
}


async function orderEvents(order){
    const result = await getApiData(api["eventapi"]+"/events");
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
    createCards(result, "eventapi")
}


function logout() {
    localStorage.removeItem('user');
    window.location.href = './login.html';
  };

async function eventsByUser(search) {
    let user = JSON.parse(localStorage.getItem('user'));
    const ticketsContainer = document.querySelector("table tbody");

    fetch(api[search]+`/tickets/${user.id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${user.accessToken}`
        }
    })
    .then(response => response.json())
    .then(data => {
        displayTickets(data);
    })
    .catch(error => console.error('Error al obtener los tickets:', error));
}

async function displayTickets(tickets) {
    const ticketsContainer = document.getElementById('tickets-container');
    if (!ticketsContainer) {
        console.error('No se encontró el contenedor de tickets.');
        return;
    }

    ticketsContainer.innerHTML = '';

    if (tickets.length === 0) {
        ticketsContainer.innerHTML = '<p>No tienes tickets.</p><a class="" href="#">Agregar</a>';
        return;
    }

    const result = await getApiData(api["eventapi"]+"/events");
    
    tickets.forEach(ticket => {
        const eventos = result.filter(evento => evento.id === ticket.event_id);
        let nameEvent = eventos.length === 1 ? `${eventos[0].titulo}` : 'Generico';
        const ticketElement = document.createElement('div');
        ticketElement.classList.add('ticket-item');
        ticketElement.innerHTML = `
            <p>Evento: ${nameEvent}</p>
            <p>Cantidad: ${ticket.quantity}</p>
            <p>Precio Total: ${ticket.total_price}</p>
            <p>Fecha: ${ticket.purchase_date}</p>
        `;
        ticketsContainer.appendChild(ticketElement);
    });
}