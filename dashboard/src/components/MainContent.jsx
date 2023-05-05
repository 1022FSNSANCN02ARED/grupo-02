import React from 'react';
import "./MainContent.css"
import { Route, Routes} from 'react-router-dom';
import Home from "../pages/Home";
import Products from "../pages/Products";
import Users from "../pages/Users";
import Page404 from '../pages/Page404';


function MainContent() {
  return (
    <Routes>
      <Route path="/" element={<Home />} exact />
      <Route path="/products" element={<Products />} />
      <Route path="/users" element={<Users />} />
      <Route path="*" element={<Page404 />} />
   
    </Routes>
  );
}

export default MainContent;