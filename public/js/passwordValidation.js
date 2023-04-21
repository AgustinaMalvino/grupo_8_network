window.onload = function(){

document.getElementById('password').addEventListener('input', validarPassword);

function validarPassword() {
  const password = document.getElementById('password').value;
  const passwordInput = document.getElementById('password');

  const regexMayusculas = /[A-Z]/;
  const regexNumeros = /[0-9]/;

  let fortaleza = 0;
  if (regexMayusculas.test(password)) {
    fortaleza++;
  }
  if (regexNumeros.test(password)) {
    fortaleza++;
  }
  if (password.length >= 8) {
    fortaleza++;
  }

  const mensaje = document.getElementById('validation');
  if (fortaleza === 0) {
    mensaje.innerHTML = '<i class="fas fa-times-circle"></i> La contraseña es débil';
    mensaje.className = ' ';
    passwordInput.className = ' ';
    mensaje.classList.add('validation-error');
    passwordInput.classList.add('input-error');
  } else if (fortaleza === 1) {
    mensaje.innerHTML = '<i class="fas fa-exclamation-circle"></i> La contraseña es moderada';
    mensaje.className = ' ';
    passwordInput.className = ' ';
    mensaje.classList.add('validation-warning');
    passwordInput.classList.add('input-warning');
  } else if (fortaleza === 2) {
    mensaje.innerHTML = '<i class="fas fa-exclamation-circle"></i> La contraseña es fuerte';
    mensaje.className = ' ';
    passwordInput.className = ' ';
    mensaje.classList.add('validation-warning');
    passwordInput.classList.add('input-warning');
  } else {
    mensaje.innerHTML = '<i class="fas fa-check-circle"></i> La contraseña es muy fuerte';
    mensaje.className = ' ';
    passwordInput.className = ' ';
    mensaje.classList.add('validation-success');
    passwordInput.classList.add('input-success');
  }
}

}