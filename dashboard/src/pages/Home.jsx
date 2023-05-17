import React, { useEffect } from "react";
import SmallCard from "../components/SmallCard";
import LastProduct from "../components/LastProduct";
import LastUser from "../components/LastUser";
import "./Home.css";
import { useState } from "react";

function Home() {
  const [productsTotal, setproductsTotal] = useState(0);

  const [usersTotal, setusersTotal] = useState(0);

  useEffect(() => {
    apiProduct();
    apiUser();
  }, []);

  function apiProduct() {
    fetch("http://localhost:3000/api/products")
      .then((response) => response.json())
      .then((data) => {
        setproductsTotal(data.meta.total);
      })
      .catch((error) => console.error(error));
  }

  function apiUser() {
    fetch("http://localhost:3000/api/users")
      .then((response) => response.json())
      .then((data) => {
        setusersTotal(data.meta.total);
      })
      .catch((error) => console.error(error));
  }

  return (
    <>
      <div className="indicadores">
        <SmallCard
          key={productsTotal + "productos"}
          title={"Total de productos: "}
          value={productsTotal} 
        />
        <SmallCard
          key={usersTotal + "usuarios"}
          title={"Total de usuarios:"}
          value={usersTotal}
        />
      </div>

      <div className="indicadores2">
        <div className="lastProduct">
          <LastProduct />
        </div>

        <div className="lastUser">
          <LastUser />
        </div>
      </div>
    </>
  );
}

export default Home;
