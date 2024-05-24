
document.getElementById('contactForm').addEventListener('submit', function (event) {
    let valid = true;


    const fields = ['name', 'email', 'subject', 'message'];
    fields.forEach(function (field) {
        const input = document.getElementById(field);
        if (!input.value.trim()) {
            valid = false;
            input.style.borderColor = 'red';
        } else {
            input.style.borderColor = '';
        }
    });
    

    const contactMethod = document.getElementById('contact-method');
    if (!contactMethod.value) {
        valid = false;
        contactMethod.style.borderColor = 'red';
    } else {
        contactMethod.style.borderColor = '';
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
            el.nextElementSibling.style.color = 'red';
        });
    } else {
        document.querySelectorAll('[name="contact-preference"]').forEach(function (el) {
            el.nextElementSibling.style.color = '';
        });
    }
    

    const terms = document.getElementById('terms');
    if (!terms.checked) {
        valid = false;
        terms.nextElementSibling.style.color = 'red';
    } else {
        terms.nextElementSibling.style.color = '';
    }
    

    const upload = document.getElementById('upload');
    if (!upload.files.length) {
        valid = false;
        upload.style.borderColor = 'red';
    } else {
        upload.style.borderColor = '';
    }
    

    if (!valid) {
        event.preventDefault();
    }
});