import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import JuzgadoContext from "./JuzgadoContext";
import { VerificarSesion } from "../services/VerificarSesion";

const NavBar = () => {
  //UseContext
  const { usuario, setUsuario } = useContext(JuzgadoContext);

  //UseState
  const [cargando,setCargando] = useState(true)

  //UseEffect
  useEffect(() => {
    return () => {
      VerificarSesion(setUsuario);
    };
  }, []);

  const [barraLateral, setBarraLateral] = useState(false);

  /*
  const VerificarSesion = async () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log(user);
        setUsuario(user);
        setCargando(false)
        // ...
      } else {
        // User is signed out
        console.log("No hay sesión iniciada");
        // ...
      }
    });
  };
  */

  const CerrarSesion = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      //Navigate('/')
      setUsuario(undefined);
      console.log("Sesión cerrada");
    });
  };

  const abrirBarraLateral = () => {
    setBarraLateral(true);
  };

  const cerrarBarraLateral = () => {
    setBarraLateral(false);
  };
  /*
  <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="/">
          Navbar
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a class="nav-link" href="/ingreso">
                Ingreso
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/test">
                Test
              </a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">
                  Action
                </a>
                <a class="dropdown-item" href="#">
                  Another action
                </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#">
                Disabled
              </a>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>
  */

  return (
    <div>
      {usuario ? (
        <div>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="/">
              Inicio
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={abrirBarraLateral}
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                  <a class="nav-link" href="/ingreso">
                    Ingreso de datos
                  </a>
                </li>

                <li class="nav-item">
                  <a class="nav-link" href="/registrar">
                    {usuario.email}
                  </a>
                </li>

                <li class="nav-item">
                  <a class="nav-link" onClick={CerrarSesion} href="/">
                    Cerrar Sesión
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <Offcanvas show={barraLateral} onHide={cerrarBarraLateral}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menú</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <a class="navbar-brand" href="/">
                Inicio
              </a>
              <a class="nav-link" href="/ingreso">
                Ingreso de datos
              </a>
              <a class="nav-link" onClick={CerrarSesion} href="/">
                Cerrar Sesión
              </a>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      ) : (
        <div>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="/">
              Inicio
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={abrirBarraLateral}
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                  <a class="nav-link" href="/inicioSesion">
                    Iniciar sesión
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/registrar">
                    Registrarse
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <Offcanvas show={barraLateral} onHide={cerrarBarraLateral}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menú</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <a class="navbar-brand" href="/">
                Inicio
              </a>
              <a class="nav-link" href="/inicioSesion">
                Iniciar sesión
              </a>
              <a class="nav-link" href="/registrar">
                Registrarse
              </a>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      )}
    </div>
  );
};

export default NavBar;
