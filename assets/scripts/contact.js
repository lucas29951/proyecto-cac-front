
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let valid = true;


        const fields = ['name', 'email', 'subject', 'message'];
        fields.forEach(function (field) {
            const input = document.getElementById(field);
            if (!input.value.trim()) {
                valid = false;
                input.classList.add('invalid');
                showError(input, 'Por favor, rellene el campo.');
            } else {
                input.classList.remove('invalid');
                clearError(input);
            }
        });


        const email = document.getElementById('email');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.value.trim())) {
            valid = false;
            email.classList.add('invalid');
            showError(email, 'Por favor, ingrese un email valido.');
        } else {
            email.classList.remove('invalid');
            clearError(email);
        }


        const contactMethod = document.getElementById('contact-method');
        if (!contactMethod.value) {
            valid = false;
            contactMethod.classList.add('invalid');
            showError(contactMethod, 'Por favor, seleccione una opcion.')
        } else {
            contactMethod.classList.remove('invalid');
            clearError(contactMethod);
        }


        const contactPreferences = document.getElementsByName('contact-preference');
        let preferenceSelected = false;
        for (let i = 0; i < contactPreferences.length; i++) {
            if (contactPreferences[i].checked) {
                preferenceSelected = true;
                break;
            }
        }
        if (!preferenceSelected) {
            valid = false;
            document.querySelectorAll('[name="contact-preference"]').forEach(function (el) {
                let elem = el.closest('.prefer-group');
                showError(elem, 'Por favor, seleccione una opcion.');
            });
        } else {
            document.querySelectorAll('[name="contact-preference"]').forEach(function (el) {
                let elem = el.closest('.prefer-group');
                clearError(elem);
            });
        }


        const upload = document.getElementById('upload');
        if (!upload.files.length) {
            valid = false;
            showError(upload, 'Por favor, seleccione un archivo.');
        } else {
            clearError(upload);
        }


        const terms = document.getElementById('terms');
        let checkError = document.getElementById('error-check');
        if (!terms.checked) {
            valid = false;
            checkError.style.display = 'block';
        } else {
            checkError.style.display = 'none';
        }


        if (valid) {
            form.submit();
        }

    });
});


function showError(input, message) {
    const container = input.closest('div');
    
    let errorMessage = container.querySelector('.error-message');
    if (!errorMessage) {
        errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        container.appendChild(errorMessage);
    }
    errorMessage.textContent = message;
}


function clearError(input) {
    const container = input.closest('div');
    const errorMessage = container.querySelector('.error-message');

    if (errorMessage) {
        errorMessage.remove();
    }
}
