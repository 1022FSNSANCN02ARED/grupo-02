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
          </tr>
        </thead>

        <tbody>
          {valor.length > 0
            ? valor.map((item) => {
                return (
                  <tr>
                    <td key={item.id}>{item.id} </td>

                    <td> {item.name} </td>

                    <td>
                      {"$"} {item.price}{" "}
                    </td>

                    {/* icono de ver detalle */}
                    <td>
                      <i class="fa-solid fa-eye" style={{ color: "blue" }}></i>
                    </td>

                    {/* icono de editar producto */}
                    <td>
                      <i
                        class="fa-solid fa-pencil"
                        style={{ color: "green" }}
                      ></i>
                    </td>

                    {/* icono de eliminar producto */}
                    <td>
                      <i
                        class="fa-solid fa-trash-can"
                        style={{ color: "red" }}
                      ></i>
                    </td>
                  </tr>
                );
              })
            : "No hay elementos"}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
