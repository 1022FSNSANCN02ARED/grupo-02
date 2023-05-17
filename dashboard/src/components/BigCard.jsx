import React from "react";
import "./BigCard.css";

function BigCard({ title, children }) {
  return (
    <>
    <div className="bigcard">
      <div className="idCard">
        <h3>{title} </h3>
      </div>

      <div className="descCard">{children}</div>
    </div>
      
    </>
  );
}

export default BigCard;
