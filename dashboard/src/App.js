import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebarr.jsx";
import Footer from "./components/Footer";
import MainContent from "./components/MainContent"


function App() {
  return (
    <Router>
      <Header />
      <div className="flex">
         <Sidebar />
          <div className="content">
            <MainContent />
          </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
