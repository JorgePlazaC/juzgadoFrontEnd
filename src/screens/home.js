import React from "react";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { Table, Button } from "react-bootstrap";

import { DespliegueDatos } from "../components/DespliegueDatos";

export const Home = () => {
  const [array, setArray] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [paginaActual, setPaginaActual] = useState(1);

  const arreglo = ["perro", "asd", "xcv"];

  //UseEfect
  useEffect(() => {
    (async () => {
      fetchFirebase();
    })();
  }, []);

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

  //Objeto
  let dato = {
    apellido: String,
    ciudad: String,
    nombre: String,
  };

  //Obtener datos
  const fetchFirebase = () => {
    const db = getDatabase();
    const reference = ref(db, "datos/");
    onValue(reference, async (snapshot) => {
      const data = [];

      await snapshot.forEach((dato) => {
        const valor = dato.val();
        //console.log(valor)
        data.push(valor);
      });
      setArray(await data);
      setCargando(false);
    });
  };

  //Siguiente página
  const SiguientePagina = () => {
    let suma = paginaActual;
    suma++
    //console.log(suma)
    setPaginaActual(suma);
    console.log(paginaActual)
  };

  //Listar datos
  const DesplegarDatos = () => {
    //-------------------------------------------------------------------------- ARREGLAR DESPLIEGUE ---------------------------------------------------------------------
    if (cargando) {
      return <h2>Cargando</h2>;
    } else {
      //console.log(cargando);
      //console.log(array);
      return (
        <div>
          <Table className="container shadow-lg" striped>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Telefono</th>
                <th>Observaciones</th>
              </tr>
            </thead>
            <DespliegueDatos
              item={dato}
              array={array}
              paginaAct={paginaActual}
            />
          </Table>
          <Button onClick={SiguientePagina}>Siguiente</Button>
        </div>
      );
    }
  };

  return (
    <div className="mt-3 ">
      <div class="container">{DesplegarDatos()}</div>
    </div>
  );
};
