const menuBtn = document.querySelector('#menu-button');
const menuHam = document.querySelector(".nav-links");
const user = document.querySelector(".usuario.header")


const catBtn = document.querySelector('.desplegable');
const catHam = document.querySelector("#categorias-form");

catBtn.addEventListener("click", () => {
    catHam.classList.toggle("show-cat");
})
;

const products = document.getElementById("product-item");
products.addEventListener("click",(e) => {
    window.location.href = "/products";
})

// const filters = document.querySelector(".container-categories form");
// const filtersBtn = document.querySelector(".desplegable");




