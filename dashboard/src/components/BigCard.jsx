import React from "react";
import "./BigCard.css";

function BigCard({ title, children }) {
  return (
    <>
      <div className="idCard">
        <h3>{title}</h3>
      </div>

      <div className="descCard">{children}</div>
    </>
  );
}

export default BigCard;
