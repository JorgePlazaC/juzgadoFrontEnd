import React from "react";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, push, ref, set } from "firebase/database";

import { DespliegueDatos } from "../components/DespliegueDatos";

export const Home = () => {
  const [array, setArray] = useState([]);
  const [cargando, setCargando] = useState(true);

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

      snapshot.forEach((dato) => {
        const valor = dato.val();
        //console.log(valor)
        data.push(valor);
      });
      setArray(await data);
      setCargando(false);
    });
  };

  //Listar datos
  const DesplegarDatos = () => {
    //-------------------------------------------------------------------------- ARREGLAR DESPLIEGUE ---------------------------------------------------------------------
    if (cargando) {
      return <h2>Cargando</h2>;
    } else {
      console.log(cargando);
      console.log(array);
      return array.map((dato,i) => (
        <DespliegueDatos key={i} item={dato} />
      ));
    }
  };

  return (
    <div className="mt-3">
      Home
      <div class='container'> <div class="list-group">{DesplegarDatos()}</div></div>
      
    </div>
  );
};
