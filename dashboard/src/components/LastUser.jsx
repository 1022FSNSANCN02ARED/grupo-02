import React, { useState, useEffect } from "react";

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
    <div>
      <h3>Ultimo Usuario en DB</h3>
      <img src={ultimoValor.img} alt="imagen ultimo usuario" />

      <p>{ultimoValor.email}</p>
      <p>
        {ultimoValor.firstName} {ultimoValor.lastName}{" "}
      </p>
    </div>
  );
}

export default LastUser;
