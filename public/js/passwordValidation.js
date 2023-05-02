window.onload = function(){

  // VALIDANDO LA SEGURIDAD DE LA CONTRASEÑA

document.getElementById('password').addEventListener('input', validarPassword);
document.getElementById('confirm_password').addEventListener('input', confirmarPassword);

function validarPassword() {
  const password = document.getElementById('password').value;
  const passwordInput = document.getElementById('password');
  const errorPassword = document.getElementById("passwordError");

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

  const mensaje = document.getElementById('passwordValidation');
  if (fortaleza === 0) {
    mensaje.innerHTML = '<i class="fas fa-times-circle"></i> La contraseña es débil';
    mensaje.className = ' ';
    passwordInput.className = ' ';
    mensaje.classList.add('validation-error');
    passwordInput.classList.add('input-error');
    errorPassword.style.display = "none";
  } else if (fortaleza === 1) {
    mensaje.innerHTML = '<i class="fas fa-exclamation-circle"></i> La contraseña es moderada';
    mensaje.className = ' ';
    passwordInput.className = ' ';
    mensaje.classList.add('validation-warning');
    passwordInput.classList.add('input-warning');
    errorPassword.style.display = "none";
  } else if (fortaleza === 2) {
    mensaje.innerHTML = '<i class="fas fa-exclamation-circle"></i> La contraseña es fuerte';
    mensaje.className = ' ';
    passwordInput.className = ' ';
    mensaje.classList.add('validation-warning');
    passwordInput.classList.add('input-warning');
    errorPassword.style.display = "none";
  } else {
    mensaje.innerHTML = '<i class="fas fa-check-circle"></i> La contraseña es muy fuerte';
    mensaje.className = ' ';
    passwordInput.className = ' ';
    mensaje.classList.add('validation-success');
    passwordInput.classList.add('input-success');
    errorPassword.style.display = "none";
  }
}

// VERIFICANDO LA IGUALDAD ENTRE CONTRASEÑAS

function confirmarPassword() {
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById("confirm_password");
  const mensaje = document.getElementById('confirmPasswordValidation');
  const errorConfirmPassword = document.getElementById("confirmPasswordError");

  if (password.value !== confirmPassword.value) {
    mensaje.innerHTML = '<i class="fas fa-times-circle"></i> Las contraseñas no coinciden';
    mensaje.className = ' ';
    confirmPassword.className = ' ';
    mensaje.classList.add('validation-error');
    confirmPassword.classList.add('input-error');
    errorConfirmPassword.style.display = "none";
  } else {
    mensaje.innerHTML = '<i class="fas fa-check-circle"></i> Las contraseñas coinciden';
    mensaje.className = ' ';
    confirmPassword.className = ' ';
    mensaje.classList.add('validation-success');
    confirmPassword.classList.add('input-success');
    errorConfirmPassword.style.display = "none";
  }
}

}