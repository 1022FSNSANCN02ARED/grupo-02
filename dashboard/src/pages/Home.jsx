import React, { useEffect } from "react";
import SmallCard from "../components/SmallCard";
import LastProduct from "../components/LastProduct";
import LastUser from "../components/LastUser";
import "./Home.css";
import {useState} from "react"

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

  useEffect(() => {
    apiProduct();
  },[])
  
  function apiProduct() {
    fetch("http://localhost:3000/api/products")
      .then((response) => response.json())
      .then((data) => {
        setproductsTotal(data.meta.total)
      })
      .catch((error) => console.error(error));
  }

  
  // function apiProduct() {
  //   fetch("http://localhost:3000/api/products")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setproductsTotal(data.meta.total)
  //     })
  //     .catch((error) => console.error(error));
  // }
  // function apiProduct() {
  //   fetch("http://localhost:3000/api/products")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setproductsTotal(data.meta.total)
  //     })
  //     .catch((error) => console.error(error));
  // }

  // function apiBrand() {
  //   fetch(link)
  //     .then((response) => response.json())
  //     .then((data) => {
        
  //     })
  //     .catch((error) => console.error(error));
  // }

  // function apiCategory() {
  //   fetch()
  //     .then((response) => response.json())
  //     .then((data) => {
        
  //     })
  //     .catch((error) => console.error(error));
  // }

  return (
    <>
      <div className="indicadores">

        <SmallCard key={productsTotal+"productos"} title={"Total de productos:"} value={productsTotal} />
        <SmallCard key={productsTotal+"brands"} title={"Total de marcas:"} value={productsTotal} />
        <SmallCard key={productsTotal+"category"} title={"Total de categorias:"} value={productsTotal} />

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
