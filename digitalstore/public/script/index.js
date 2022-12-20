const menuBtn = document.querySelector('#menu-button');
const menuHam = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    menuHam.classList.toggle("show");
});
