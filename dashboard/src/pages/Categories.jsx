import React, { useState, useEffect } from "react";
import "./Categories.css";

function Categories() {
  const [valorProd, setValorProd] = useState([]);
  const [valorCat, setValorCat] = useState([]);
  useEffect(() => {
    obtenerDatos();
    obtenerDatosCat();
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch(" http://localhost:3000/api/products");
    const products = await data.json();
    await setValorProd(products.data);
    console.log(products.data);
  };

  const obtenerDatosCat = async () => {
    const data = await fetch(" http://localhost:3000/api/products/categories/list");
    const categories = await data.json();
    await setValorCat(categories.data);
    console.log(categories.data);
  };

  return (
    <div className="renderProduct">
      <div className="titleProduct">
        <h1>PANEL DE CATEGORIAS</h1>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th colSpan={3}>Cantidad de Productos</th>
          </tr>
        </thead>
        <tbody>
          {valorProd.length > 0
            ? valorCat.map((cat) => {
                return (
                  <tr>
                    <td key={cat.id}>{cat.id} </td>

                    <td> {cat.name} </td>

                    <td>{" "}</td>
                 
                    
                  </tr>
                  
                );
              })
              
            : "No hay elementos"}
        </tbody>{" "}
      </table>
    </div>
  );
}

export default Categories;
