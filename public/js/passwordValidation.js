window.onload = function(){

document.getElementById('password').addEventListener('input', validarPassword);

function validarPassword() {
  const password = document.getElementById('password').value;

  const regexMayusculas = /[A-Z]/;
  const regexNumeros = /[0-9]/;
  const regexEspeciales = /[!@#$%^&*(),.?":{}|<>]/;

  let fortaleza = 0;
  if (regexMayusculas.test(password)) {
    fortaleza++;
  }
  if (regexNumeros.test(password)) {
    fortaleza++;
  }
  if (regexEspeciales.test(password)) {
    fortaleza++;
  }

  const mensaje = document.getElementById('validation');
  if (fortaleza === 0) {
    mensaje.textContent = 'La contraseña es débil.';
  } else if (fortaleza === 1) {
    mensaje.textContent = 'La contraseña es moderada.';
  } else if (fortaleza === 2) {
    mensaje.textContent = 'La contraseña es fuerte.';
  } else {
    mensaje.textContent = 'La contraseña es muy fuerte.';
  }
}

}