import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, HashRouter } from "react-router-dom";

//Propio del proyecto
import NavBar from "./components/NavBar";
import { IngresoDato } from "./screens/IngresoDato";
import { Home } from "./screens/Home";
import { Test } from "./screens/Test";
import { JuzgadoProvider } from "./components/JuzgadoContext";
import { InicioSesion } from "./screens/InicioSesion";
import { Registrar } from "./screens/Registrar";

function App() {
  return (
    <div className="App">
      <Router>
        <JuzgadoProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/ingreso" element={<IngresoDato />} />
          <Route path="/inicioSesion" element={<InicioSesion />} />
          <Route path="/registrar" element={<Registrar />} />
          <Route path="/test" element={<Test />} />
        </Routes>
        </JuzgadoProvider>
      </Router>
    </div>
  );
}

export default App;
