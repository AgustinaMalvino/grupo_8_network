window.onload = function(){

const discountTrue = document.getElementById('yes');
const discountFalse = document.getElementById('no');
const inputDiscount = document.getElementById('descuento');

// Verifica el valor inicial del input de tipo radio al cargar la página
if (discountFalse.checked) {
  inputDiscount.disabled = true;
} else {
  inputDiscount.disabled = false;
}

// Si se selecciona la opción "Si" de las oopciones de descuento, se habilita el campo del descuento a ofrecer
discountTrue.addEventListener('change', () => {
  if (discountTrue.checked) {
    inputDiscount.disabled = false;
  }
});

// Si se selecciona la opción "No" de las oopciones de descuento, se deshabilita el campo del descuento a ofrecer y no se puede escribir nada
discountFalse.addEventListener('change', () => {
  if (discountFalse.checked) {
    inputDiscount.disabled = true;
  }
});

// Desaparecer el mensaje luego de agregar/modificar un producto
const mensajeSatisfactorio = document.getElementById('mensaje-satisfactorio');
const mensajeError = document.getElementById('mensaje-error');

setTimeout(() => {
  mensajeSatisfactorio.style.opacity = 0;
}, 5000);
setTimeout(() => {
  mensajeSatisfactorio.style.display = 'none';
}, 6000);

setTimeout(() => {
  mensajeError.style.opacity = 0;
}, 5000);
setTimeout(() => {
  mensajeError.style.display = 'none';
}, 6000);

}