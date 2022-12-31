import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Propio del proyecto
import NavBar from "./components/NavBar";
import { IngresoDato } from "./screens/IngresoDato";
import { Home } from "./screens/Home";
import { Test } from "./screens/Test";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/ingreso" element={<IngresoDato />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
