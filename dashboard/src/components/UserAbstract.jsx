import React from "react";
import "./UserAbstract.css";

function ProductAbstract({ user, title, desc, img, url }) {
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
      <p>{user}</p>
      <p>{desc}</p>
    </>
  );
}

export default ProductAbstract;
