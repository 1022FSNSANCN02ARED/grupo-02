import React from "react";
import { Link } from "react-router-dom";
import logoDigitalStore from "../images/icon.png";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/">
        <div className="nav-title">
          <img src={logoDigitalStore} alt="DIGITAL STORE" />
          <h3>Digital Store</h3>
        </div>
      </Link>
      <ul>
        <li>
          <Link to="/">
            <i class="fa-solid fa-house"></i> Inicio
          </Link>
        </li>
        <li>
          <Link to="/products">
            <i class="fa-solid fa-cart-flatbed"></i> Productos
          </Link>
        </li>

        <li>
          <Link to="/users">
            <i class="fa-regular fa-user"></i> Usuarios
          </Link>
        </li>

        <li>
          <Link to="/categories">
            <i class="fa-solid fa-square-poll-horizontal"></i> Categorias
          </Link>
        </li>
        <li>
          <Link to="/brands">
            <i class="fa-solid fa-square-poll-horizontal"></i> Marcas
          </Link>
        </li>
      </ul>
      <div className="nav-view-page">
        <a href="http://localhost:3000/" target="_blank" rel="noreferrer">
          Ver página
        </a>
      </div>
    </div>
  );
}

export default Sidebar;
