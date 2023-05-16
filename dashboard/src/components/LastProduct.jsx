import React, { useState, useEffect } from "react";

import BigCard from "./BigCard";
// import ProductAbstract from "./ProductAbstract";

function LastProduct() {
  const [ultimoValor, setultimoValor] = useState({});

  useEffect(() => {
    ultimoProducto();
  }, []);

  const ultimoProducto = async () => {
    const data = await fetch(" http://localhost:3000/api/products");
    const elements = await data.json();
    // await setValor(products.data);
    const ultimoValor = elements[elements.length - 1];
    // console.log(ultimoValor);
    setultimoValor(ultimoValor);
  };

  return (
    <div>
      <BigCard
        title="Ultimo Producto en DB"
        img={ultimoValor.data.image}
        product={ultimoValor.data.name}
        desc={ultimoValor.data.discount}
        url="/"
      ></BigCard>
    </div>
  );
}

export default LastProduct;
