import React from "react";
import "./UserAbstract.css";

function ProductAbstract({ title, desc, img, url }) {
  return (
    <>
      <div>
        <img
          className="img-fluid px-3 px-sm-4"
          style={{
            width: "10rem",
          }}
          src={img}
          alt={title}
        />
      </div>
      <p>{desc}</p>
      <a target="_blank" rel="noreferrer" href={url}>
        Ver detalle del Producto{" "}
      </a>
    </>
  );
}

export default ProductAbstract;
