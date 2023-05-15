import React from "react";
import SmallCard from "../components/SmallCard";
import LastProduct from "../components/LastProduct";
import LastUser from "../components/LastUser";
import "./Home.css";

// const myStats = [
//   {
//     id: 1,
//     title: "Productos en DB",
//     value: 0,
//   },
//   {
//     id: 2,
//     title: "Total de Marcas",
//     value: 0,
//   },
//   {
//     id: 3,
//     title: "Total de Categorias",
//     value: 0,
//   },
// ];

function Home() {
  const [productsTotal, setproductsTotal] = useState(0);
  const [brandsTotal, setbrandsTotal] = useState(0);
  const [categoryTotal, setcategoryTotal] = useState(0);

  function apiProduct() {
    fetch(link)
      .then((response) => response.json())
      .then((data) => {
        myStats[pos].value = data.meta.total;
      })
      .catch((error) => console.error(error));
  }

  function apiBrand() {
    fetch(link)
      .then((response) => response.json())
      .then((data) => {
        myStats.value = data.meta.total;
      })
      .catch((error) => console.error(error));
  }

  function apiCategory() {
    fetch()
      .then((response) => response.json())
      .then((data) => {
        myStats[pos].value = data.meta.total;
      })
      .catch((error) => console.error(error));
  }

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
