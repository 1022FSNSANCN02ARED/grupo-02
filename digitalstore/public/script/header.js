window.addEventListener("load", function(){
    
    const desplegable = document.querySelector(".nav-ul");
    const btnDesplegable = document.querySelector(".phone-icon-menu");
    const body = document.querySelector("body");

    btnDesplegable.addEventListener("click",() => { 
        desplegable.classList.toggle("open-nav");
        body.classList.toggle("overflow-hidden");
    })

    const btnUser = document.querySelector(".nav-img-login")
    const dropdownUser = document.querySelector(".user-dropdown")

    btnUser.addEventListener("click",() => { 
        btnUser.classList.toggle("border-effect");
        dropdownUser.classList.toggle("open-user-btn")
    })

    
})