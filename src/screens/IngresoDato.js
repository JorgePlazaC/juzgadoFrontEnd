import React from "react";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, push, ref, set } from "firebase/database";

export const IngresoDato = () => {
  const [array, setArray] = useState([]);
  const [nombre, setNombre] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [apellido, setApellido] = useState("");

  //Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyCYw_a9MBVt8CrfLGJQoBgtmU_o2a0pUF4",
    authDomain: "juzgado-bc929.firebaseapp.com",
    databaseURL: "https://juzgado-bc929-default-rtdb.firebaseio.com",
    projectId: "juzgado-bc929",
    storageBucket: "juzgado-bc929.appspot.com",
    messagingSenderId: "870031317689",
    appId: "1:870031317689:web:1ae41009cf440ebb4f9968",
    measurementId: "G-PSKV396MB4",
  };

  const app = initializeApp(firebaseConfig);

  //Actualizar tiempo
  const IngresarDato = () => {
    const db = getDatabase();
    const reference = ref(db, "datos/");

    push(reference, {
      nombre: nombre,
      apellido: apellido,
      ciudad: ciudad,
    });
  };

  const editarNombre = (event) => {
    setNombre(event.target.value);
    console.log(nombre);
  };

  const editarApellido = (event) => {
    setApellido(event.target.value);
    console.log(apellido);
  };

  const editarCiudad = (event) => {
    setCiudad(event.target.value);
    console.log(ciudad);
  };
  return (
    <div>
      <form class="row g-3 needs-validation">
        <div class="col-md-4">
          <div class="form-outline">
            <input
              type="text"
              class="form-control"
              id="validationCustom01"
              value={nombre}
              onChange={editarNombre}
              required
            />
            <label for="validationCustom01" class="form-label">
              First name
            </label>
            <div class="valid-feedback">Looks good!</div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-outline">
            <input
              type="text"
              class="form-control"
              id="validationCustom02"
              value={apellido}
              onChange={editarApellido}
              required
            />
            <label for="validationCustom02" class="form-label">
              Last name
            </label>
            <div class="valid-feedback">Looks good!</div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-outline">
            <input
              type="text"
              class="form-control"
              id="validationCustom03"
              value={ciudad}
              onChange={editarCiudad}
              required
            />
            <label for="validationCustom03" class="form-label">
              City
            </label>
            <div class="invalid-feedback">Please provide a valid city.</div>
          </div>
        </div>
        <div class="col-12"></div>
      </form>
      <button class="btn btn-primary" onClick={IngresarDato}>
        Enviar
      </button>
    </div>
  );
};
