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

  function deleteProduct(product) {
    fetch("http://localhost:3000/api/products/delete/" + product.id, {
      method: "delete",
    })
      .then((msg) => msg.json())
      .then((msg) => {
        obtenerDatos();

        console.log(msg);
      });
  }

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
            <th colSpan={3}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {valor.length > 0
            ? valor.map((product) => {
                return (
                  <tr>
                    <td key={product.id}>{product.id} </td>

                    <td> {product.name} </td>

                    <td>
                      {"$"} {product.price}{" "}
                    </td>

                    {/* boton de ver detalle */}
                    <td>
                      <button>
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href={
                            "http://localhost:3000/products/detail/" +
                            product.id
                          }
                        >
                          <i
                            class="fa-solid fa-eye"
                            style={{ color: "blue" }}
                          ></i>
                        </a>
                      </button>{" "}
                      {"    "}
                      {/* boton de editar producto */}
                      <button>
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href={
                            "http://localhost:3000/products/edit/" + product.id
                          }
                        >
                          <i
                            class="fa-solid fa-pencil"
                            style={{ color: "green" }}
                          ></i>
                        </a>
                      </button>
                      {"    "}
                      {/* boton de eliminar producto */}
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              "Estas seguro de eliminar el producto\n" +
                                product.name +
                                "?"
                            )
                          ) {
                            deleteProduct(product);
                            alert("PRODUCTO ELIMINADO!");
                          }
                        }}
                      >
                        <i
                          className="fa-solid fa-trash-can"
                          style={{ color: "red" }}
                        ></i>
                      </button>
                      {"    "}
                    </td>
                  </tr>
                );
              })
            : "No hay elementos"}
        </tbody>{" "}
      </table>
    </div>
  );
}

export default Products;
