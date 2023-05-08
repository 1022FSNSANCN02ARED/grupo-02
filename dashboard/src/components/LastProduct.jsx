import React from "react";
import ultimoProducto from "../images/auriculares-redragon.jpg";
import BigCard from "./BigCard";
import ProductAbstract from "./ProductAbstract";

function LastProduct() {
  return (
    <BigCard title="Ultimo Producto en DB">
      <ProductAbstract
        img={ultimoProducto}
        title="Auriculares Redragon H120 Ares PC"
        desc="Este es un auricular para PC"
        url="/"
      />
    </BigCard>
  );
}

export default LastProduct;
