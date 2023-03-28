window.addEventListener("load", function(){

//nombre
let nombreInput = document.querySelector(".nombreInput")


nombreInput.addEventListener("blur", function(){
    if(nombreInput.value.length > 0){
        nombreInput.style.backgroundColor = "#abf1ab "
    } else{
        nombreInput.style.backgroundColor = "red"
    }
})

//apellido 

let apellidoInput = document.querySelector(".apellidoInput")

apellidoInput.addEventListener("blur", function(){
    if(apellidoInput.value.length > 0){
        apellidoInput.style.backgroundColor = "#abf1ab "
    } else{
        apellidoInput.style.backgroundColor = "red"
    }

})

//usuario
let usuarioInput = document.querySelector(".usuarioInput")

usuarioInput.addEventListener("blur", function(){
    if(usuarioInput.value.length > 0){
        usuarioInput.style.backgroundColor = "#abf1ab "
    } else{
        usuarioInput.style.backgroundColor = "red"
    }
})

//contraseña 

let contraseña1 = document.querySelector(".contraseñaInput1")
let contraseña2 = document.querySelector(".contraseñaInput2")


// 
contraseña2.addEventListener("blur", function(){
    if(contraseña2.value.length > 0 && contraseña2.value === contraseña1.value){
        contraseña2.style.backgroundColor = "#abf1ab "
        contraseña1.style.backgroundColor = "#abf1ab "
    } else{
        contraseña2.style.backgroundColor = "red"
        contraseña1.style.backgroundColor = "red"
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
				email.style.backgroundColor = "red"
			}
            })
			
		





})