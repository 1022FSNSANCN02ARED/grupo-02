import React, { useState, useEffect } from "react";
import "./Products.css";

function Products() {
  const [valor, setValor] = useState([]);

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch(" http://localhost:3000/api/products");
    const products = await data.json();
    await setValor(products.data);
    console.log(products.data);
  };

  return (
    <div className="renderProduct">
      <h1>Productos</h1>

      <ul>
        {/* {valor.length > 0 ? "tiene algo" : "no tiene elementos"} */}
        {valor.length > 0
          ? valor.map((item) => {
              return (
                <li key={item.id}>
                  {item.name} {item.price}
                </li>
              );
            })
          : "No hay elementos"}
        ;
      </ul>
    </div>
  );
}

export default Products;
