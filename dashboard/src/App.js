import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import Sidebar from "./components/Sidebarr.jsx";
import MainContent from "./components/MainContent";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="content">
          <MainContent />
        </div>
      </div>
    </Router>
  );
}

export default App;
