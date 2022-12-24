import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Propio del proyecto
import NavBar from "./components/NavBar";
import { IngresoDato } from "./screens/IngresoDato";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<div>Hola</div>} />
          <Route path="/ingreso" element={<IngresoDato />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
