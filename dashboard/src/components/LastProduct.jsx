import React, { useState, useEffect } from "react";
import "./LastProduct.css";

function LastProduct() {
  const [ultimoValor, setultimoValor] = useState({});

  useEffect(() => {
    ultimoProducto();
  }, []);

  const ultimoProducto = async () => {
    const data = await fetch(" http://localhost:3000/api/products");
    const elements = await data.json();
    // await setValor(products.data);
    const ultimoValor = elements.data[elements.data.length - 1];
    // console.log(ultimoValor);
    setultimoValor(ultimoValor);
  };

  return (
    <div className="contenedor-product">
      <h3>Ultimo Producto en DB</h3>
      <img src={ultimoValor.image} alt="imagen ultimo producto" />
      <div className="nombrePrecio-product">
        <p>{ultimoValor.name}</p>
        <p> $ {ultimoValor.price} </p>
      </div>
    </div>
  );
}

export default LastProduct;
