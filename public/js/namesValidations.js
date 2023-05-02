  // VALIDANDO LA CONSISTENCIA DE LOS NOMBRES

document.getElementById('nombre').addEventListener('input', validarNombre);
document.getElementById('apellido').addEventListener('input', validarApellido);
document.getElementById('dni').addEventListener('input', validarDNI);

  //NOMBRE
function validarNombre() {
  const nombre = document.getElementById('nombre');
  const errorNombre = document.getElementById("nombreError");
  const regex = /^[a-zA-Z ]+$/;

  const mensaje = document.getElementById('firstNameValidation');
  if (!regex.test(nombre.value)) {
    mensaje.innerHTML = '<i class="fas fa-times-circle"></i> El nombre solo debe contener letras y espacios';
    mensaje.className = ' ';
    nombre.className = ' ';
    mensaje.classList.add('validation-error');
    nombre.classList.add('input-error');
    errorNombre.style.display = "none";
  } else {
    mensaje.innerHTML = '<i class="fas fa-check-circle"></i> El nombre es válido';
    mensaje.className = ' ';
    nombre.className = ' ';
    mensaje.classList.add('validation-success');
    nombre.classList.add('input-success');
    errorNombre.style.display = "none";
  }
}

//APELLIDO
function validarApellido() {
  const apellido = document.getElementById('apellido');
  const errorApellido = document.getElementById("apellidoError");
  const regex = /^[a-zA-Z ]+$/;

  const mensaje = document.getElementById('lastNameValidation');
  if (!regex.test(apellido.value)) {
    mensaje.innerHTML = '<i class="fas fa-times-circle"></i> El apellido solo debe contener letras y espacios';
    mensaje.className = ' ';
    apellido.className = ' ';
    mensaje.classList.add('validation-error');
    apellido.classList.add('input-error');
    errorApellido.style.display = "none";
  } else {
    mensaje.innerHTML = '<i class="fas fa-check-circle"></i> El apellido es válido';
    mensaje.className = ' ';
    apellido.className = ' ';
    mensaje.classList.add('validation-success');
    apellido.classList.add('input-success');
    errorApellido.style.display = "none";
  }
}

// DNI
function validarDNI() {
  const dni = document.getElementById('dni');
  const errorDNI = document.getElementById("dniError");
  const regex = /^[0-9]{7,}$/;

  const mensaje = document.getElementById('dniValidation');
  if (!regex.test(dni.value)) {
    mensaje.innerHTML = '<i class="fas fa-times-circle"></i> El DNI no es válido';
    mensaje.className = ' ';
    dni.className = ' ';
    mensaje.classList.add('validation-error');
    dni.classList.add('input-error');
    errorDNI.style.display = "none";
  } else {
    mensaje.innerHTML = '<i class="fas fa-check-circle"></i> El DNI es válido';
    mensaje.className = ' ';
    dni.className = ' ';
    mensaje.classList.add('validation-success');
    dni.classList.add('input-success');
    errorDNI.style.display = "none";
  }
}