import React from "react";
import "./SmallCard.css";

function SmallCard({ title, value }) {
  return (
    <>
      <div className="mark">
        <div>{title}</div>

        <div>{value}</div>
      </div>
    </>
  );
}

export default SmallCard;
