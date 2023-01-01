import React from "react";
import { useState, useEffect, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { Table, Button } from "react-bootstrap";

//Propio del proyecto
import JuzgadoContext from "../components/JuzgadoContext";
import { DespliegueDatos } from "../components/DespliegueDatos";

export const Home = () => {
  const [array, setArray] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [paginasMax, setPaginasMax] = useState(10);
  const [pagActual, setPagActual] = useState(1);
  const [arrayPaginacion, setArrayPaginacion] = useState([]);
  const [siguienteDisponible, setSiguienteDisponible] = useState(true);
  const [anteriorDisponible, setAnteriorDisponible] = useState(false);

  let arraySeleccion = [];

  //UseContext
  const { paginaActual, setPaginaActual, iniciado, setIniciado } =
    useContext(JuzgadoContext);

  //UseEfect
  useEffect(() => {
    (async () => {
      await fetchFirebase();
      //await Paginacion()
      //SiguientePagina()
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
      await setArray(await data);
      //Paginacion()

      //Paginacion
      let arraySlice = [];
      arraySlice = data;
      arraySlice = arraySlice.slice(
        (pagActual - 1) * 10,
        paginasMax * pagActual
      );
      //arraySlice = arraySlice.slice(0,10)
      arraySeleccion = arraySlice;
      console.log("Array seleccion 2");
      console.log(arraySeleccion);
      setCargando(false);
    });
  };

  //Anterior página
  const AnteriorPagina = async () => {
    let suma = pagActual - 1;
    console.log(suma);
    await setPagActual(suma);
    Paginacion();
    //console.log(suma);
  };

  //Siguiente página
  const SiguientePagina = async () => {
    let suma = pagActual + 1;
    console.log(suma);
    await setPagActual(suma);
    Paginacion();
    //console.log(suma);
  };

  //Paginación
  const Paginacion = () => {
    console.log("Paginación");
    console.log("Página: " + pagActual);
    //console.log(arrayPaginacion);
    console.log("Iniciado: " + iniciado);

    if (array.length === 0) {
      console.log("Array vacío");
    }

    let arraySlice = [];
    arraySlice = array;
    arraySlice = arraySlice.slice((pagActual - 1) * 10, paginasMax * pagActual);
    //arraySlice = arraySlice.slice(0,10)
    setArrayPaginacion(arraySlice);
    arraySeleccion = arraySlice;
    if (arraySeleccion.length < 9) {
      setSiguienteDisponible(false);
    } else {
      setSiguienteDisponible(true);
    }
    if (pagActual === 1) {
      setAnteriorDisponible(false);
    } else {
      setAnteriorDisponible(true);
    }

    console.log(arraySlice);
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
            {SeleccionArray()}
          </Table>
          {anteriorDisponible ? (
            <Button onClick={AnteriorPagina} disabled={false}>
              Atras
            </Button>
          ) : (
            <Button onClick={AnteriorPagina} disabled={true}>
              Anterior
            </Button>
          )}
          {siguienteDisponible ? (
            <Button onClick={SiguientePagina} disabled={false}>
              Siguiente
            </Button>
          ) : (
            <Button onClick={SiguientePagina} disabled={true}>
              Siguiente
            </Button>
          )}
        </div>
      );
    }
  };

  const SeleccionArray = () => {
    if (arrayPaginacion.length === 0) {
      console.log("Array seleccion:");
      console.log(arraySeleccion);
      console.log("Array normal:");
      console.log(array);
      Paginacion();
      return arraySeleccion.map((dato, i) => (
        <tbody>
          <tr>
            <td>{dato.nombre}</td>
            <td>{dato.correo}</td>
            <td>{dato.telefono}</td>
            <td>{dato.observaciones}</td>
          </tr>
        </tbody>
      ));
    } else {
      return arrayPaginacion.map((dato, i) => (
        <tbody>
          <tr>
            <td>{dato.nombre}</td>
            <td>{dato.correo}</td>
            <td>{dato.telefono}</td>
            <td>{dato.observaciones}</td>
          </tr>
        </tbody>
      ));
    }
  };

  return (
    <div className="mt-3 ">
      <div class="container">{DesplegarDatos()}</div>
    </div>
  );
};
