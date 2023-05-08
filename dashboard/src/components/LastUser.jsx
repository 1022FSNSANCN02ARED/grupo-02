import React from "react";
import ultimoUsuario from "../images/image-1678824214422.jpeg";
import BigCard from "./BigCard";
import UserAbstract from "./UserAbstract";

function LastUser() {
  return (
    <BigCard title="Ultimo Usuario en DB">
      <UserAbstract
        img={ultimoUsuario}
        title="Georgina Barrios"
        desc="Usuario"
        url="/"
      />
    </BigCard>
  );
}

export default LastUser;
