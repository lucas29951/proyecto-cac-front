
document.addEventListener("DOMContentLoaded", () => {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      const titulo = document.querySelector(".head-profile h2");
      titulo.textContent = "Usuario: " + user.username;
      eventsByUser("eventapi");
    }
  });
