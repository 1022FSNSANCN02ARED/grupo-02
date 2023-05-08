import React from "react";
import { Link } from "react-router-dom";
import logoDigitalStore from "../images/logo_proyecto.jpg";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <Link to="/">
          <div>
            <img className="w-100" src={logoDigitalStore} alt="DIGITAL STORE" />
          </div>
        </Link>

        <li>Digital Store</li>

        <li>
          <Link to="/products">Productos</Link>
        </li>

        <li>
          <Link to="/users">Usuarios</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
