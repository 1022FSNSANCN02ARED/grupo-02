import React from "react";
import "./BigCard.css";

function BigCard({ title, children }) {
  return (
    <>
      <div>
        <h3>{title}</h3>
      </div>

      <div>{children}</div>
    </>
  );
}

export default BigCard;
