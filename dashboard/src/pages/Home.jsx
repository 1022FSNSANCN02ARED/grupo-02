import React from "react";
import SmallCard from "../components/SmallCard";
import LastProduct from "../components/LastProduct";
import LastUser from "../components/LastUser";
import "./Home.css";
const myStats = [
  {
    id: 1,
    title: "Productos en DB",
    value: "19",
  },
  {
    id: 2,
    title: "Total de Marcas",
    value: "10",
  },
  {
    id: 3,
    title: "Total de Categorias",
    value: "8",
  },
];

function Home() {
  return (
    <>
      <div className="indicadores">
        {myStats.map((stat) => {
          return (
            <SmallCard key={stat.id} title={stat.title} value={stat.value} />
          );
        })}
      </div>

      <div className="indicadores ">
        <div>
          <LastProduct />
        </div>

        <div>
          <LastUser />
        </div>
      </div>
    </>
  );
}

export default Home;
