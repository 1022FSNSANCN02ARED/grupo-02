import React, { useState, useEffect } from "react";
import "./Brands.css";

function Categories() {
  const [valorProd, setValorProd] = useState([]);
  const [valorBrand, setValorCat] = useState([]);
  useEffect(() => {
    obtenerDatos();
    obtenerDatosBrand();
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch(" http://localhost:3000/api/products");
    const products = await data.json();
    await setValorProd(products.data);
    console.log(products.data);
  };

  const obtenerDatosBrand = async () => {
    const data = await fetch(" http://localhost:3000/api/products/brands/list");
    const categories = await data.json();
    await setValorCat(categories.data);
    console.log(categories.data);
  };

  return (
    <div className="renderProduct">
      <div className="titleProduct">
        <h1>PANEL DE MARCAS</h1>
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
            ? valorBrand.map((brand) => {
                return (
                  <tr>
                  <td key={brand.id}> {brand.id} </td>

                    <td> {brand.name} </td>

                    <td>{brand.count}</td>
                 
                    
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
