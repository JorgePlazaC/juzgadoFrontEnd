import React from "react";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, push, ref, set } from "firebase/database";

export const IngresoDato = () => {
  const [array, setArray] = useState([]);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [observaciones, setObservaciones] = useState("");

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
    let reference = ref(db, "datos/");

    let dato = {
      nombre: nombre,
      correo:correo,
      telefono: telefono,
      observaciones: observaciones,
      key: "",
    };

    const response = push(reference, dato);

    dato.key = response.key;
    reference = ref(db, "datos/" + dato.key);
    set(reference, dato);

    console.log("ID obtenida: " + response.key);
  };

  const editarNombre = (event) => {
    setNombre(event.target.value);
    console.log(nombre);
  };

  const editarCorreo = (event) => {
    setCorreo(event.target.value);
    console.log(correo);
  };

  const editarTelefono = (event) => {
    setTelefono(event.target.value);
    console.log(observaciones);
  };

  const editarObservaciones = (event) => {
    setObservaciones(event.target.value);
    console.log(telefono);
  };
  return (
    <div className="container mt-3">
      <h2>Ingreso de datos</h2>
      <form class="row g-3 mt-2 needs-validation">
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
              Nombre
            </label>
            <div class="valid-feedback">Looks good!</div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-outline">
            <input
              type="text"
              class="form-control"
              id="validationCustom01"
              value={correo}
              onChange={editarCorreo}
              required
            />
            <label for="validationCustom01" class="form-label">
              Correo
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
              value={telefono}
              onChange={editarTelefono}
              required
            />
            <label for="validationCustom02" class="form-label">
              Telefono
            </label>
            <div class="valid-feedback">Looks good!</div>
          </div>
        </div>
        <div  className="mx-auto">
          <div class="form-outline">
            <textarea
              class="form-control"
              value={observaciones}
              onChange={editarObservaciones}
              rows={5}
              required
            >
            </textarea>
            <label for="validationCustom03" class="form-label">
              Observaciones
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
