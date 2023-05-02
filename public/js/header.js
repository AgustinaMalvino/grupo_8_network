window.onload = function () {
    const burgerMenu = document.querySelector('.burger-menu');
    const headerNewProduct = document.getElementById('newProduct');
    const headerCart = document.getElementById('productCart');
    const headerProfile = document.getElementById('profile');
    const headerLogout = document.getElementById('logout');
    const headerLogin = document.getElementById('login');
    const headerRegister = document.getElementById('register');

    burgerMenu.addEventListener('click', () => {
        headerNewProduct.classList.toggle('active');
        headerCart.classList.toggle('active');
        headerProfile.classList.toggle('active');
        headerLogout.classList.toggle('active');
        headerLogin.classList.toggle('active');
        headerRegister.classList.toggle('active')
    });
}