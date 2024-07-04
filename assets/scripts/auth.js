
document.addEventListener("DOMContentLoaded", () => {
  let user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    window.location.href = "./profile.html";
  }
});


document.querySelector('#authForm.register')?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const passconfirm = document.getElementById('passconfirm').value;
  const terms = document.getElementById('terms').checked;

  if (password !== passconfirm) {
    alert('Las contraseñas no coinciden');
    return;
  }

  if (!terms) {
    document.getElementById('error-check').style.display = 'block';
    return;
  } else {
    document.getElementById('error-check').style.display = 'none';
  }

  try {
    const response = await fetch(api["eventapi"]+"/users/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert('Registro exitoso');
      window.location.href = 'login.html';
    } else {
      alert(`Error: ${data.message}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Ocurrió un error al registrar el usuario');
  }
});


document.querySelector('#authForm.login')?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch(api["eventapi"]+"/users/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(data));
      window.location.href = './profile.html';
    } else {
      alert(`Error: ${data.message}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Ocurrió un error al iniciar sesión');
  }
});


const logout = () => {
  localStorage.removeItem('user');
  alert('Sesión cerrada');
  window.location.href = './login.html';
};

document.querySelector('#logoutButton')?.addEventListener('click', logout);
