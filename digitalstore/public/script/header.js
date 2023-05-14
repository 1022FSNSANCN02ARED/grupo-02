window.addEventListener("load", function(){
    
    const desplegable = document.querySelector(".nav-ul");
    const btnDesplegable = document.querySelector(".phone-icon-menu");
    const body = document.querySelector("body");

    btnDesplegable.addEventListener("click",() => { 
        desplegable.classList.toggle("open-nav");
        body.classList.toggle("overflow-hidden");
    })

})