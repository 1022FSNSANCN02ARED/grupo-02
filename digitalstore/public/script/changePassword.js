window.addEventListener("load", function () {

    let contraseña1 = document.querySelector(".newPass1")
    let contraseña2 = document.querySelector(".newPass")
    let enviar = document.querySelector(".boton-enviar")

    contraseña2.addEventListener("keyup", function(){
        if(contraseña2.value.length > 0 && contraseña2.value === contraseña1.value){
            contraseña2.style.backgroundColor = "#abf1ab "
            contraseña1.style.backgroundColor = "#abf1ab "
        }
    })
    contraseña2.addEventListener("blur", function(){
        if(!(contraseña2.value.length > 0 && contraseña2.value === contraseña1.value)){
            contraseña2.style.backgroundColor = "red "
            contraseña1.style.backgroundColor = "red "
        }
    })
    contraseña2.addEventListener("keyup", function(){
        if(contraseña2.value.length > 0 && contraseña2.value === contraseña1.value){
            contraseña2.style.backgroundColor = "#abf1ab "
            contraseña1.style.backgroundColor = "#abf1ab "
        } else {
            contraseña2.style.backgroundColor = "red"
        }
    })

    enviar.addEventListener("click", (e) => {
        if(contraseña2.value.length == 0 || contraseña2.value !== contraseña1.value){
            
            e.preventDefault()
            contraseña2.style.backgroundColor = "red"
        } 
    })

})