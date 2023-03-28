window.addEventListener("load", function(){


let usuario = document.querySelector(".usuarioHeader")
let desplegable = document.querySelector(".div-desplegable-header")
let cerrarDesplegable = document.querySelector(".cerrarDesplegable")


usuario.addEventListener("click", function(e){
    e.preventDefault();
    desplegable.style.marginLeft = "0vw";
    
})
cerrarDesplegable.addEventListener("click", function(e){
    e.preventDefault();
    desplegable.style.marginLeft = "60vw";
    
})











})