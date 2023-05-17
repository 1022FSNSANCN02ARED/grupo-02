window.addEventListener("load", function () {
    // const expresiones = {
    //     usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    //     nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    //     password: /^.{4,12}$/, // 4 a 12 digitos.
    //     correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,

    // }

    let enviar = document.querySelector(".boton-enviar")

  


    let nombreInput = document.querySelector(".nombreInput")


    nombreInput.addEventListener("blur", function(){
        if(nombreInput.value.length > 0){
            nombreInput.style.backgroundColor = "#abf1ab "
        } else{
            nombreInput.style.backgroundColor = "#ed303c"
        }
    })

    //apellido 

    let apellidoInput = document.querySelector(".apellidoInput")

    apellidoInput.addEventListener("blur", function(){
        if(apellidoInput.value.length > 0){
            apellidoInput.style.backgroundColor = "#abf1ab "
        } else{
            apellidoInput.style.backgroundColor = "#ed303c"
        }

    })

    //usuario
    let usuarioInput = document.querySelector(".usuarioInput")

    usuarioInput.addEventListener("blur", function(){
        if(usuarioInput.value.length > 0){
            usuarioInput.style.backgroundColor = "#abf1ab "
        } else{
            usuarioInput.style.backgroundColor = "#ed303c"
        }
    })


    //contraseña 

    let contraseña1 = document.querySelector(".contraseñaInput1")
    let contraseña2 = document.querySelector(".contraseñaInput2")


    // 
    contraseña2.addEventListener("keyup", function(){
        if(contraseña2.value.length > 0 && contraseña2.value === contraseña1.value){
            contraseña2.style.backgroundColor = "#abf1ab "
            contraseña1.style.backgroundColor = "#abf1ab "
        }
    })
    contraseña2.addEventListener("blur", function(){
        if(!(contraseña2.value.length > 0 && contraseña2.value === contraseña1.value)){
            contraseña2.style.backgroundColor = "#ed303c "
            contraseña1.style.backgroundColor = "#ed303c "
        }
    })
    contraseña2.addEventListener("keyup", function(e){
        if(contraseña2.value.length > 0 && contraseña2.value === contraseña1.value){
            contraseña2.style.backgroundColor = "#abf1ab "
            contraseña1.style.backgroundColor = "#abf1ab "
        } else {
            contraseña2.style.backgroundColor = "#ed303c"

        }
    })


    enviar.addEventListener("submit", (e) => {
        if(contraseña2.value.length == 0 || contraseña2.value !== contraseña1.value || contraseña1.value !== contraseña2.value){
            
            e.preventDefault()
            contraseña2.style.backgroundColor = "#ed303c"
            contraseña2.style.backgroundColor = "#ed303c"
        } 
    })

    contraseña1.addEventListener("keyup", function(e){
        if(contraseña1.value.length > 0 && contraseña1.value === contraseña2.value){
            contraseña1.style.backgroundColor = "#abf1ab "
            contraseña1.style.backgroundColor = "#abf1ab "
        } else {
            contraseña1.style.backgroundColor = "#ed303c"

        }
    })



   


    //email

    let email = document.querySelector(".emailInput");

    			// Verificar si la entrada cumple con el formato de un email válido

                email.addEventListener("blur",function(){
                    if (email.value.length >= 7) {
    				// Si la entrada es un email válido, mostrar un mensaje de éxito
    				email.style.backgroundColor = "#abf1ab"
    			} else {
    				// Si la entrada no es un email válido, mostrar un mensaje de error
    				email.style.backgroundColor = "#ed303c"
    			}
                })







})