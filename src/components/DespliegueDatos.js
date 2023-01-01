import React from "react";
import { useState, useEffect, useContext } from "react";

//Propio del proyecto
import JuzgadoContext from "./JuzgadoContext";

export const DespliegueDatos = (item) => {
  const [arrayPaginacion, setArrayPaginacion] = useState([]);
  const [paginasMax, setPaginasMax] = useState(10);
  const [nuevoArray, setNuevoArray] = useState(item.array);
  const [cargando, setCargando] = useState(true);

  //UseContext
  const { paginaActual, setPaginaActual, iniciado, setIniciado } =
    useContext(JuzgadoContext);

  useEffect(() => {
    return () => {
      //Paginacion();
    };
  }, []);

  //Paginación
  /*
  const Paginacion = () => {
    console.log("Paginación");
    console.log("Página: " + paginaActual);
    console.log(arrayPaginacion);
    console.log("Iniciado: "+iniciado)
    if (iniciado === true && paginaActual === 1) {
      console.log("Entró")
      let arraySlice = [];
      arraySlice = nuevoArray;
      arraySlice = arraySlice.slice(
        (1) * 10,
        paginasMax * 2
      );
      //arraySlice = arraySlice.slice(0,10)
      setArrayPaginacion(arraySlice);

      setCargando(false);
      setIniciado(true);
      console.log(arraySlice);
    } else {
      let arraySlice = [];
      arraySlice = nuevoArray;
      arraySlice = arraySlice.slice(
        (paginaActual - 1) * 10,
        paginasMax * paginaActual
      );
      //arraySlice = arraySlice.slice(0,10)
      setArrayPaginacion(arraySlice);

      setCargando(false);
      setIniciado(true);
      console.log(arraySlice);
    }
  };
  */
  //Despliegue
  /*
  const Despliegue = () => {
    if (!cargando) {
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
  */

  return <tbody>
  <tr>
    <td>{item.item.nombre}</td>
    <td>{item.item.correo}</td>
    <td>{item.item.telefono}</td>
    <td>{item.item.observaciones}</td>
  </tr>
</tbody>
};
