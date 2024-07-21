
document.addEventListener('DOMContentLoaded', () => {
    let id = localStorage.getItem('eventID');

    fetch(api["eventapi"]+`/events/${id}`)
    .then(response => response.json())
    .then(data => {
        if(!data) {
            alert('No se encontro el evento.');
            return;
        }

        document.getElementById('nameEvent').value = data.titulo;
        document.getElementById('category').value = data.category_id;
        document.getElementById('dateTimeEvent').value = data.fechaHora;
        document.getElementById('location').value = data.ubicacion;
        document.getElementById('description').value = data.descripcion;
        document.getElementById('price').value = data.precio;
        document.getElementById('imageEvent').value = data.imagen;
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Hubo un error al obtener el evento.");
    });
});