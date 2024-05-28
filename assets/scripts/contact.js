
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let valid = true;


        const fields = ['name', 'email', 'subject', 'message'];
         fields.forEach(function(field) {
             const input = document.getElementById(field);
             if (!input.value.trim()) {
                 valid = false;
                input.classList.add('invalid');
             } else {
                input.classList.remove('invalid');
             }
         });


        const email = document.getElementById('email');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.value.trim())) {
            valid = false;
            email.classList.add('invalid');
        } else {
            email.classList.remove('invalid');
        }


         const contactMethod = document.getElementById('contact-method');
         if (!contactMethod.value) {
             valid = false;
            contactMethod.classList.add('invalid');
         } else {
            contactMethod.classList.remove('invalid');
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
             document.querySelectorAll('[name="contact-preference"]').forEach(function(el) {
                el.closest('.prefer-group').classList.add('invalid');
             });
         } else {
             document.querySelectorAll('[name="contact-preference"]').forEach(function(el) {
                el.closest('.prefer-group').classList.remove('invalid');
             });
         }


         const upload = document.getElementById('upload');
         if (!upload.files.length) {
             valid = false;
            upload.classList.add('invalid');
         } else {
            upload.classList.remove('invalid');
         }


         const terms = document.getElementById('terms');
         const checkInputContainer = terms.closest('.check-input');
         if (!terms.checked) {
             valid = false;
            checkInputContainer.classList.add('invalid');
         } else {
            checkInputContainer.classList.remove('invalid');
         }


        if (valid) {
            form.submit();
        } else {
            alert('Por favor, complete correctamente todos los campos.');
        }

    });
});
