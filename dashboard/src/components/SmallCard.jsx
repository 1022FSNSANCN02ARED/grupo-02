import React from "react";
import "./SmallCard.css";

function SmallCard({ title, value }) {
  return (
    <>
      <div className="col-md-4 mb-4 ">
        <div>{title}</div>

        <div>{value}</div>
      </div>
    </>
  );
}

export default SmallCard;
