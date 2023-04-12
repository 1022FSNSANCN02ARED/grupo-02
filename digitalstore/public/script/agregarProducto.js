window.addEventListener("load", () => {
  submitt = document.querySelector(".button-form");

  submitt = document.querySelector(".button-form");

  const nombre = document.querySelector(".input-nombre");
  const errorH2 = document.querySelector(".errorH2");

  const errorPrecio = document.querySelector(".errorPrecio");
  const inputPrecio = document.querySelector(".input-number");

  submitt.addEventListener("click", function (e) {
    if (nombre.value == 0) {
      e.preventDefault();
      errorH2.style.color = "red";
      errorH2.innerHTML =
        "El nombre del producto debe tener al menos 3 caracteres";
    } else if (inputPrecio.value == 0) {
      e.preventDefault();
      errorPrecio.innerHTML = "El precio debe ser mayor o igual a $100";
      errorPrecio.style.color = "red";
    }
  });

  //NOMBRE DE PRODUCTO

  nombre.addEventListener("blur", function () {
    if (nombre.value.length < 3) {
      errorH2.style.color = "red";
      errorH2.innerHTML =
        "El nombre del producto debe tener al menos 3 caracteres";
    } else {
      errorH2.innerHTML = "";
    }
  });

  //PRECIO DEL PRODUCTO

  inputPrecio.addEventListener("keyup", function () {
    if (inputPrecio.value.length >= 3) {
      errorPrecio.innerHTML = "";
    } else {
      errorPrecio.innerHTML = "El precio debe ser mayor o igual a $100";
      errorPrecio.style.color = "red";
    }
  });

  //IMAGEN
});
