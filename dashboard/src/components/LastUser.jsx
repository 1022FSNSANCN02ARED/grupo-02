import React, { useState, useEffect } from "react";
import "./LastUser.css";
function LastUser() {
  const [ultimoValor, setultimoValor] = useState({});

  useEffect(() => {
    ultimoUsuario();
  }, []);

  const ultimoUsuario = async () => {
    const data = await fetch(" http://localhost:3000/api/users");
    const elements = await data.json();
    const ultimoValor = elements.data[elements.data.length - 1];
    setultimoValor(ultimoValor);
  };

  return (
    <div className="contenedor-User">
      <h3>Ultimo Usuario en DB</h3>
      <img
        className="imglastUser"
        src={ultimoValor.img}
        alt="imagen ultimo usuario"
      />

      <p className="email-user">
        {" "}
        Email: <p>{ultimoValor.email}</p>
      </p>
      <p className="nombre-user">
        Nombre y apellido:{" "}
        <p>
          {ultimoValor.firstName} {ultimoValor.lastName}
        </p>{" "}
      </p>
    </div>
  );
}

export default LastUser;
