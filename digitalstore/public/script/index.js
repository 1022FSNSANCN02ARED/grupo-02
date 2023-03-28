const menuBtn = document.querySelector('#menu-button');
const menuHam = document.querySelector(".nav-links");
const user = document.querySelector(".usuario.header")


menuBtn.addEventListener("click", () => {
    menuHam.classList.toggle("show");
});

const catBtn = document.querySelector('.desplegable');
const catHam = document.querySelector("#categorias-form");

catBtn.addEventListener("click", () => {
    catHam.classList.toggle("show-cat");
});


const products = document.getElementById("product-item");
products.addEventListener("click",(e) => {
    window.location.href = "/products";
})


