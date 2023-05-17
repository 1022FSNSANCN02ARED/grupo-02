import React from "react";
import "./SmallCard.css";

function SmallCard({ title, value }) {
  return (
    <>
      <div className="mark">
        <div className="title">{title}</div>

        <div className="cantidad">{value}</div>
      </div>
    </>
  );
}

export default SmallCard;
