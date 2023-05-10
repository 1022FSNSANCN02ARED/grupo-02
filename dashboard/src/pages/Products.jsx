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
      <div className="titleProduct">
        <h1>PANEL DE PRODUCTOS</h1>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Descripcion</th>
          </tr>
        </thead>
        <tbody>
          {valor.length > 0
            ? valor.map((item) => {
                return (
                  <th key={item.id}>
                    {item.id}
                    {item.name} {"$"} + {item.price} + {item.description}
                  </th>
                );
              })
            : "No hay elementos"}
          ;
        </tbody>
      </table>
    </div>
  );
}

export default Products;
