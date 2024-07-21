

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

async function manageEvents() {
    const events = await getApiData(api["eventapi"]+"/events");
    displayAdminEvents(events);
}

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
        ticketsContainer.innerHTML = '<p>No tienes tickets.</p>';
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

function displayAdminEvents(events) {
    const eventsContainer = document.getElementById('events-container');
    eventsContainer.innerHTML = '';

    let headBody = document.createElement('div');

    let titulo = document.createElement('h2');
    titulo.textContent = 'Gestion de Eventos';
    headBody.appendChild(titulo);

    let buttonAdd = document.createElement('button');
    buttonAdd.classList.add('btn-style');
    buttonAdd.textContent = 'Agregar Evento';
    buttonAdd.id = "btnAgregar";

    buttonAdd.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = './eventView.html';
    });

    headBody.appendChild(buttonAdd);

    eventsContainer.appendChild(headBody);

    if (!eventsContainer) {
        console.error('No se encontró el contenedor de eventos.');
        return;
    }

    if (events.length === 0) {
        eventsContainer.innerHTML += '<p>No hay eventos cargados.</p>';
        return;
    }
    
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped', 'table-bordered');

    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>NOMBRE DEL EVENTO</th>
            <th>CATEGORIA</th>
            <th>FECHA Y HORA</th>
            <th>PRECIO</th>
            <th>DESCRIPCION</th>
            <th>UBICACION</th>
            <th>OPCIONES</th>
        </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    events.forEach(event => {
        let nameCategory = '';
        switch (event.category_id) {
            case 1:
                nameCategory = 'Musica';
                break;
            case 2:
                nameCategory = 'Hobbies';
                break;
            case 3:
                nameCategory = 'Arte';
                break;
            case 4:
                nameCategory = 'Comida';
                break;
            case 5:
                nameCategory = 'Entretenimiento';
                break;
            default:
                break;
        }
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${event.titulo}</td>
            <td>${nameCategory}</td>
            <td>${event.fechaHora}</td>
            <td>${event.precio}</td>
            <td>${event.descripcion}</td>
            <td>${event.ubicacion}</td>
            <td>
                <a href="#" onclick="modifyEvent(${event.id})"><i class="fa-regular fa-pen-to-square"></i></a> |
                <a href="#" onclick="deleteEvent(${event.id})"><i class="fa-regular fa-trash-can"></i></a>
            </td>
        `;
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    eventsContainer.appendChild(table);
}

async function deleteEvent(id) {
    let user = JSON.parse(localStorage.getItem('user'));

    fetch(api["eventapi"]+`/events/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${user.accessToken}`
        }
    })
    .then(response => response.json())
    .then(data => {
        alert("Evento eliminado!");
        window.location.reload();
    })
    .catch(error => console.error('Error al obtener al eliminar evento:', error));
}

function addEvent(event) {
    event.preventDefault();
    let user = JSON.parse(localStorage.getItem('user'));
    let eventID = localStorage.getItem('eventID');

    const titulo = document.getElementById('nameEvent').value;
    const categoria = document.getElementById('category').value;
    const fechaHora = document.getElementById('dateTimeEvent').value;
    const ubicacion = document.getElementById('location').value;
    const descripcion = document.getElementById('description').value;
    const precio = document.getElementById('price').value;
    const imagen = document.getElementById('imageEvent').files[0];

    if (!titulo || !categoria || !fechaHora || !ubicacion || !descripcion || !precio || !imagen) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    if (!eventID) {
    fetch(api["eventapi"]+'/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.accessToken}`
        },
        body: JSON.stringify({ titulo: titulo, fechaHora: fechaHora, ubicacion: ubicacion, descripcion: descripcion, precio: precio, imagen: imagen, category_id: categoria }),
    })
    .then(response => response.json())
    .then(data => {
        if (data) {
            alert("Evento agregado con éxito!");
            window.location.href = './profile.html';
        } else {
            alert("Hubo un error al agregar el evento.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Hubo un error al agregar el evento.");
    });
} else {
    alert('Evento Modificado!');
}
}

function modifyEvent(id) {
    localStorage.setItem('eventID', id);
    window.location.href = './eventView.html';
}