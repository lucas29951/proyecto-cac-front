
document.querySelectorAll(".account-link").forEach(link => {
    link.addEventListener("click", (enlace) => {
        enlace.preventDefault();

        const authTitulo = document.querySelector(".auth-groups h2");
        authTitulo.textContent = "Login";
        
        const authEmail = document.querySelector(".auth-groups #email");
        authEmail.remove();
        const authPassConfirm = document.querySelector(".auth-groups #passconfirm");
        authPassConfirm.remove();

        const authCheck = document.querySelector(".auth-groups .check-input");
        authCheck.remove();

        const authButton = document.querySelector(".auth-groups button");
        authButton.textContent = "Iniciar Sesion";
    });
});
